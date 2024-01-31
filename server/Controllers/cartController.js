import pool from '../Db/database.js'
import { v4 as uuidv4 } from 'uuid';



// Generate a unique identifier and send it to the client
export const GenerateUUID =  (req, res) => {
    const uniqueIdentifier = uuidv4(); // Generate a UUID
    res.cookie('userId', uniqueIdentifier, { httpOnly: true }); // You can set other options as needed
    return res.status(200).json({message:uniqueIdentifier});
  };

  
  export const InsertCartItems = async (req, res) => {
    const { uuid, prod_id,variations,quantity } = req.body;

    const sql = 'INSERT INTO cart_items (user_id, prod_id,selectedVariations,quantity) VALUES (?, ?,?,?)';
    const values = [uuid, prod_id,JSON.stringify(variations),quantity]; // Assuming cartItems is an array, you need to convert it to a JSON string before inserting it into the TEXT column.
  
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add item to cart' });
      }
      return res.json({ success: true, message: 'Item added to cart successfully' });
    });
  };
  
 export const GetCartItems = async (req, res) => {
  
    const userId = req.params.userId;
    const sql = 'SELECT * FROM cart_items WHERE user_id = ?';
    pool.query(sql, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch cart items' });
      }
      return res.status(200).json({ cartItems: results });
    });
  
  };

  
  export const UpdateCartItem = async (req, res) => {
    const { uuid,quantity,productId } = req.body;
    const sql = 'UPDATE cart_items SET quantity = ? WHERE user_id = ? and prod_id = ?';
    const values = [quantity, uuid,productId];
  
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update item' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      return res.json({ success: true, message: 'Item updated successfully' });
    });
  };

  export const DeleteCartItem = async (req, res) => {
    const cartItemId = req.params.id; 
    const uuid = req.params.uuid;
    const sql = 'DELETE FROM cart_items WHERE user_id = ? AND prod_id = ?';
    const values = [uuid, cartItemId];
  
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete item from cart' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      return res.json({ success: true, message: 'Item deleted from cart successfully' });
    });
  };
  
  