
import pool from '../Db/database.js';
import {storedCurrencyExchange} from './currencyMethods.js'
import bwipjs from 'bwip-js'; // Import the barcode library
import fs from 'fs';
import slugify from 'slugify'

const getProductDetails = (productId) => {
  return new Promise((resolve, reject) => {
    let getProductQuery;

    if (!isNaN(productId)) {
      // If productId is a number, use the query for id
      getProductQuery = "SELECT * FROM products WHERE id = ?";
    } else {
      // If productId is a string, use the query for slug
      getProductQuery = "SELECT * FROM products WHERE slug = ?";
    }
    pool.query(getProductQuery, [productId], (error, productResult) => {
      if (error) {
        reject(error);
        return;
      }

      if (productResult.length === 0) {
        // Product not found in products table, fetch from memberships table
        const getMembershipQuery = "SELECT * FROM memberships WHERE slug = ?";
        pool.query(getMembershipQuery, [productId], (membershipError, membershipResult) => {
          if (membershipError) {
            reject(membershipError);
            return;
          }

          if (membershipResult.length === 0) {
            // Product not found in memberships table either
            reject("Product not found hello");
            return;
          }

          const membership = membershipResult[0];
          resolve(membership);
        });
      } else {
        // Product found in products table
        const product = productResult[0];
        resolve(product);
      }
    });
  });
};

const getCompleteProductData = async (productId) => {
  try {
    const product = await getProductDetails(productId);

    // Assuming you have a pool object defined earlier
    const getAttributesTypeQuery = "SELECT DISTINCT variationid, attributeprice, attributestock FROM `attributes` WHERE productId = ?";

    const varResult = await new Promise((resolve, reject) => {
      pool.query(getAttributesTypeQuery, [product.id], async (error, variations) => {
        if (error) {
          reject(error);
        } else {
          try {
            const variationsWithAttributeValues = await Promise.all(variations.map(async (variation) => {
              const getAttributeValuesQuery = "SELECT id,attributeValue, attributeType,attributeimg FROM `attributes` WHERE productId = ? AND variationid = ?";
              const attributeValues = await new Promise((resolve, reject) => {
                pool.query(getAttributeValuesQuery, [product.id, variation.variationid], (error, attresults) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(attresults);
                  }
                });
              });

              return {
                ...variation,
                attributeValues: attributeValues,
              };
            }));

            resolve(variationsWithAttributeValues);
          } catch (err) {
            reject(err);
          }
        }
      });
    });

    product.variations = varResult;

    return product;
  } catch (error) {
    throw error;
  }
};

const generateUniqueSlug = async (productName, attempt = 1) => {
  // Create the initial slug from the product name
  let slug = slugify(productName.toLowerCase());

  // Check if a product with the same slug already exists
  const existingProduct = await pool.query('SELECT * FROM products WHERE slug = ?', [slug]);

  if (existingProduct.length > 0) {
    // If a product with the same slug exists, append the attempt number to the slug
    slug = `${slug}-${attempt}`;
    
    // Recursively call the function with the updated slug and attempt number
    return generateUniqueSlug(productName, attempt + 1);
  }

  return slug;
};


