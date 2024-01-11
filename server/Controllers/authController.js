import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import pool from '../Db/database.js';

// JWT secret key
const jwtSecret = 'secret-key';

const hostLink = "https://zeyrcustom.noorularfeen.com" 

function sendOtpCodeToEmail(email,otpCode,subj,htmlEmailTemplate){
  
  const mailOptions = {
   from: 'omerfarooqkhan7210@gmail.com', // Update with your email
   to: email,
   subject: subj,
   html: htmlEmailTemplate,
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
     return res.status(500).json({ message: 'Failed to send otp' });
   }

   res.status(200).json({ message: 'otp sent' });
 });
}

function generateOTP() {
  const charset = '0123456789'; // Characters to use for generating OTP
  let otp = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp += charset[randomIndex];
  }

  return otp;
}

async function createTable(query) {
  
  pool.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error creating "addresses" table:', error);
    } else {
    }
  });
}

// NOTIFIED FORM 
export const NotifiedUsers = async (req, res) => {
  const { name,email,country } = req.body;
 
   // Check if the user with the same email already exists
  pool.query('SELECT * FROM notified_users WHERE email = ?', [email], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (rows.length > 0) {
      // User with the same email already exists
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // User does not exist, proceed to insert the new user
    const userData = {
      name,
      email,
      country,
      subscribed_date: new Date(), // Current date
      subscribed_status: true, // Assuming user is subscribed when signing up
    };

    // Insert the new user
    pool.query('INSERT INTO notified_users SET ?', userData, (insertErr) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({ message: 'Error saving user data' });
      }


      res.status(200).json({ message: 'User added and subscription email sent' });
    });
  });


  const mailOptions = {
   from: 'omerfarooqkhan7210@gmail.com', // Update with your email
   to: email,
   subject: "Thank You",
   html: "You will be notified from now.",
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
     return res.status(500).json({ message: 'Failed to send the subscription mail' });
   }

   res.status(200).json({ message: 'Subscription Email Sent' });
 });
 
};

// NEWSLETTER FORM 
export const NewsletterForm = async (req, res) => {
  const { email } = req.body;
 

   // Check if the user with the same email already exists
  pool.query('SELECT * FROM subscribed_users WHERE email = ?', [email], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    // User does not exist, proceed to insert the new user
    const userData = {
      email,
      subscribed_date: new Date(), // Current date
      subscribed_status: true, // Assuming user is subscribed when signing up
    };

    // Insert the new user
    pool.query('INSERT INTO subscribed_users SET ?', userData, (insertErr) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({ message: 'Error saving user data' });
      }

      res.status(200).json({ message: 'User added and subscription email sent' });
    });
  });


  const mailOptions = {
   from: 'omerfarooqkhan7210@gmail.com', // Update with your email
   to: email,
   subject: "Thank You",
   html: "Thank You For Subscribing ZEYR FINERI",
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
     return res.status(500).json({ message: 'Failed to send the subscription mail' });
   }

   res.status(200).json({ message: 'Subscription Email Sent' });
 });
 
};

// CONTACT FORM 
export const ContactForm = async (req, res) => {
  const { name,email,phone,orderNumber,productInfo,message } = req.body;
 // Insert user subscription into the database
  const userData = {
    name,email,phone,orderNumber,productInfo,message
  };



    // Insert the new user
    pool.query('INSERT INTO contact_mails SET ?', userData, (insertErr) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({ message: 'Error saving contact mail' });
      }

      res.status(200).json({ message: 'Email sent' });
    });


  const mailOptions = {
   from: 'omerfarooqkhan7210@gmail.com', // Update with your email
   to: email,
   subject: "Thank You",
   html: "Thank You For Contacting ZEYR FINERI,we will get back soon",
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
     return res.status(500).json({ message: 'Failed to send the email' });
   }

   res.status(200).json({ message: 'Contact Email Sent' });
 });
 
};

