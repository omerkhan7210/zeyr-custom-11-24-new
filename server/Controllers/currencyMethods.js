
import pool from '../Db/database.js';
import axios from 'axios'

  // Define currency codes corresponding to the countries
const currencyCodes = {
    "Australia": "AUD",
    "Bahrain": "BHD",
    "Kuwait": "KWD",
    "Malaysia": "MYR",
    "New Zealand": "NZD",
    "Oman": "OMR",
    "Pakistan": "PKR",
    "Qatar": "QAR",
    "Saudi Arabia": "SAR",
    "Singapore": "SGD",
    "Turkey": "TRY",
    "UAE": "AED",
    "International": "USD"
  };
   let storedCurrencyCode = null; // Variable to store the selected currency code


const filterRatesMethod = async () => {
    try {
    
      return new Promise(async (resolve, reject) => {
        const getProductQuery = "SELECT * FROM exchange_rates";
        pool.query(getProductQuery, async (error, res) => {
          if (error) {
            reject(error);
          }
    
          if (res.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            const lastFetchedDate = res[0].fetched_at.toISOString().split('T')[0];
    
            // If data was fetched today, use the existing data
           // if (today === lastFetchedDate) {
              const ratesMap = res.reduce((acc, rate) => {
                acc[rate.currency_code] = rate.exchange_rate;
                return acc;
              }, {});
    
              resolve(ratesMap);
            // } else {
            //   // If data was not fetched today, fetch new rates from the API
            //   try {
  
            //     const getProductQuery = "Delete FROM exchange_rates";
        
            //     pool.query(getProductQuery, async (error, res) => {
            //       if (error) {
            //         throw new Error('Failed to fetch data');
            //       }
            //     })
            //     const apiUrl = 'http://api.exchangeratesapi.io/v1/latest?access_key=d11c282a5d994f8d18ee4b288f8a81cd';
            //     const response = await axios.get(apiUrl);
    
            //     if (response.status !== 200) {
            //       throw new Error('Failed to fetch data');
            //     }
    
            //     const data = response.data;
    
            //     // Filter rates for the specified countries
            //     const newRates = Object.keys(currencyCodes).reduce((acc, country) => {
            //       const currencyCode = currencyCodes[country];
            //       if (data.rates && data.rates[currencyCode]) {
            //         acc[currencyCode] = data.rates[currencyCode];
            //       }
            //       return acc;
            //     }, {});
    
               
            //     Object.entries(newRates).map(([currencyCode, rate]) => {
            //         const insertQuery = 'INSERT INTO exchange_rates (currency_code, exchange_rate) VALUES (?, ?)';
                    
            //           pool.query(insertQuery, [currencyCode, rate], (err, res) => {
            //             if (err) {
            //               reject(err);
            //             } else {
                          
            //               resolve(res);
            //             }
            //           });
            //       });
      
    
            //     resolve(newRates);
            //   } catch (error) {
            //     reject(error);
            //   }
            // }
          }
        });
      });
     
    } catch (error) {
      // Handle errors
      console.error(error);
      throw error;
    }
  };
  
  export const getCurrencyCodeApi = async (req, res) => {
   
    try {
      const { selectedCurrencyCode } = req.body;
  
      // Store the selected currency code asynchronously
      await storeCurrencyCode(selectedCurrencyCode);
      res.status(200).json({ selectedCurrencyCode });
    } catch (err) {
      console.error(err);
      // Send an error response back to the client
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Function to store the selected currency code asynchronously
  const storeCurrencyCode = async (currencyCode) => {
    return new Promise((resolve, reject) => {
        storedCurrencyCode = currencyCode;
        resolve();
    });
  };

  export const storedCurrencyExchange= async()=>{
    const filteredRates = await filterRatesMethod()
    const selectedCurrencyCode = await storedCurrencyCode
      const exchangeRateUSDToSelectedCurrency = filteredRates[selectedCurrencyCode];
      return exchangeRateUSDToSelectedCurrency
      
  }