export const InsertProducts = async (req, res) => {
  try {
    const {
      name,
      price,
      salePrice,
      categories,
      sku,
      isOnSale,
      isFeatured,
      videos,
      shortDescription,
      longDescription,
      status,
      variations, // Assuming variations are sent in the request body
    } = req.body;

     // Generate a unique slug for the product name
     const slug = await generateUniqueSlug(name);

    // Save product data to the database
    const productData = {
      name,
      slug,
      price,
      salePrice,
      categories,
      sku,
      isOnSale: Boolean(isOnSale),
      isFeatured: Boolean(isFeatured),
      videos,
      shortDescription,
      longDescription,
      status,
    };

    const insertProductQuery = "INSERT INTO products SET ?";
    pool.query(insertProductQuery, productData, async (error, productResult) => {
      if (error) {
        console.error("Error inserting product:", error);
        return res.status(500).json({ message: "Failed to create product" });
      }

      
       const productId = productResult.insertId;
 
      // Generate barcode image
      const barcodeOptions = {
        bcid: 'code128', // You can choose the barcode type, e.g., code128
        text: productId.toString(), // Use the product ID as the barcode text
        scale: 3, // Adjust the scale as needed
        height: 10, // Adjust the height as needed
        includetext: true, // Include the text in the barcode
      };

      bwipjs.toBuffer(barcodeOptions, async (barcodeError, barcodeBuffer) => {
        if (barcodeError) {
          console.error("Error generating barcode:", barcodeError);
          return res.status(500).json({ message: "Failed to generate barcode" });
        }

        // Save barcode image to a file (you may need to customize the file path)
        const barcodeImagePath = `productBarCodes/barcode_${productId}.png`;

        fs.writeFile(barcodeImagePath, barcodeBuffer, 'binary',async (fsError) => {
          if (fsError) {
            console.error("Error saving barcode image:", fsError);
            return res.status(500).json({ message: "Failed to save barcode image" });
          }

       const insertQuery = 'INSERT INTO attributes (variationid,productId, attributeType, attributeValue,attributeprice,attributestock) VALUES (?,?, ?, ?,?,?)';
          if(variations && variations.length>0){
            variations.map((nm)=>{
             nm.attributeValues.map(async (av)=>{
                 await pool.query(insertQuery, [nm.variationid,productId, av.attributeType, av.attributeValue,nm.price,nm.stock]);
              })
            })
          }
        
      
      try {
        res.status(200).json({ message: "Success", productId });
      } catch (attributeError) {
        console.error("Error inserting attributes:", attributeError);
        res.status(500).json({ message: "Failed to create product attributes" });
       }
    });
  });
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const UpdateProducts = async (req, res) => {
  const productId = req.params.productId
  try {
    const {
      name,
      price,
      salePrice,
      categories,
      sku,
      isOnSale,
      isFeatured,
      videos,
      shortDescription,
      longDescription,
      status,
      variations, // Assuming variations are sent in the request body
    } = req.body;

    
     // Generate a unique slug for the product name
     const slug = await generateUniqueSlug(name);


    // Save product data to the database
    const productData = {
      name,
      slug,
      price,
      salePrice,
      categories,
      sku,
      isOnSale: Boolean(isOnSale),
      isFeatured: Boolean(isFeatured),
      videos,
      shortDescription,
      longDescription,
      status,
    };
    const updateProductQuery = "UPDATE products SET ? WHERE id = ?";
    pool.query(updateProductQuery, [productData, productId], async (error, productResult) => {
      if (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Failed to update product" });
      }

      const selectAttrQuery = "select variationid from attributes WHERE productId = ?";
      pool.query(selectAttrQuery, [ productId], async (error, varResults) => {
        if (error) {
          console.error("Error updating product:", error);
          return res.status(500).json({ message: "Failed to update product" });
        }
    
const uniqueVariationIdsSet = new Set();

const matchingVariations = variations.filter((variationItem) => {
  const isMatching = varResults.some((resultItem) => {
    return resultItem.variationid === variationItem.variationid && !uniqueVariationIdsSet.has(resultItem.variationid);
  });

  if (isMatching) {
    uniqueVariationIdsSet.add(variationItem.variationid);
  }

  return isMatching;
});
const nonMatchingVariations = variations.filter((variationItem) => {
  return !varResults.some((resultItem) => resultItem.variationid === variationItem.variationid);
});


nonMatchingVariations.forEach(async (nm) => {
  try {
    const insertQuery = 'INSERT INTO attributes (variationid,productId, attributeType, attributeValue,attributeprice,attributestock,attributeimg) VALUES (?,?, ?, ?,?,?,?)';
    nm.attributeValues.map(async(av)=>{
      await pool.query(insertQuery, [nm.variationid,nm.productId, av.attributeType, av.attributeValue,nm.attributeprice,nm.attributestock,nm.attributeimg]);
    })
  } catch (error) {
    console.error('Error inserting attribute into database:', error.message);
  } 
});

      
    })
  })

     res.status(200).json({ message: "success", productId });
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const generateVariationId = () => {
  return Math.random().toString(36).substring(2); // Convert to base36 and remove '0.'
};
// POST /products/:productId/duplicate
export const DuplicateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch the product and its variations from the database
    pool.query('SELECT * FROM products WHERE id = ?', [productId], async (error, productData) => {
      if (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Failed to fetch products" });
      }

      if (!productData.length) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Duplicate the product
      const duplicatedProductData = { ...productData[0] };
      

      duplicatedProductData.name = `${duplicatedProductData.name} (copy)`;
      
     // Generate a unique slug for the product name
     const slug = await generateUniqueSlug(duplicatedProductData.name);

     duplicatedProductData.slug  = slug;
      delete duplicatedProductData.id;

      // Save the duplicated product to the database
      pool.query('INSERT INTO products SET ?', duplicatedProductData,(err,duplicatedProductResult)=>{
  
      const duplicatedProductId = duplicatedProductResult.insertId;

      
      // Generate barcode image
      const barcodeOptions = {
        bcid: 'code128', // You can choose the barcode type, e.g., code128
        text: duplicatedProductId.toString(), // Use the product ID as the barcode text
        scale: 3, // Adjust the scale as needed
        height: 10, // Adjust the height as needed
        includetext: true, // Include the text in the barcode
      };


      bwipjs.toBuffer(barcodeOptions, async (barcodeError, barcodeBuffer) => {
        if (barcodeError) {
          console.error("Error generating barcode:", barcodeError);
          return res.status(500).json({ message: "Failed to generate barcode" });
        }

        // Save barcode image to a file (you may need to customize the file path)
        const barcodeImagePath = `productBarCodes/barcode_${duplicatedProductId}.png`;

        fs.writeFile(barcodeImagePath, barcodeBuffer, 'binary',async (fsError) => {
          if (fsError) {
            console.error("Error saving barcode image:", fsError);
            return res.status(500).json({ message: "Failed to save barcode image" });
          }

    });
  });

      // Fetch the attributes associated with the original product
      pool.query('SELECT * FROM attributes WHERE productId = ?', [productId], async (err, attributes) => {
      
        attributes.map(async (attribute) => {
          const { 
            variationid,
            attributeType, 
            attributeValue,
            attributeprice,
            attributestock,
            attributeimg } = attribute;
           
          // Duplicate the attribute
          const duplicatedAttributeData = {
            variationid,
            productId: duplicatedProductId,
            attributeType,
            attributeValue,
            attributeprice,
            attributestock,
            attributeimg
          };
          delete duplicatedAttributeData.id;

          // Save the duplicated attribute to the database
          pool.query('INSERT INTO attributes SET ?', duplicatedAttributeData, (err, duplicatedAttributeResult) => {
            if (err) {
              console.error("Error inserting attributes in duplicate api:", err);
              return res.status(500).json({ message: "Error inserting attributes in duplicate api" });
            }
          });

        });
        
        res.status(200).json({ message: 'Product duplicated successfully!', productId: duplicatedProductId });
      });
    });
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Endpoint to delete a category by its ID
export const DeleteProduct = (req, res) => {
  const { productId } = req.params;

  // Check if the category exists
  const checkCategoryQuery = 'SELECT * FROM products WHERE id = ?';
  pool.query(checkCategoryQuery, [productId], (error, results) => {
    if (error) {
      console.error('Error checking category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'products not found' });
    } else {
      const deleteattributeQuery = 'DELETE FROM attributes WHERE productId = ?';
      pool.query(deleteattributeQuery, [productId], (err) => {
        if (err) {
          console.error('Error deleting category:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
      const deleteCategoryQuery = 'DELETE FROM products WHERE id = ?';
      pool.query(deleteCategoryQuery, [productId], (err) => {
        if (err) {
          console.error('Error deleting category:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: 'products deleted successfully' });
        }
      });
    }
  });
};


 export const UploadImages =  (req,res)=>{
    try{
      const productId = req.params.productId; // Get the productId from the URL parameter
  
          // Save image filenames to the database or file system
          if (req.files["featuredImage"]) {
            const featuredImageFilename = req.files["featuredImage"][0].filename;
            // Save the filename to the database for the product's featured image
            const updateFeaturedImageQuery =
              "UPDATE products SET featuredImage = ? WHERE id = ?";
            pool.query(
              updateFeaturedImageQuery,
              [featuredImageFilename, productId],
              (error) => {
                if (error) {
                  console.error("Error updating featured image:", error);
                }
              }
            );
          }
          if (req.files["thumbnailImages"]) {
            const thumbnailImageFilenames = req.files["thumbnailImages"].map(
              (file) => file.filename
            );
  
            // Serialize the thumbnailImageFilenames array to a string
            const serializedFilenames = JSON.stringify(thumbnailImageFilenames);
  
            // Save the serialized filenames to the database for the product's thumbnail images
            const updateThumbnailImagesQuery =
              "UPDATE products SET productImages = ? WHERE id = ?";
            pool.query(
              updateThumbnailImagesQuery,
              [serializedFilenames, productId],
              (error) => {
                if (error) {
                  console.error("Error inserting thumbnail images:", error);
                }
              }
            );
          }
          // Save image filenames to the database or file system
          if (req.files["variationImages"]) {
            const featuredImageFilename = req.files["variationImages"][0].filename;
            // Save the filename to the database for the product's featured image
            const updateFeaturedImageQuery =
              "UPDATE attributes SET attributeimg = ? WHERE productId = ?";
            pool.query(
              updateFeaturedImageQuery,
              [featuredImageFilename, productId],
              (error) => {
                if (error) {
                  console.error("Error updating featured image:", error);
                }
              }
            );
          }
           // Save image filenames to the database or file system
           if (req.files["thumb"]) {
           
            const featuredImageFilename = req.files["thumb"][0].filename;
            // Save the filename to the database for the product's featured image
            const updateFeaturedImageQuery =
              "UPDATE categories SET thumbnail = ? WHERE id = ?";
            pool.query(
              updateFeaturedImageQuery,
              [featuredImageFilename, productId],
              (error) => {
                if (error) {
                  console.error("Error updating thumb image:", error);
                }
              }
            );
          }

          res.status(200).json({message:"Product Created Successfully!"})
    }catch(error){
      console.log(error)
    }
};

export const GetProducts = async (req, res) => {
  try {
    const query = `
      SELECT slug
      FROM products ;
    `;

    const productDetails = await new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (productDetails.length === 0) {
      return res.status(200).json([]); // No products found
    }
     // Use Promise.all to handle asynchronous operations in parallel
     const productPromises = productDetails.map(async (p) => {
      return getCompleteProductData(p.slug);
    });

    const productsWithVariations = await Promise.all(productPromises);
    

    res.status(200).json(productsWithVariations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const GetAProduct = async (req, res) => {

  const productId = req.params.productId;

  try {

    const product = await getCompleteProductData(productId);
   
    const priceInUSD = product.price;

    //const exchangeRateUSDToSelectedCurrency = await storedCurrencyExchange();
    //const convertedPrice =  Math.ceil(priceInUSD * exchangeRateUSDToSelectedCurrency);
    const convertedPrice =  Math.ceil(priceInUSD );

    // Update the product data with the converted price
    const productWithConvertedPrice = { ...product, price: convertedPrice};

   
    res.status(200).json({ product: productWithConvertedPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product details" });
  }
};


export const GenerateNewBarcodes = async (req, res) => {
  try {
 

    const insertProductQuery = "select id from products";
    pool.query(insertProductQuery, async (error, productResult) => {
      if (error) {
        console.error("Error inserting product:", error);
        return res.status(500).json({ message: "Failed to create product" });
      }
      productResult.map((p)=>{
      let productId = p.id;
 
      // Generate barcode image
      const barcodeOptions = {
        bcid: 'code128', // You can choose the barcode type, e.g., code128
        text: productId.toString(), // Use the product ID as the barcode text
        scale: 3, // Adjust the scale as needed
        height: 10, // Adjust the height as needed
        includetext: true, // Include the text in the barcode
      };

      bwipjs.toBuffer(barcodeOptions, async (barcodeError, barcodeBuffer) => {
        if (barcodeError) {
          console.error("Error generating barcode:", barcodeError);
          return res.status(500).json({ message: "Failed to generate barcode" });
        }

        // Save barcode image to a file (you may need to customize the file path)
        const barcodeImagePath = `productBarCodes/barcode_${productId}.png`;

        fs.writeFile(barcodeImagePath, barcodeBuffer, 'binary',async (fsError) => {
          if (fsError) {
            console.error("Error saving barcode image:", fsError);
            return res.status(500).json({ message: "Failed to save barcode image" });
          }
      
      });
      
    });
      });
      try {
        res.status(200).json({ message: "Success" });
      } catch (attributeError) {
        res.status(500).json({ message: "Failed to create product attributes" });
      }
      })
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Endpoint to add a new category (including subcategories)
export const InsertCategories = async (req, res) => {
 
  const { name, parentId } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Category name is required' });
    return;
  }

  const sql = 'INSERT INTO categories (name, parentId) VALUES (?, ?)';
  pool.query(sql, [name, parentId], (err, results) => {
    if (err) {
      console.error('Error adding category:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newCategoryId = results.insertId;
      res.json({ message:"Success",_id: newCategoryId, name: name, parentId: parentId });
    }
  });
};

// Endpoint to get all categories (including subcategories)
export const GetCategories = async (req, res) => {
  
  const sql = 'SELECT * FROM categories';
  pool.query(sql, async (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const categories =  await buildCategoryTree(results);
      res.json(categories);
    }
  });
};

// Endpoint to get all categories (including subcategories)
export const GetTotalCountCat = async (req, res) => {
  const catname = req.params.catname;
  const sql = 'SELECT count(*) as totalcount FROM products where categories = ?';
  pool.query(sql,[catname], async (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results[0].totalcount);
    }
  });
};

// Endpoint to delete a category by its ID
export const DeleteCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  
  // Check if the category exists
  const checkCategoryQuery = 'SELECT * FROM categories WHERE _id = ?';
  pool.query(checkCategoryQuery, [categoryId], (error, results) => {
    if (error) {
      console.error('Error checking category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      // Delete the category
      const updateCategoryQuery = 'update products set categories = "uncategorized"  WHERE categories = ?';
      pool.query(updateCategoryQuery, [results[0].name], (err) => {
        if (err) {
          console.error('Error deleting category:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } 
      });
      const deleteCategoryQuery = 'DELETE FROM categories WHERE _id = ?';
      pool.query(deleteCategoryQuery, [categoryId], (err) => {
        if (err) {
          console.error('Error deleting category:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: 'Category deleted successfully' });
        }
      });
    }
  });
};

// Endpoint to update a category by its ID
export const UpdateCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  const { name, parentId } = req.body;
  
  // Check if the category exists
  const checkCategoryQuery = 'SELECT * FROM categories WHERE _id = ?';
  pool.query(checkCategoryQuery, [categoryId], (error, results) => {
    if (error) {
      console.error('Error checking category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      // Update the category
      const updateCategoryQuery = 'UPDATE categories SET name = ?, parentId = ? WHERE _id = ?';
      pool.query(updateCategoryQuery, [name, parentId, categoryId], (err) => {
        if (err) {
          console.error('Error updating category:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: 'Category updated successfully' });
        }
      });
    }
  });
};

// Function to build the hierarchical category tree from the flat category data
async function buildCategoryTree(categories) {
  const categoryMap = new Map();
  const rootCategories = [];

  // Create a map of categoryId -> category
  categories.forEach((category) => {
    const categoryId = category._id;
    category.subcategories = [];
    categoryMap.set(categoryId, category);
  });

  // Populate the subcategories for each category
  categories.forEach((category) => {
    const parentId = category.parentId;
    if (parentId !== null) {
      const parentCategory = categoryMap.get(parentId);
      if (parentCategory) {
        parentCategory.subcategories.push(category);
      }
    } else {
      rootCategories.push(category);
    }
  });

  return rootCategories;
}

// Fetch memberships
export const GetMemberShips = (req, res) => {
  pool.query('SELECT membership_id as id,name,price,duration_months,description,apparel_discount FROM memberships', (err, results) => {
    if (err) {
      console.error('Error fetching memberships:', err);
      res.status(500).json({ error: 'Error fetching memberships' });
    } else {
      res.json(results);
    }
  });
};

// Fetch memberships
export const GetTotalStockFilter = (req, res) => {
  pool.query('SELECT productId,sum(attributestock) as totalstock from attributes a,products p  where p.id = a.productId and p.status = "published" group by productId', (err, results) => {
    if (err) {
      console.error('Error fetching stock:', err);
      res.status(500).json({ error: 'Error fetching stock' });
    } else {
      res.json(results);
    }
  });
};

// Fetch memberships
export const GetSizesColors = (req, res) => {
  pool.query('SELECT productId,attributeValue,attributeType from attributes a,products p  where p.id = a.productId and p.status = "published"', (err, results) => {
    if (err) {
      console.error('Error fetching sizes and colors:', err);
      res.status(500).json({ error: 'Error fetching sizes and colors' });
    } else {
      res.json(results);
    }
  });
};

  
  