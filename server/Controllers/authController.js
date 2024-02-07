import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import pool from '../Db/database.js';
import qr from 'qrcode'
import fs from 'fs'

// JWT secret key
const jwtSecret = 'secret-key';

const hostLink = "https://zeyr.thealamgroup.com" 

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
pass: 'mpzi hzzt qxiu zyzu', // Your Gmail password or app-specific password
},
});

 transporter.sendMail(mailOptions, (error) => {
   if (error) {
     console.error(error);
   }

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
   html: `
   <!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
   <title>Welcome to Our Platform</title>
   <style>
   /* -------------------------------------
          GLOBAL RESETS
      ------------------------------------- */
      
      /*All the styling goes here*/
      
      img {
        border: none;
        -ms-interpolation-mode: bicubic;
        max-width: 100%; 
      }

      body {
        background-color: #eaebed;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%; 
      }

      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        min-width: 100%;
        width: 100%; }
        table td {
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top; 
      }

      /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */

      .body {
        background-color: #eaebed;
        width: 100%; 
      }

      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
      .container {
        display: block;
        Margin: 0 auto !important;
        /* makes it centered */
        max-width: 580px;
        padding: 10px;
        width: 580px; 
      }

      /* This should also be a block element, so that it will fill 100% of the .container */
      .content {
        box-sizing: border-box;
        display: block;
        Margin: 0 auto;
        max-width: 580px;
        padding: 10px; 
      }

      /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
      .main {
        background: #ffffff;
        border-radius: 3px;
        width: 100%; 
      }

      .header {
        padding: 20px 0;
      }

      .wrapper {
        box-sizing: border-box;
        padding: 20px; 
      }

      .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
      }

      .footer {
        clear: both;
        Margin-top: 10px;
        text-align: center;
        width: 100%; 
      }
        .footer td,
        .footer p,
        .footer span,
        .footer a {
          color: #9a9ea6;
          font-size: 12px;
          text-align: center; 
      }

      /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
      h1,
      h2,
      h3,
      h4 {
        color: #06090f;
        font-family: sans-serif;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
        margin-bottom: 30px; 
      }

      h1 {
        font-size: 35px;
        font-weight: 300;
        text-align: center;
        text-transform: capitalize; 
      }

      p,
      ul,
      ol {
        font-family: sans-serif;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 15px; 
      }
        p li,
        ul li,
        ol li {
          list-style-position: inside;
          margin-left: 5px; 
      }

      a {
        color: black;
        text-decoration: underline; 
      }

      /* -------------------------------------
          BUTTONS
      ------------------------------------- */
      .btn {
        box-sizing: border-box;
        min-width: 100%;
        width: 100%; }
        .btn > tbody > tr > td {
          padding-bottom: 15px; }
        .btn table {
          min-width: auto;
          width: auto; 
      }
        .btn table td {
          background-color: #ffffff;
          border-radius: 5px;
          text-align: center; 
      }
        .btn a {
          background-color: #ffffff;
          border: solid 1px #ec0867;
          border-radius: 5px;
          box-sizing: border-box;
          color: black;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          padding: 12px 25px;
          text-decoration: none;
          text-transform: capitalize; 
      }

      .btn-primary table td {
        background-color: black; 
      }

      .btn-primary a {
        background-color:black ;
        border-color:black ;
        color: #ffffff; 
      }

      /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */
      .last {
        margin-bottom: 0; 
      }

      .first {
        margin-top: 0; 
      }

      .align-center {
        text-align: center; 
      }

      .align-right {
        text-align: right; 
      }

      .align-left {
        text-align: left; 
      }

      .clear {
        clear: both; 
      }

      .mt0 {
        margin-top: 0; 
      }

      .mb0 {
        margin-bottom: 0; 
      }

      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0; 
      }

      .powered-by a {
        text-decoration: none; 
      }

      hr {
        border: 0;
        border-bottom: 1px solid #f6f6f6;
        Margin: 20px 0; 
      }

      /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
      @media only screen and (max-width: 620px) {
        table[class=body] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important; 
        }
        table[class=body] p,
        table[class=body] ul,
        table[class=body] ol,
        table[class=body] td,
        table[class=body] span,
        table[class=body] a {
          font-size: 16px !important; 
        }
        table[class=body] .wrapper,
        table[class=body] .article {
          padding: 10px !important; 
        }
        table[class=body] .content {
          padding: 0 !important; 
        }
        table[class=body] .container {
          padding: 0 !important;
          width: 100% !important; 
        }
        table[class=body] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important; 
        }
        table[class=body] .btn table {
          width: 100% !important; 
        }
        table[class=body] .btn a {
          width: 100% !important; 
        }
        table[class=body] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important; 
        }
      }

      /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
      @media all {
        .ExternalClass {
          width: 100%; 
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%; 
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important; 
        }
        .btn-primary table td:hover {
          background-color: #d5075d !important; 
        }
        .btn-primary a:hover {
          background-color: #d5075d !important;
          border-color: #d5075d !important; 
        } 
      }
   </style>
  </head>
  <body class="">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="header">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td class="align-center">
                  <a href="https://postdrop.io">
                  <img src="https://zeyr.thealamgroup.com/cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png" height="40" alt="ZEYRFINERI"></a>
                </td>
              </tr>
            </table>
          </div>
          <div class="content">

            <!-- START CENTERED WHITE CONTAINER -->
           <table role="presentation" class="main">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
    
    <p>Hello!</p>

    <p>Thank you for subscribing to notifications from ZEYR FINERI. You are now connected to the latest updates and important information related to our apparel collections.</p>

    <p>Expect to receive exclusive news, promotions, and sneak peeks of our latest arrivals. Stay fashionable with ZEYR FINERI!</p>

    <p>If you ever wish to adjust your notification preferences or unsubscribe, you can manage this in your account settings on our website.</p>

    <p>Feel free to contact us if you have any questions or need assistance. We appreciate your interest in ZEYR FINERI.</p>

    <p>Best regards,<br>
    The ZEYR FINERI Team</p>
                          
                        </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-block">
                    <span class="apple-link">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                    <br> Don't like these emails? <a href="https://postdrop.io">Unsubscribe</a>.
                  </td>
                </tr>
                <tr>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
`,
 };

 // Create a transporter object with your Gmail account details
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'omerfarooqkhan7210@gmail.com', // Your Gmail email address
pass: 'mpzi hzzt qxiu zyzu', // Your Gmail password or app-specific password
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
pass: 'mpzi hzzt qxiu zyzu', // Your Gmail password or app-specific password
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
pass: 'mpzi hzzt qxiu zyzu', // Your Gmail password or app-specific password
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
 <table class="email-template" style="width:100%;background:white;">
 <tr>
   <td align="center">
     <table class="header">
       <tr>
         <td align="center">
           <h1>ZEYR FINERI</h1>
           <h3>ACCOUNT CONFIRMATION</h3>
         </td>
       </tr>
     </table>
     <table class="body">
       <tr>
         <td align="center" style="text-align:center; width:60%;">
           <p>
             Hi <b>${fname}</b>!<br/><br/>
             Welcome, your customer account is now active! The next time you shop with us, you can save time at checkout by logging into your account.<br/><br/>
             Your OTP Code for account verification is <b>${otpCode}</b>
           </p>
           <a href="${hostLink}/shop" style="background:black;padding:10px 1rem; color:white; text-decoration:none;font-size:12px">SHOP NOW</a>
         </td>
       </tr>
     </table>
     <table class="footer">
       <tr>
         <td align="center">
        <ul style="text-align: center; padding: 0; margin-top: 2rem;">
 <li style="display: inline-block; margin-block:1rem">
   <a href="${hostLink}/contact" style="background: black; padding: 10px 1rem; color: white; text-decoration: none; font-size:11px">CONTACT US</a>
 </li>
 <li style="display: inline-block;margin-block:1rem">
   <a href="${hostLink}/shipping-returns" style="background: black; padding: 10px 1rem; color: white; text-decoration: none; font-size:11px">SHIPPING & RETURNS</a>
 </li>
 <li style="display: inline-block;margin-block:1rem">
   <a href="${hostLink}/careers" style="background: black; padding: 10px 1rem; color: white; text-decoration: none; font-size:11px">CAREERS</a>
 </li>
</ul>

           <br>
           <h4><b>Thank You,<br>ZEYR FINERI</b></h4>
         </td>
       </tr>
     </table>
   </td>
 </tr>
</table>

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
      const { fname,lname,email,password, otpCode,isAdmin,selectedRole } = req.body;
      
      // Check if the OTP code is valid for the given email
      if (otpCodes[email] === otpCode) {
        // Clear the OTP code from temporary storage
        delete otpCodes[email];
  
         // Hash the password
        const hashedPassword = await hash(password, 10);
        let sql = ''
        if(!isAdmin){
          sql = 'INSERT INTO users (fname, lname, email, password,role) VALUES (?, ?, ?, ?,?)'
        }else{
          sql = 'INSERT INTO admins (fname, lname, email, password,role) VALUES (?, ?, ?, ?,?)'
        }
         // Insert the user into the database
         pool.query(
          sql,
          [fname, lname, email, hashedPassword,selectedRole],
          (error,results) => {
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
  

  export const UpdateAccountDetails = async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1]; // Extract the JWT token from the authorization header
  
    // Verify the JWT token and extract the user information
    const decoded = jwt.verify(token, jwtSecret);
    let decoded_email = ''
    if(decoded.userEmail){
      decoded_email = decoded.userEmail
    }else{
      decoded_email = decoded.email
    }
    const { fname,email,lname,password } = req.body;

       // Hash the password
       const hashedPassword = await hash(password, 10);
    if(decoded_email != email){
        // Generate OTP code (4-digit code)
        const otpCode = generateOTP();

        // Store the OTP code in a temporary object
        otpCodes[email] = otpCode;
  
       
        const userSignupEmail = `

        <div class="email-template">
        <div class="header">
            <h1>ZEYR FINERI</h1>
            <h3>EMAIL CHANGE</h3>
          </div>
          <div class="body">
            <p>Hi ${fname}!</p>
            <p>Welcome, your customer account is now active! The next time you shop with us, you can save time at checkout by logging into your account.</p>
            <p>Your OTP Code for account email update is ${otpCode}</p>
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
        sendOtpCodeToEmail(email, otpCode,"Email Change",userSignupEmail); // Replace with your email sending logic

        return res.status(200).json({ message: 'OTP sent',success:false });
    }else{
      if(password === ""){
        pool.query(
          'update users set fname = ?, lname = ?, email = ?, updation_date = ? where email = ?',
          [fname, lname, email,new Date(), decoded_email],
          (error) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ message: 'Server error' });
            }
            
          }
        );
      }else{
        pool.query(
          'update users set fname = ?, lname = ?, email = ?, password = ?, updation_date = ? where email = ?',
          [fname, lname, email, hashedPassword,new Date(), decoded_email],
          (error) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ message: 'Server error' });
            }
            
          }
        );
      }
      

      return res.status(200).json({ message: 'Account details updated successfully',success:true });
    }
  }

  // In your server.js or routes file

// Endpoint for checking current password
export const VerifyPassword =  async (req, res) => {
  const { currentPassword } = req.body;
  const token = req.headers.authorization.split(' ')[1]; // Extract the JWT token from the authorization header
  
    // Verify the JWT token and extract the user information
    const decoded = jwt.verify(token, jwtSecret);
    let decoded_email = ''
    if(decoded.userEmail){
      decoded_email = decoded.userEmail
    }else{
      decoded_email = decoded.email
    }
    pool.query('SELECT * FROM users WHERE email = ?', [decoded_email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      let user;
      // Check if email already exists
      if (results.length > 0) {
        user = results[0];
      }
 
      try {
        const isPasswordCorrect = await compare(currentPassword, user.password);
        if (isPasswordCorrect) {
          return res.json({ success: true });
        } else {
          return res.json({ success: false });
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
      }
      
});
};

// Route for updating account details
export const AccountDetailsOTP = async (req, res) => {
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
        'update users set fname = ?, lname = ?, email = ?, password = ?',
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
  
  