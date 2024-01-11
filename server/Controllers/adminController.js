import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Db/database.js';

// JWT secret key
const jwtSecret = 'secret-key';

const getProduct = async (id)=>{
  return new Promise((resolve, reject) => {
pool.query("SELECT * FROM products WHERE id = ?", [id], (prodError, prodResults) => {
  if (prodError) {
    console.error("Error retrieving product:", prodError);
    reject("Error getting product");
    return;
  }

  if (prodResults.length === 0) {
    console.error("product not found for prod_id:", id);
    reject("Error getting product");
    return;
  }

  const product = prodResults[0];
  resolve(product);
})
})
}

const getBAddress = async (id)=>{
  return new Promise((resolve, reject) => {

  pool.query("SELECT * FROM addresses where id = ? ", [id], (userError, addResult) => {
    if (userError) {
      console.error("Error retrieving billing address:", userError);
      reject("Error creating order");
      return;
    }
  
    if (addResult.length === 0) {
      console.error("billing address not found for  id:", id);
      reject("billing address not found for id");
      return;
    }
  
    const addId = addResult[0];
    resolve(addId);
  })
  })
  }

const getShipping= async (id)=>{
    return new Promise((resolve, reject) => {
  
    pool.query("SELECT * FROM shipping_methods where id = ? ", [id], (userError, addResult) => {
      if (userError) {
        console.error("Error retrieving shipping_methods:", userError);
        reject("Error creating order");
        return;
      }
    
      if (addResult.length === 0) {
        console.error("shipping_methods not found for  id:", id);
        reject("shipping_methods not found for id");
        return;
      }
    
      const addId = addResult[0];
      resolve(addId);
    })
    })
    }

// Helper function to promisify pool.query
const poolQueryAsync = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//ADMIN REGISTER
export const AdminRegister = async (req, res) => {
    
      try {
        const { email, password } = req.body;
    
        // Check if the admin already exists
        const adminExists = pool.query('SELECT * FROM admins WHERE email = ?', [email]);
        if (adminExists.length > 0) {
          return res.status(400).json({ message: 'Admin already exists' });
        }
    
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);
    
        // Save admin details to the database
        pool.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);
    
        res.status(201).json({ message: 'Admin registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
export const AdminLogin = async (req, res) => {
      try {
        const { email, password } = req.body;
       
        // Find the user in the database
      pool.query('SELECT * FROM admins WHERE email = ?', [email], async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
  
        // Check if user exists
        if (results.length === 0) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
  
        const user = results[0];
        // Compare the password
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
  
        // Generate a JWT token
        const token = jwt.sign({ email }, jwtSecret , { expiresIn: '2h' });
  
        res.cookie('token', token, { httpOnly: true });
  
        res.status(200).json({ message: 'Admin Login successful', token });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const SelectCompletedOrderAdmin = async (req, res) => {
    try {
     
      const query = 'SELECT * FROM orders WHERE payment_status = "completed"';
      
      pool.query(query, async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
  
        try {
          const combinedOrder = await Promise.all(
            results.map(async (order) => {
              const queryProducts = 'SELECT prod_id, selectedVariations, prod_quantity FROM completed_orders';
              
              const productsResult = await poolQueryAsync(queryProducts);
  
              // Map over each product in the order
              const products = await Promise.all(productsResult.map(async (productResult) => {
                const prodId = productResult.prod_id;
                const selectedVars = productResult.selectedVariations;
                const quantity = productResult.prod_quantity;
  
                const product = await getProduct(prodId);
                const productsWithVarsAndQuantity = {
                  ...product,
                  selectedVars,
                  quantity,
                };
  
                return productsWithVarsAndQuantity;
              }));
  
              const billingId = order.b_address_id;
              const shippingId = order.shipping_methods_id;
  
              const billingAddress = await getBAddress(billingId);
              const shippingMethod = await getShipping(shippingId);
  
              return {
                order: order,
                products: products,
                billingAddress: billingAddress,
                shippingMethod: shippingMethod,
              };
            })
          );
    
  
  const uniqueOrdersArray = Array.from(new Set(combinedOrder.map(JSON.stringify)), JSON.parse);
  
          res.status(200).json({ orders: uniqueOrdersArray });
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ message: 'Server error' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };


  export const SelectAllUsers = async (req, res) => {
    const queryUsers = 'SELECT fname, lname, email, date_registered, id FROM users';
  
    pool.query(queryUsers, async (error, usersResults) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
  
        res.status(200).json({ users: usersResults });
     
    });
  };
  
  
    export const RetrieveAddressAdmin = async (req, res) => {
        
      try {
        
        // Assuming you have a 'addresses' table in your MySQL database
        // Replace this query with your own logic to fetch the user's addresses
        const query = 'SELECT * FROM addresses WHERE user_id = ?';
        pool.query(query, [req.params.userID], (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
          }
    
          res.status(200).json({ addresses: results });
        });
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
      }
    };
    

    
export const SelectACompletedOrderAdmin = async (req, res) => {
  try {
   
    const query = 'SELECT * FROM orders WHERE user_id = ?';
    
    pool.query(query, [req.params.orderID], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      try {
        const combinedOrder = await Promise.all(
          results.map(async (order) => {
            const orderId = order.order_id;
            const queryProducts = 'SELECT prod_id, selectedVariations, prod_quantity FROM completed_orders WHERE order_id = ?';
            
            const productsResult = await poolQueryAsync(queryProducts, [orderId]);

            // Map over each product in the order
            const products = await Promise.all(productsResult.map(async (productResult) => {
              const prodId = productResult.prod_id;
              const selectedVars = productResult.selectedVariations;
              const quantity = productResult.prod_quantity;

              const product = await getProduct(prodId);
              const productsWithVarsAndQuantity = {
                ...product,
                selectedVars,
                quantity,
              };

              return productsWithVarsAndQuantity;
            }));

            const billingId = order.b_address_id;
            const shippingId = order.shipping_methods_id;

            const billingAddress = await getBAddress(billingId);
            const shippingMethod = await getShipping(shippingId);

            return {
              order: order,
              products: products,
              billingAddress: billingAddress,
              shippingMethod: shippingMethod,
            };
          })
        );
  

const uniqueOrdersArray = Array.from(new Set(combinedOrder.map(JSON.stringify)), JSON.parse);

        res.status(200).json({ orders: uniqueOrdersArray });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
