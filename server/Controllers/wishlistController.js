import pool from '../Db/database.js'
import { v4 as uuidv4 } from 'uuid';

// Generate a unique identifier and send it to the client
export const GenerateUUID =  (req, res) => {
    const uniqueIdentifier = uuidv4(); // Generate a UUID
    res.cookie('userId', uniqueIdentifier, { httpOnly: true }); // You can set other options as needed
    return res.status(200).json({message:uniqueIdentifier});
  };
  export const InsertWishlistItems = async (req, res) => {
    const { uuid, prod_id } = req.body;
  
    const sql = 'INSERT INTO wishlist_items (user_id, prod_id) VALUES (?, ?)';
    const values = [uuid, prod_id]; // Assuming cartItems is an array, you need to convert it to a JSON string before inserting it into the TEXT column.
  
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add item to wishlist' });
      }
      return res.json({ success: true, message: 'Item added to wishlist successfully' });
    });
  };
  
 export const GetWishlistItems = async (req, res) => {

    const userId = req.params.userId;
  
    const sql = 'SELECT * FROM wishlist_items WHERE user_id = ?';
    pool.query(sql, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch wishlist items' });
      }
      return res.status(200).json({ wishlistItems: results });
    });
  };

  export const DeleteWishlistItem = async (req, res) => {
    const cartItemId = req.params.id; 
    const uuid = req.params.uuid;
    const sql = 'DELETE FROM wishlist_items WHERE user_id = ? AND prod_id = ?';
    const values = [uuid, cartItemId];
  
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete item from wishlist' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Wishlist item not found' });
      }
      return res.json({ success: true, message: 'Item deleted from wishlist successfully' });
    });
  };
  
  