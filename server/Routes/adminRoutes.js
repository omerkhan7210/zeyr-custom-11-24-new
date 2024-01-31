
import express from 'express';
import { AdminLogin, BulkEditCats, GetOrderDetails, GetTotalSales, GetTotalStock, SelectAddressesForUser, SelectAllUsers, SelectCompletedOrderAdmin, SelectCompletedOrderForUser } from '../Controllers/adminController.js';

const router = express.Router();

router.post('/admin/login',AdminLogin);
router.get('/select-all-users',SelectAllUsers);
router.get('/fetch-completed-order-admin',SelectCompletedOrderAdmin);
router.get('/fetch-completed-order-user/:userID',SelectCompletedOrderForUser);
router.get('/fetch-addresses-user/:userID',SelectAddressesForUser);
router.get('/products-sales/:pid',GetTotalSales);
router.get('/products-stock/:pid',GetTotalStock);
router.get('/orders-details',GetOrderDetails);
router.post('/bulkEdit',BulkEditCats)

export default router;