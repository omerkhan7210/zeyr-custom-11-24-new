import pool from '../Db/database.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import {hash} from 'bcrypt'
import { storedCurrencyExchange } from './currencyMethods.js';

const getUserId = async (email)=>{
  return new Promise((resolve, reject) => {
    // Step 1: Retrieve the user ID based on the email
    pool.query("SELECT id FROM users WHERE email = ?", [email], (userError, userResult) => {
      if (userError) {
        console.error("Error retrieving user ID:", userError);
        reject("Error creating order");
        return;
      }

      if (userResult.length === 0) {
        console.error("User not found for email:", email);
        reject("User not found");
        return;
      }

      const userId = userResult[0].id;
      resolve(userId);
    })
    })
}
const getUserEmail = async (id)=>{
  return new Promise((resolve, reject) => {
    // Step 1: Retrieve the user ID based on the email
    pool.query("SELECT email FROM users WHERE id = ?", [id], (userError, userResult) => {
      if (userError) {
        console.error("Error retrieving user email:", userError);
        reject("Error creating order");
        return;
      }

      if (userResult.length === 0) {
        console.error("User not found for id:", id);
        reject("User not found");
        return;
      }

      const userEmail = userResult[0].email;
      resolve(userEmail);
    })
    })
}
const getCartItemId = async (cart_items_id)=>{
  return new Promise((resolve, reject) => {
pool.query("SELECT id FROM cart_items WHERE prod_id = ?", [cart_items_id], (cartItemsError, cartItemsResult) => {
  if (cartItemsError) {
    console.error("Error retrieving cart_items_id:", cartItemsError);
    reject("Error getting cartitemid");
    return;
  }

  if (cartItemsResult.length === 0) {
    console.error("Cart item not found for prod_id:", prod_id);
    reject("Error getting cartitemid");
    return;
  }

  const cartItemsId = cartItemsResult[0].id;
  resolve(cartItemsId);
})
})
}
const getBAddressId = async (email)=>{
  const userId = await getUserId(email);
  return new Promise((resolve, reject) => {

  pool.query("SELECT id FROM addresses WHERE isDefault = 1 and user_id = ? ", [userId], (userError, addResult) => {
    if (userError) {
      console.error("Error retrieving billing address id:", userError);
      reject("Error creating order");
      return;
    }
  
    if (addResult.length === 0) {
      console.error("billing address id not found for user id:", userId);
      reject("billing address id not found for user id");
      return;
    }
  
    const addId = addResult[0].id;
    resolve(addId);
  })
  })
  }
  
const getProductItemId = async (id)=>{
  return new Promise((resolve, reject) => {
pool.query("SELECT prod_id FROM cart_items WHERE id = ?", [id], (cartItemsError, cartItemsResult) => {
  if (cartItemsError) {
    console.error("Error retrieving id:", cartItemsError);
    reject("Error getting cartitemid");
    return;
  }

  if (cartItemsResult.length === 0) {
    console.error("Cart item not found for prod_id:", id);
    reject("Error getting cartitemid");
    return;
  }

  const cartItemsId = cartItemsResult[0].prod_id;
  const selectedVar = cartItemsResult[0].selectedVariations;
  resolve(cartItemsId);
})
})
}
const getProductItemVariations = async (id)=>{
  return new Promise((resolve, reject) => {
pool.query("SELECT selectedVariations FROM cart_items WHERE id = ?", [id], (cartItemsError, cartItemsResult) => {
  if (cartItemsError) {
    console.error("Error retrieving id:", cartItemsError);
    reject("Error getting cartitemid");
    return;
  }

  if (cartItemsResult.length === 0) {
    console.error("Cart item not found for prod_id:", id);
    reject("Error getting cartitemid");
    return;
  }

  const selectedVar = cartItemsResult[0].selectedVariations;
  resolve(selectedVar);
})
})
}
const getProductItemQuantity = async (id)=>{
  return new Promise((resolve, reject) => {
pool.query("SELECT quantity FROM cart_items WHERE id = ?", [id], (cartItemsError, cartItemsResult) => {
  if (cartItemsError) {
    console.error("Error retrieving id:", cartItemsError);
    reject("Error getting quantity");
    return;
  }

  if (cartItemsResult.length === 0) {
    console.error("quantity not found for prod_id:", id);
    reject("Error getting quantity");
    return;
  }

  const quantity = cartItemsResult[0].quantity;
  resolve(quantity);
})
})
}
const getCartItem = async (id)=>{
  const prodId = await getProductItemId(id);
  return new Promise((resolve, reject) => {
pool.query("SELECT * FROM products WHERE id = ?", [prodId], (prodError, prodResults) => {
  if (prodError) {
    console.error("Error retrieving product:", prodError);
    reject("Error getting product");
    return;
  }

  if (prodResults.length === 0) {
    // Product not found in products table, fetch from memberships table
    const getMembershipQuery = "SELECT * FROM memberships WHERE membership_id = ?";
    pool.query(getMembershipQuery, [prodId], (membershipError, membershipResult) => {
      if (membershipError) {
        reject(membershipError);
        return;
      }

      if (membershipResult.length === 0) {
        // Product not found in memberships table either
        reject("Product not found");
        return;
      }

      const membership = membershipResult[0];
      resolve(membership);
    });
  } else {
    // Product found in products table
    const product = prodResults[0];
    resolve(product);
  }
})
})
}

