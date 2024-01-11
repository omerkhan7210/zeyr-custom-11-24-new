import pool from '../Db/database.js';

// API endpoint to insert user currency preferences
export const CurrencyCode = async (req, res) => {
  const { userUUID, currencyCode, country } = req.body;

  try {

    pool.query('SELECT * FROM user_currency_preferences WHERE user_uuid = ?', [userUUID], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {  
      // User UUID exists, update the existing record
      const updateQuery = 'UPDATE user_currency_preferences SET currency_code = ?, country = ?, is_active = true WHERE user_uuid = ?';
      pool.query(updateQuery, [currencyCode, country, userUUID]);
    } else {
      // User UUID doesn't exist, insert a new record
      const insertQuery = 'INSERT INTO user_currency_preferences (user_uuid, currency_code, country, is_active) VALUES (?, ?, ?, true)';
      pool.query(insertQuery, [userUUID, currencyCode, country]);
    }

    res.status(201).json({ message: 'Currency added successfully' });
    })
  } catch (error) {
    console.error('Error inserting/updating user currency preferences:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

  // API endpoint to get user currency preferences
  export const selectCurrencyCode = async (req, res) => {
    const userUUID = req.params.userUUID;
  
    try {
      pool.query('SELECT * FROM user_currency_preferences WHERE user_uuid = ?', [userUUID], async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
  
      res.status(200).json({ results });
      })
    } catch (error) {
      console.error('Error fetching user currency preferences:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  