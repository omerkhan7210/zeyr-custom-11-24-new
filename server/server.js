import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import adminRoutes from './Routes/adminRoutes.js'
import productApiRoutes from './Routes/productApiRoutes.js'
import apiRoutes from './Routes/apiRoutes.js'
import userApiRoutes from './Routes/userApiRoutes.js'
import cartRoutes from './Routes/cartRoutes.js'
import wishlistRoutes from './Routes/wishlistRoutes.js'
import checkoutRoutes from './Routes/checkoutRoute.js'
import user_currency_preferences from './Routes/userCurrencyRoutes.js'

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads/'));
app.use('/productBarCodes', express.static('productBarCodes/'));

app.use('/', userApiRoutes);
app.use('/', apiRoutes);
app.use('/',productApiRoutes);
app.use('/',adminRoutes);
app.use('/',cartRoutes);
app.use('/',wishlistRoutes);
app.use('/',checkoutRoutes);
app.use('/',user_currency_preferences);
// Serve barcode images
app.use('/ordersbarcodeimages', express.static('ordersbarcodeimages/'));

// Serve barcode images
app.use('/qrCodes', express.static( 'qrCodes'));


// Start the server
app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
