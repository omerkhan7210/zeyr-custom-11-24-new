import express from 'express';
import { DeleteCartItem, GenerateUUID, GetCartItems, InsertCartItems, UpdateCartItem } from "../Controllers/cartController.js";

const router = express.Router();

router.get('/',GenerateUUID);
router.post('/cart/add', InsertCartItems);
router.get('/cart/:userId',GetCartItems);
router.delete('/cart/delete/:id/:uuid',DeleteCartItem);
router.put('/cart/update',UpdateCartItem)



export default router;