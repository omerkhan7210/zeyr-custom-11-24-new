import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../Db/database.js';

// JWT secret key
const jwtSecret = 'secret-key';

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
  
        res.status(200).json({ message: 'Admin Login successful', token, role: user.role ,username:user.fname + " " +user.lname });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const SelectCompletedOrderAdmin = async (req, res) => {
    try {
      const query = `
        SELECT DISTINCT o.order_id, o.total_price, o.total_price_with_shipping,
        o.currency_code, o.payment_status, o.order_date
        FROM orders o
      `;
  
      pool.query(query, async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
  
        const combinedOrder = await Promise.all(results.map(async (order) => {
          const productsQuery = `
          SELECT p.*, co.selectedVariations, co.prod_quantity, co.prod_id, co.order_status
          FROM products p,completed_orders co where p.id = co.prod_id
          and co.order_id = ?;
          
          `;
          const addressQuery = `
          SELECT distinct a.* from addresses a , orders co
          WHERE a.id = co.b_address_id AND co.order_id = ?
        `;     
        const sQuery = `
        SELECT distinct sm.* from shipping_methods sm , orders co
        WHERE sm.id = co.shipping_methods_id AND co.order_id = ?
      `;
      const membersQuery = `
      SELECT m.*, co.selectedVariations, co.prod_quantity, co.prod_id, co.order_status
      FROM memberships m, completed_orders co where m.membership_id = co.prod_id
      and co.order_id = ?;
      
      `;

      const shippingResult = await poolQueryAsync(sQuery, [order.order_id]);
        const addressResult = await poolQueryAsync(addressQuery, [order.order_id]);
          let productsResult = await poolQueryAsync(productsQuery, [order.order_id]);
          if(!productsResult.length){
            productsResult = await poolQueryAsync(membersQuery, [order.order_id]);
          }

          return {
            ...order,
            products: productsResult,
            addresses: addressResult,
            shipping: shippingResult,
          };
        }));

        res.status(200).json({ orders: combinedOrder });
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };

  export const SelectCompletedOrderForUser = async (req, res) => {
    const userID = req.params.userID
  
    try {
      const query = `
        SELECT DISTINCT o.order_id, o.total_price, o.total_price_with_shipping,
        o.currency_code, o.payment_status, o.order_date
        FROM orders o
        WHERE o.payment_status = "completed"
        and o.user_id = ?
      `;
  
      pool.query(query,[userID], async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
  
        const combinedOrder = await Promise.all(results.map(async (order) => {
          const productsQuery = `
            SELECT p.*, co.selectedVariations, co.prod_quantity, co.prod_id,co.order_status
            FROM products p, completed_orders co
            WHERE p.id = co.prod_id AND co.order_id = ?
          `;
          const addressQuery = `
          SELECT distinct a.* from addresses a , orders co
          WHERE a.id = co.b_address_id AND co.order_id = ?
        `;     
        const sQuery = `
        SELECT distinct sm.* from shipping_methods sm , orders co
        WHERE sm.id = co.shipping_methods_id AND co.order_id = ?
      `;


      const shippingResult = await poolQueryAsync(sQuery, [order.order_id]);
        const addressResult = await poolQueryAsync(addressQuery, [order.order_id]);
          const productsResult = await poolQueryAsync(productsQuery, [order.order_id]);

          return {
            ...order,
            products: productsResult,
            addresses: addressResult,
            shipping: shippingResult,
          };
        }));
        res.status(200).json({ orders: combinedOrder });
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };

  export const SelectAddressesForUser = async (req, res) => {
    const userID = req.params.userID
  
    try {
      const query = `
        SELECT DISTINCT * from addresses where user_id = ?
      `;
  
      pool.query(query,[userID], async (error, results) => {
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
  


// Endpoint to get all categories (including subcategories)
export const GetTotalCountUsersOrders = async (req, res) => {
  const uid = req.params.uid;
  const sql = `
  SELECT COUNT(DISTINCT order_id) as totalcount ,count(a.id)  as totaladdress
  FROM orders o,addresses a
  WHERE a.id = o.b_address_id and o.user_id = ? `;
  pool.query(sql,[uid], async (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results[0]);
    }
  });
};


// Endpoint to get all categories (including subcategories)
export const GetTotalSales = async (req, res) => {
  const pid = req.params.pid;
  const sql = `
  SELECT COUNT(co.prod_id) as totalcount ,nvl(sum(p.price),0) as totalamount 
  FROM completed_orders co , products p
  WHERE co.prod_id = p.id and p.id = ?  `;
  pool.query(sql,[pid], async (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({totalcount: results[0].totalcount , totalamount :  results[0].totalamount});
    }
  });
};

// Endpoint to get all categories (including subcategories)
export const GetTotalStock = async (req, res) => {
  const pid = req.params.pid;
  const sql = `
  SELECT SUM(attributestock) AS totalcount
FROM attributes
WHERE productId = ?
GROUP BY variationid;
 `;
  pool.query(sql,[pid], async (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results[0].totalcount);
    }
  });
};

export const BulkEditCats = async (req,res)=>{
  const {productIds,newCategories} = req.body;
  console.log(req.body)
  productIds.forEach((p)=>{
    const sql = `
    update products set categories = ? where id = ?
   `;
    pool.query(sql,[newCategories,p], async (err, results) => {
      if (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } 
  })
});

  res.status(200).json({message: "success"});
    

} 

// Endpoint to get all categories (including subcategories)
export const GetOrderDetails = async (req, res) => {
 const sql = `
  SELECT
  DATE_FORMAT(order_date, '%Y-%m') AS month,
  COUNT(*) AS total_orders,
  SUM(total_price) AS total_order_amount
FROM orders
GROUP BY month
ORDER BY month;
 `;
  pool.query(sql, async (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};

