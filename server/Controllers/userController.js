import pool from '../Db/database.js';
import jwt from 'jsonwebtoken';

// JWT secret key
const jwtSecret = 'secret-key';


const getUserId = async (email)=>{
  return new Promise((resolve, reject) => {
  // Step 1: Retrieve the user ID based on the email
  pool.query("SELECT id FROM users WHERE email = ?", [email], (userError, userResult) => {
    if (userError) {
      console.error("Error retrieving user ID:", userError);
      reject("User not found");
      return;
    }

    if (userResult.length === 0) {
      console.error("User not found for email:", email);
      reject("User not found");
      return;
    }

    const userId = userResult[0].id;
    resolve(userId)
  })
  })
}

  // Route for fetching user account details
  export const UserAccountDetails = async (req, res) => {
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
      // Assuming you have a 'users' table in your MySQL database
      // Replace this query with your own logic to fetch the user account details
      const query = 'SELECT fname , lname , email FROM users WHERE email = ?';
      pool.query(query, [email], (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        const user = results[0];
        res.status(200).json({
          fname: user.fname,
          lname: user.lname,
          email: user.email,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
  
  export const CreateAddress = async (req, res) => {
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
      const userId = await getUserId(email);
  
      // Update existing addresses to set default to 0
      const updateQuery = 'UPDATE addresses SET isDefault = 0 WHERE user_id = ?';
      pool.query(updateQuery, [userId], (updateError, updateResults) => {
        if (updateError) {
          console.error(updateError);
          return res.status(500).json({ message: 'Server error' });
        }
        console.log(updateResults)
  
        // Get the address data from the request body
        const { firstName, lastName, company, addressLine1, addressLine2, city, country, zipCode, phone } = req.body;
  
        // Insert the new address with default set to 1
        const insertQuery = 'INSERT INTO addresses (user_id, email, firstName, lastName, company, addressLine1, addressLine2, city, country, zipCode, phone, isDefault) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)';
        pool.query(insertQuery, [userId, email, firstName, lastName, company, addressLine1, addressLine2, city, country, zipCode, phone], (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
          }
  
          // Return the newly added address data
          const newAddress = {
            _id: results.insertId,
            firstName,
            lastName,
            company,
            addressLine1,
            addressLine2,
            city,
            country,
            zipCode,
            phone,
            isDefault: 1
          };
  
          res.status(201).json({ message: 'Address added successfully', address: newAddress });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
  
  // Route for fetching addresses for the logged-in user
  export const RetrieveAddress = async (req, res) => {
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
      console.error(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
  // Delete an address
  export const DeleteAddress = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete the address from the database using the address ID
      pool.query('DELETE FROM addresses WHERE id = ?', [id]);
  
      res.json({ message: 'Address deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Edit an address
  export const EditAddress = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedAddress = req.body;
  
      // Update the address in the database using the address ID and the updated data
      pool.query('UPDATE addresses SET ? WHERE id = ?', [updatedAddress, id]);
  
      res.json({ message: 'Address updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Set an address as the default address
  export const addressSetDefault = async (req, res) => {
    try {
      const { id } = req.params;

      pool.query('UPDATE addresses SET isDefault = 0')
  
      // Set the specified address as the default address by updating the 'isDefault' property
      pool.query('UPDATE addresses SET isDefault = 1 WHERE id = ?', [id]);
  
      res.json({ message: 'Address set as default successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