const getProduct = (productId) => {
  return new Promise((resolve, reject) => {
    const getProductQuery = "SELECT * FROM products WHERE id = ?";
    pool.query(getProductQuery, [productId], (error, productResult) => {
      if (error) {
        reject(error);
        return;
      }

      if (productResult.length === 0) {
        // Product not found in products table, fetch from memberships table
        const getMembershipQuery = "SELECT * FROM memberships WHERE membership_id = ?";
        pool.query(getMembershipQuery, [productId], (membershipError, membershipResult) => {
          if (membershipError) {
            reject(membershipError);
            return;
          }

          if (membershipResult.length === 0) {
            // Product not found in memberships table either
            reject("Product not found");
            return;
          }

          const membership = membershipResult[0];
          resolve(membership);
        });
      } else {
        // Product found in products table
        const product = productResult[0];
        resolve(product);
      }
    });
  });
};

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

    const removeCartItems = async (id) => {
      return new Promise((resolve, reject) => {
        // Use the DELETE statement to remove cart items for the specified user_id
        pool.query("DELETE FROM cart_items WHERE user_id = ?", [id], (deleteError, deleteResults) => {
          if (deleteError) {
            console.error("Error deleting cart items:", deleteError);
            reject("Error deleting cart items");
            return;
          }
    
          // You don't need to resolve anything here since it's a deletion operation
          resolve();
        });
      });
    };

        
const sendOrderConfirmationEmail = async (email, subj, orderData,productData,userData,shippingData)=> {
 
  //const echangerate = await storedCurrencyExchange();
  
  // const convertedPrice = echangerate*productData.price;
  // const convertedTPrice = echangerate*shippingData.price;
  // const convertedTPriceS = echangerate*orderData.total_price_with_shipping;

  const convertedPrice = productData.price;
  const convertedTPrice = shippingData.price;
  const convertedTPriceS = orderData.total_price_with_shipping;
// Format the order data into HTML
const formattedOrderHTML = `
<p>Thank you for your order!</p>
<p>Product Details:</p>
<ul style="list-style-type:none">
<li>Name: ${productData.name}</li>
  <li>
  <li>Price: ${convertedPrice}</li>
  <li>
  <li>Category: ${productData.categories}</li>
  <li>
  <li>SKU: ${productData.sku}</li>
  <li>
  </ul>
<p>Order Details:</p>
<ul style="list-style-type:none">
  <li>Order ID: ${orderData.order_id}</li>
  Billing Address: ${userData.addressLine1}
  <br>
  ${userData.addressLine2},
  ${userData.city},
  ${userData.country}
  </li>
  <li>Total Price: $${orderData.total_price}</li>
  <li>Shipping Method: ${shippingData.name},${shippingData.description}</li>
  <li>Shipping Price: ${convertedTPrice}</li>
  <li>Total Price with Shipping: ${convertedTPriceS}</li>
  <li>Order Date: ${new Date(orderData.order_date).toLocaleString()}</li>
</ul>
<p>Your Details:</p>
<ul style="list-style-type:none">
<li>Your Email: ${userData.email}</li>
  <li>
  <li>Phone: ${userData.phone}</li>
  </ul>

  
`;
    const mailOptions = {
      from: 'omerfarooqkhan7210@gmail.com', // Update with your email
      to: email,
      subject: subj,
      html: formattedOrderHTML,
    };
 
    // Create a transporter object with your Gmail account details
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'omerfarooqkhan7210@gmail.com', // Your Gmail email address
        pass: 'eaermqekncdsjnsn', // Your Gmail password or app-specific password
      },
    });
  
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
      }
  
    });
  }
  
