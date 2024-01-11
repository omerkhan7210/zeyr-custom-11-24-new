
import express from 'express';
import { AdminLogin,AdminRegister, RetrieveAddressAdmin, SelectACompletedOrderAdmin, SelectAllUsers, SelectCompletedOrderAdmin } from '../Controllers/adminController.js';

const router = express.Router();

router.post('/admin/register',AdminRegister);
router.post('/admin/login',AdminLogin);
router.get('/select-all-users',SelectAllUsers);
router.get('/fetch-completed-order-admin',SelectCompletedOrderAdmin);
router.get('/retrieve-address-admin/:userID',RetrieveAddressAdmin);
router.get('/fetch-all-orders-admin/:orderID',SelectACompletedOrderAdmin);

export default router;