// Store the OTP codes for verification
const otpCodes = {};
// Route for user signup
export const Signup = async (req, res) => {

    try {
      const { fname, email } = req.body;
     
      // Check if email is already taken
      pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
  
        // Check if email already exists
        if (results.length > 0) {
          return res.status(409).json({ message: 'Email already exists' });
        }
  
        // Generate OTP code (4-digit code)
        const otpCode = generateOTP();

        // Store the OTP code in a temporary object
        otpCodes[email] = otpCode;
  
       
 const userSignupEmail = `

 <div class="email-template">
 <div class="header">
     <h1>ZEYR FINERI</h1>
     <h3>ACCOUNT CONFIRMATION</h3>
   </div>
   <div class="body">
     <p>Hi ${fname}!</p>
     <p>Welcome, your customer account is now active! The next time you shop with us, you can save time at checkout by logging into your account.</p>
     <p>Your OTP Code for account verification is ${otpCode}</p>
     <a href="${hostLink}/shop" class="button">Shop Now</a>
   </div>
   <div class="footer">
     <p>Thank You,<br>ZEYR FINERI</p>
     <ul>
       <li><a href="${hostLink}/contact">CONTACT US</a></li>
       <li><a href="${hostLink}/shipping-returns">SHIPPING &amp; RETURNS</a></li>
       <li><a href="${hostLink}/careers">CAREERS</a></li>
     </ul>
   </div>
</div>
 `;
        // Send the OTP code to the user's email (using your preferred email sending method/library)
        sendOtpCodeToEmail(email, otpCode,"Customer Account Confirmation",userSignupEmail); // Replace with your email sending logic
        return res.status(201).json({ message: 'Success', otpCode });
       
  
       
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Route for verifying OTP
  export const VerifyOtp = async (req, res) => {
    try {
      const { fname,lname,email,password, otpCode } = req.body;
      
      // Check if the OTP code is valid for the given email
      if (otpCodes[email] === otpCode) {
        // Clear the OTP code from temporary storage
        delete otpCodes[email];
  
         // Hash the password
        const hashedPassword = await hash(password, 10);
         // Insert the user into the database
         pool.query(
          'INSERT INTO users (fname, lname, email, password) VALUES (?, ?, ?, ?)',
          [fname, lname, email, hashedPassword],
          (error) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ message: 'Server error' });
            }
            
          }
        );
  
        // Generate JWT token
        const token = jwt.sign({ email }, jwtSecret , { expiresIn: '2h' });
  
        return res.status(200).json({ message: 'OTP verification successful', token });
      } else {
        return res.status(400).json({ message: 'Invalid OTP code' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Route for user login
  export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user in the database
      pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
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
          return res.status(401).json({ message: 'Invalid password' });
        }
  
        // Generate a JWT token
        const token = jwt.sign({ email }, jwtSecret , { expiresIn: '2h' });
  
        res.cookie('token', token, { httpOnly: true });
  
        res.status(200).json({ message: 'Login successful', token });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  // Route for password reset
  export const ForgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
       // Generate OTP code
       const otpCode = generateOTP();
  
       // Store the OTP code for verification
       otpCodes[email] = otpCode;
   
  
      // Find the user in the database
      pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
  
        // Check if user exists
        if (results.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        const user = results[0];
        const resetToken = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
  
        res.cookie('token', resetToken, { httpOnly: true });
  
       
 const forgotPasswordEmail = `<div style="background-color: black; padding: 20px;">
 <h1 style="text-align: center; color: white; font-family: Arial, sans-serif; font-size: 24px;">ZEYR FINERI</h1>
 <div style="margin-top: 20px;">
   <p style="color: white; font-family: Arial, sans-serif; font-size: 16px;">
     Here is your password reset OTP code : ${otpCode}
   </p>
   <ul style="list-style-type: none; padding-left: 0; display:flex; gap:1rem; justify-content:center">
     <li style="margin-bottom: 10px;">
       <a href="#" style="color: white; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px;">Reset Password</a>
     </li>
     <li style="margin-bottom: 10px;">
       <a href="#" style="color: white; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px;">Update Account Details</a>
     </li>
     <li>
       <a href="#" style="color: white; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px;">Contact Support</a>
     </li>
   </ul>
 </div>
 </div>
 `
        sendOtpCodeToEmail(email, otpCode,"Password Reset",forgotPasswordEmail); // Replace with your email sending logic
        
        res.status(200).json({message:'Success'})
       
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  // Route for verifying OTP code and resetting password
  export const ResetPassword = async (req, res) => {
    try {
      const { email, otpCode, newPassword } = req.body;

      // Verify OTP code
      if (otpCodes[email] !== otpCode) {
        return res.status(400).json({ message: 'Invalid OTP code' });
      }
  
        // Hash the new password
        const hashedPassword = await hash(newPassword, 10);
  
        // Update the user's password in the database
        pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (error) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
          }
  
          // Clear the OTP code after successful verification
          delete otpCodes[email];
  
          res.status(200).json({ message: 'Success' });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  