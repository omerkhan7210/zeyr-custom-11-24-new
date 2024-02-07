import express from 'express';
import { CompleteOrder, CreateCheckoutAddress, CreateOrder, RemoveOrder, RetrieveAShippingMethod,
     RetrieveCheckoutAddress, RetrieveCheckoutAddressBId, RetrieveCheckoutAddressUser, RetrieveShippingMethods, SelectCompletedOrder, SelectOrder, UpdateOrderStatus } from '../Controllers/checkoutController.js';

const router = express.Router();

router.post('/checkout-shipping-address',CreateCheckoutAddress);
router.get('/retrieve-checkout-address',RetrieveCheckoutAddress);
router.get('/retrieve-checkout-address-user',RetrieveCheckoutAddressUser);
router.get('/retrieve-checkout-address-bid',RetrieveCheckoutAddressBId);
router.get('/retrieve-shipping',RetrieveShippingMethods);
router.get('/fetch-shipping-method/:shippingMethodId',RetrieveAShippingMethod);
router.post('/create-order',CreateOrder);
router.get('/fetch-order',SelectOrder);
router.get('/fetch-completed-order',SelectCompletedOrder);
router.post('/complete-order',CompleteOrder);
router.delete('/remove-order/:orderID',RemoveOrder);
router.post('/updateOrderStatus',UpdateOrderStatus)


export default router;