function sendUserInfoToEmail(email,lname,fname,password){
  
  const mailOptions = {
   from: 'omerfarooqkhan7210@gmail.com', // Update with your email
   to: email,
   subject: "Thank you for creating a ZEYR FINERI account",
   html: `
   <p>YOUR ACCOUNT DETAILS</p>
   <p>Your Name: ${fname} ${lname}</p>
   <p>Your Email: ${email}</p>
   <p>Your Password ${password}</p>
   `,
 };

 // Create a transporter object with your Gmail account details
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'omerfarooqkhan7210@gmail.com', // Your Gmail email address
pass: 'eaermqekncdsjnsn', // Your Gmail password or app-specific password
},
});

 transporter.sendMail(mailOptions, (error) => {
   if (error) {
     console.error(error);
   }

 });
}

// JWT secret key
const jwtSecret = 'secret-key';

export const CreateCheckoutAddress = async (req, res) => {
  try {
    const { email, firstName, lastName, company, addressLine1, addressLine2, city, country, zipCode, phone } = req.body;

    // Check if the user already exists based on the email
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
    
      if (results.length > 0) {
        // User exists, get the user ID
        const userId = await getUserId(email);
    
        // Check if the address already exists
        const checkAddressQuery = 'SELECT * FROM addresses WHERE user_id = ? AND addressLine1 = ? AND addressLine2 = ? AND city = ? AND country = ? AND zipCode = ? AND phone = ?';
        const checkAddressValues = [userId, addressLine1, addressLine2, city, country, zipCode, phone];
    
        pool.query(checkAddressQuery, checkAddressValues, async (checkAddressError, checkAddressResults) => {
          if (checkAddressError) {
            console.error(checkAddressError);
            return res.status(500).json({ message: 'Server error' });
          }
    
          if (checkAddressResults.length > 0) {
            
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '24h' });

    res.cookie('checkoutInfoToken', token, { httpOnly: true });
    res.status(201).json({ message: 'Checkout Address added successfully', address: checkAddressResults, token });
           
          } else {
            // Address does not exist, insert the new address
            insertAddressAndRespond(userId, email, firstName, lastName, company, addressLine1, addressLine2, city, country, zipCode, phone, res);
          }
        });
      }else {
        const randomPassword = Math.random().toString(36).slice(2);
        const hashedPassword = await hash(randomPassword, 10);

        const createUserQuery = 'INSERT INTO users (email, fname, lname, password) VALUES (?, ?, ?, ?)';
        pool.query(createUserQuery, [email, firstName, lastName, hashedPassword], async (createUserError, createUserResults) => {
          if (createUserError) {
            console.error(createUserError);
            return res.status(500).json({ message: 'Server error' });
          }

          sendUserInfoToEmail(email, lastName, firstName, randomPassword);
          userId = await createUserResults.insertId;

          // Insert the address after creating the user
          insertAddressAndRespond(userId, email, firstName, lastName, company, addressLine1, addressLine2, city, country, zipCode, phone, res);
        });
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const insertAddressAndRespond = (userId, email, firstName, lastName, company, addressLine1, addressLine2, city, country, zipCode, phone, res) => {
  const addressQuery = 'INSERT INTO addresses (user_id, email, firstName, lastName, company, addressLine1, addressLine2, city, country, zipCode, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(addressQuery, [userId, email, firstName, lastName, company, addressLine1, addressLine2, city, country, zipCode, phone], (addressError, addressResults) => {
    if (addressError) {
      console.error(addressError);
      return res.status(500).json({ message: 'Server error' });
    }

    const newAddress = {
      _id: addressResults.insertId,
      firstName,
      lastName,
      company,
      addressLine1,
      addressLine2,
      city,
      country,
      zipCode,
      phone
    };

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '24h' });

    res.cookie('checkoutInfoToken', token, { httpOnly: true });
    res.status(201).json({ message: 'Checkout Address added successfully', address: newAddress, token });
  });
};

  // Route for fetching addresses for the logged-in user
  export const RetrieveCheckoutAddress = async (req, res) => {
    try {

      const token = req.headers.authorization.split(' ')[1]; // Extract the JWT token from the authorization header
      // Verify the JWT token and extract the user information
      const decoded = jwt.verify(token, jwtSecret);
      let email = ''
      if(decoded.userEmail){
       email = decoded.userEmail
      }else{
       email = decoded.email
      }
      // Assuming you have a 'addresses' table in your MySQL database
      // Replace this query with your own logic to fetch the user's addresses
      const query = 'SELECT * FROM addresses WHERE email = ?';
      pool.query(query, [email, decoded.firstName], (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
  
        res.status(200).json({ addresses: results });
      });
    } catch (error) {
            // Check if the error is due to a malformed JWT
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Malformed JWT' });
    }
      res.status(401).json({ message: 'Invalid token' });
    }
  };
 
  // Route for fetching addresses for the logged-in user
  export const RetrieveCheckoutAddressBId = async (req, res) => {
    try {

     
      const bid = req.query.bid; // Extract the 'bid' parameter from the query string
      const query = 'SELECT * FROM addresses WHERE id = ?';
      pool.query(query, [bid], (error, results) => {
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


// Define a route to fetch shipping methods
export const RetrieveShippingMethods = async (req, res) => {
  try {
    //const exchangeRate = await storedCurrencyExchange();
  
    const query = 'SELECT * FROM shipping_methods';

    pool.query(query, async (err, results) => {
      if (err) {
        console.error('Error fetching shipping method:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Multiply prices by the exchange rate
        const updatedResults = results.map((result) => {
          const updatedResult = { ...result };
          //updatedResult.price *= exchangeRate;
          // You may need to update other price-related fields if necessary

          return updatedResult;
        });

        res.json(updatedResults);
      }
    });
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Define a route to fetch shipping methods
export const RetrieveAShippingMethod = async (req, res) => {
  try {
    const shippingMethodsId = req.params.shippingMethodId;

    //const exchangeRate = await storedCurrencyExchange();
  
    const query = 'SELECT * FROM shipping_methods where id = ?';

    pool.query(query, [shippingMethodsId], async (err, results) => {
      if (err) {
        console.error('Error fetching shipping method:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Multiply prices by the exchange rate
        const updatedResults = results.map((result) => {
          const updatedResult = { ...result };
          //updatedResult.price *= exchangeRate;
          // You may need to update other price-related fields if necessary

          return updatedResult;
        });

        res.json(updatedResults);
      }
    });
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to format the order ID with leading zeros
function formatOrderId(orderId, length) {
  const orderIdString = orderId.toString();
  const zerosToAdd = length - orderIdString.length;
  if (zerosToAdd <= 0) {
    return orderIdString; // No padding needed
  }
  const paddedOrderId = '0'.repeat(zerosToAdd) + orderIdString;
  return `#${paddedOrderId}`;
}
export const CreateOrder = async (req, res) => {
  try {
    const { orderid, email, totalPrice, totalPriceWithShipping, cart_items_id, shippingMethodId } = req.body;
     const userId = await getUserId(email);
    const cartItemsId = await getCartItemId(cart_items_id);
    const bId = await getBAddressId(email);

    // if (storedCurrencyCode !== 'USD') {
    //   try {
    //     const exchangeRate = await storedCurrencyExchange2(); // Corrected: added parentheses for function call
    //     totalPrice *= exchangeRate;
    //     totalPriceWithShipping *= exchangeRate;
    //   } catch (error) {
    //     console.error('Error fetching exchange rate:', error);
    //   }
    // }
    
    // Step 2: Insert the order with the retrieved user ID
    const orderResult = await poolQueryAsync(
      "INSERT INTO orders (order_id,user_id, b_address_id, shipping_methods_id, cart_items_id, total_price, total_price_with_shipping) VALUES (?,?, ?, ?, ?, ?, ?)",
      [orderid,userId, bId, shippingMethodId, cartItemsId, totalPrice, totalPriceWithShipping]
    );

    // Retrieve the last inserted ID
    const idRows = await poolQueryAsync("SELECT LAST_INSERT_ID() as order_id");

    const orderId = idRows[0].order_id;

    const formattedOrderId = formatOrderId(orderId, 4); // Adjust the length as needed

    // Generate a JWT token
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '24h' });

    res.cookie('checkoutShippingToken', token, { httpOnly: true });
    res.status(201).json({ message: "Order created successfully", formattedOrderId, token });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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

  // Define a route to fetch shipping methods
export const SelectOrder =  async (req, res) => {
  const orderId = req.query.orderId
   try {

        const token = req.headers.authorization.split(' ')[1]; 
        const decoded = jwt.verify(token, jwtSecret);
        let email = ''
        if(decoded.userEmail){
         email = decoded.userEmail
        }else{
         email = decoded.email
        }
      const userId = await getUserId(email);
     
      const query = 'SELECT * FROM orders WHERE payment_status = "pending" and user_id = ? and order_id = ?';
      pool.query(query, [userId,orderId],async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
        await results;
        res.status(200).json({ order: results });
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  
};

export const SelectCompletedOrder = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret);
    let email = '';
    if (decoded.userEmail) {
      email = decoded.userEmail;
    } else {
      email = decoded.email;
    }

    const userId = await getUserId(email);
    const query = 'SELECT * FROM orders WHERE payment_status = "completed" and user_id = ?';

    pool.query(query, [userId], async (error, results) => {
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
 
// API route to insert completed orders
export const CompleteOrder = async  (req, res) => {
  const { formattedOrderId, order,userUUID,paymentMethod } = req.body;

  try {
    const orderId = order.order_id;
const userId = order.user_id;
const cartItemId = order.cart_items_id;
const prodId = await getProductItemId(cartItemId)
const selectedVars = await getProductItemVariations(cartItemId)
const quantity = await getProductItemQuantity(cartItemId)
const billingId = order.b_address_id;
const shippingId = order.shipping_methods_id; 

  // SQL query to insert a completed order
  const insertQuery = 'INSERT INTO completed_orders (formatted_order_id, order_id,prod_id,selectedVariations,prod_quantity,paymentmethod) VALUES (?,? ,?, ?,?,?)';

  pool.query(insertQuery, [formattedOrderId, orderId,prodId,selectedVars,quantity,paymentMethod],async (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to insert completed order' });
    } else {
      
      const userEmail = await getUserEmail(userId);
      const product = await getCartItem(cartItemId);
      const billingAddress = await getBAddress(billingId);
      const shippingMethod = await getShipping(shippingId);
      await sendOrderConfirmationEmail(userEmail, 'Order Confirmation', order,product,billingAddress,shippingMethod);
     
      // // SQL query to update the payment status to "completed" in the orders table
       const updateQuery = 'UPDATE orders SET payment_status = "completed" WHERE order_id = ?';

        pool.query(updateQuery, [orderId], async (updateError, updateResults) => {
            if (updateError) {
              console.error(updateError);
              res.status(500).json({ message: 'Failed to update payment status' });
            } else {
            const token = jwt.sign({ userEmail }, jwtSecret , { expiresIn: '2h' });
            await removeCartItems(userUUID);
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ message: 'Completed order inserted successfully',token });
            }
       })
  }
  });
  } catch (error) {
    console.error(error)
  }

};

  export const RemoveOrder = async (req,res)=>{
    const orderid = req.params.orderID
    pool.query("delete from orders where order_id = ?",[orderid],(err,res)=>{
      if(err){
        res.status(500).json({error: err})
      }
      res.status(200).json({message: "success"})
    })
    
  }

  export const UpdateOrderStatus = async (req, res) => {
   const { orderId, newOrderStatus } = req.body;
    pool.query("UPDATE completed_orders SET order_status = ? WHERE order_id = ?", [newOrderStatus, orderId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if(newOrderStatus === 'completed'){
        pool.query("UPDATE orders SET payment_status = ? WHERE order_id = ?", [newOrderStatus, orderId], (err, result) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
        });
      }
  
      res.status(200).json({ message: "success" });
    });
  };
  

// Function to check and send reminder emails
async function checkAndSendPaymentReminders() {
  try {
 const query = `
      SELECT order_id, user_email
      FROM orders
      WHERE payment_status = 'pending'
      AND TIMESTAMPDIFF(MINUTE, order_date, NOW()) > your_threshold_minutes
    `;
      // Retrieve the last inserted ID
      pool.query(query, async (err, rows) => {
        if (err) {
        } else {
          for (const row of rows) {
            await sendReminderEmail(row.user_email, row.order_id);
          }
        }
  })
  } catch (error) {
    console.error('Error checking and sending payment reminders:', error);
  }
}

// Schedule the job to run periodically (e.g., every hour)
setInterval(checkAndSendPaymentReminders, 60 * 60 * 150); // 1 hour interval