import express from 'express';
import { DeleteWishlistItem, GenerateUUID, GetWishlistItems, InsertWishlistItems } from "../Controllers/wishlistController.js";

const router = express.Router();

router.get('/',GenerateUUID);
router.post('/wishlist/add', InsertWishlistItems);
router.get('/wishlist/:userId',GetWishlistItems);
router.delete('/wishlist/delete/:id/:uuid',DeleteWishlistItem);


export default router;