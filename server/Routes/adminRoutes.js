
import express from 'express';
import { AddMemberships, AddShippingMethods, AdminLogin, BulkEditCats, BulkEditStatus, DeleteMemberships, DeleteShippingMethods, EditMemberships, EditShippingMethods, GetOrderDetails, GetTotalSales, GetTotalStock, SelectAddressesForUser, SelectAllUsers, SelectCompletedOrderAdmin, SelectCompletedOrderForUser } from '../Controllers/adminController.js';

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
router.post('/bulkEditStatus',BulkEditStatus)
router.post('/add-shipping-methods',AddShippingMethods)
router.put('/edit-shipping-methods/:id',EditShippingMethods)
router.delete('/delete-shipping-methods/:id',DeleteShippingMethods)
router.post('/add-memberships',AddMemberships)
router.put('/edit-memberships/:id',EditMemberships)
router.delete('/delete-memberships/:id',DeleteMemberships)

export default router;