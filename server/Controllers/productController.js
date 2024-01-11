
import pool from '../Db/database.js';
import {storedCurrencyExchange} from './currencyMethods.js'

const getProductDetails = (productId) => {
  return new Promise((resolve, reject) => {
    const getProductQuery = "SELECT * FROM products WHERE id = ?";
    pool.query(getProductQuery, [productId], (error, productResult) => {
      if (error) {
        reject(error);
      }

      if (productResult.length === 0) {
        reject("Product not found");
      }

      const product = productResult[0];
      resolve(product);
    });
  });
};

const getVariationsForProduct = (productId) => {
  return new Promise((resolve, reject) => {
    const getVariationsQuery = "SELECT * FROM variations WHERE productId = ?";
    pool.query(getVariationsQuery, [productId], (error, variationsResult) => {
      if (error) {
        reject(error);
      }
      resolve(variationsResult);
    });
  });
};

const getAttributesForVariation = (variationId) => {
  return new Promise((resolve, reject) => {
    const getAttributesQuery = "SELECT * FROM variation_attributes WHERE variationId = ?";
    pool.query(getAttributesQuery, [variationId], (error, attributesResult) => {
      if (error) {
        reject(error);
      }
      resolve(attributesResult);
    });
  });
};
const getAttributeTypesForProduct = (productId) => {
  return new Promise((resolve, reject) => {
    const getAttributesTypeQuery = "SELECT * FROM attributes WHERE productId = ?";
    pool.query(getAttributesTypeQuery, [productId], (error, attributeTypeResult) => {
      if (error) {
        reject(error);
      }
      resolve(attributeTypeResult);
    });
  });
};

const getCompleteProductData = async (productId) => {
  try {
    const product = await getProductDetails(productId);
    const variations = await getVariationsForProduct(productId);

    const variationsWithAttributesPromises = variations.map(async (variation) => {
      const attributes = await getAttributesForVariation(variation.id);
      const attributeTypes = await getAttributeTypesForProduct(productId);
      variation.attributes = attributes;
      product.attributes = attributeTypes;
      return variation;
    });

    const variationsWithAttributes = await Promise.all(variationsWithAttributesPromises);

    product.variations = variationsWithAttributes;

    return product;
  } catch (error) {
    throw error;
  }
};

// A function to join variations and attributes with an existing product
const joinVariationsAndAttributesWithProduct = async (product) => {
  console.log(product)
  try {
    const variations = await getVariationsForProduct(product.id);

    const variationsWithAttributesPromises = variations.map(async (variation) => {
      const attributes = await getAttributesForVariation(variation.id);
      variation.attributes = attributes;
      return variation;
    });

    const variationsWithAttributes = await Promise.all(variationsWithAttributesPromises);

    product.variations = variationsWithAttributes;

    return product;
  } catch (error) {
    console.error("Error joining variations and attributes with the product:", error);
    throw error;
  }
};


export const InsertProducts = async (req, res) => {
      try {
      
          const {
            name,
            price,
            categories,
            sku,
            isOnSale,
            isFeatured,
            videos,
            shortDescription,
            longDescription,
            status,
          } = req.body;
    
          // Save product data to the database
          const productData = {
            name,
            price,
            categories,
            sku,
            isOnSale: Boolean(isOnSale),
            isFeatured: Boolean(isFeatured),
            videos,
            shortDescription,
            longDescription,
            status
          };
    
          const insertProductQuery = "INSERT INTO products SET ?";
          pool.query(insertProductQuery, productData, async (error, productResult) => {
            if (error) {
              console.error("Error inserting product:", error);
              return res.status(500).json({ message: "Failed to create product" });
            }
    
            const productId = productResult.insertId;
            const variations = JSON.parse(req.body.variations);
    
            const insertVariationAttribute = (variationId, attributeId, attributeValue) => {
            
              const insertVariationAttributeQuery =
                "INSERT INTO variation_attributes (variationId, attributeId, attributeValue) VALUES (?, ?, ?)";
              return new Promise((resolve, reject) => {
                pool.query(insertVariationAttributeQuery, [variationId, attributeId, attributeValue], (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                });
              });
            };
            
            const insertVariation = (productId, price, stock) => {
             
  
              const insertVariationQuery = "INSERT INTO variations (productId, price, stock) VALUES (?, ?, ?)";
              return new Promise((resolve, reject) => {
                pool.query(insertVariationQuery, [productId, price, stock], (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result.insertId);
                  }
                });
              });
            };
            
            const insertAttribute = (productId, attributeType, attributeValue) => {
             
              const insertAttributeQuery = "INSERT INTO attributes (productId, attributeType, attributeValue) VALUES (?, ?, ?)";
              return new Promise((resolve, reject) => {
                pool.query(insertAttributeQuery, [productId, attributeType, attributeValue], (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result.insertId);
                  }
                });
              });
            };
            
            const processVariations = async (productId, variations) => {
              for (const variation of variations) {
                const { attributeValues, price, stock } = variation;
            
                // Determine the attributeType and attributeValue for the current variation
                let attributeType = null;
                let attributeValue = null;
                if (attributeValues.color) {
                  attributeType = "color";
                  attributeValue = attributeValues.color;
                } else if (attributeValues.size) {
                  attributeType = "size";
                  attributeValue = attributeValues.size;
                }
            
                let attributeId = null;
                let variationId = null;
            
                if (attributeType && attributeValue) {
                  // Insert the attribute and get the attributeId
                  try {
                    attributeId = await insertAttribute(productId, attributeType, attributeValue);
                  } catch (error) {
                    console.error("Error inserting attribute:", error);
                  }
                }
            
                // Insert the variation and get the variationId
                try {
                  variationId = await insertVariation(productId, price, stock);
                } catch (error) {
                  console.error("Error inserting variation:", error);
                }
                // Insert the variation attribute
                if (variationId && attributeId) {
                  try {
                    await insertVariationAttribute(variationId, attributeId, attributeValue);
                  } catch (error) {
                    console.error("Error inserting variation attribute:", error);
                  }
                }
              }
            };
  
            
    // Process the variations and insert into the database
            await processVariations(productId, variations);
            res.status(200).json({ message: "Success" ,productId});
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error" });
        }
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
      delete duplicatedProductData.id;

      // Save the duplicated product to the database
      pool.query('INSERT INTO products SET ?', duplicatedProductData,(err,duplicatedProductResult)=>{

      
      const duplicatedProductId = duplicatedProductResult.insertId;

      // Fetch the attributes associated with the original product
      pool.query('SELECT * FROM attributes WHERE productId = ?', [productId], async (err, attributes) => {
        // Duplicate each attribute and associate it with the duplicated product
        attributes.map(async (attribute) => {
          const { attributeType, attributeValue } = attribute;

          // Duplicate the attribute
          const duplicatedAttributeData = {
            productId: duplicatedProductId,
            attributeType,
            attributeValue,
          };
          delete duplicatedAttributeData.id;

          // Save the duplicated attribute to the database
          pool.query('INSERT INTO attributes SET ?', duplicatedAttributeData, (err, duplicatedAttributeResult) => {
            const duplicatedAttributeId = duplicatedAttributeResult.insertId;

            // Fetch the associated variation and attribute data
            pool.query('SELECT * FROM variation_attributes WHERE attributeId = ?', [attribute.id], (err,variationAttributes) => {


              // Duplicate each variation attribute and associate it with the duplicated attribute
              variationAttributes.map(async (variationAttribute) => {
                const { variationId, attributeValue } = variationAttribute;

                // Duplicate the variation attribute
                const duplicatedVariationAttributeData = {
                  variationId: variationId,
                  attributeId: duplicatedAttributeId,
                  attributeValue,
                };
                delete duplicatedVariationAttributeData.id;

                // Save the duplicated variation attribute to the database
                pool.query('INSERT INTO variation_attributes SET ?', duplicatedVariationAttributeData);

              });
            });
          });

        });

        // Fetch the variations associated with the original product
        pool.query('SELECT * FROM variations WHERE productId = ?', [productId], async (err, variations) => {
          // Duplicate each variation and associate it with the duplicated product
          variations.map(async (variation) => {
            const { price, stock } = variation;

            // Duplicate the variation
            const duplicatedVariationData = {
              productId: duplicatedProductId,
              price,
              stock,
            };
            delete duplicatedVariationData.id;

            // Save the duplicated variation to the database
            pool.query('INSERT INTO variations SET ?', duplicatedVariationData,(err,duplicatedVariationResult)=>{
              const duplicatedVariationId = duplicatedVariationResult.insertId;

              // Fetch the associated variation attributes from the database
              pool.query('SELECT * FROM variation_attributes WHERE variationId = ?', [variation.id],(err,variationAttributes)=>{
                  // Duplicate each variation attribute and associate it with the duplicated variation
                  variationAttributes.map(async (attribute) => {
                    const { attributeId, attributeValue } = attribute;

                    // Duplicate the variation attribute
                    const duplicatedAttributeData = {
                      variationId: duplicatedVariationId,
                      attributeId,
                      attributeValue,
                    };
                    delete duplicatedAttributeData.id;

                    // Save the duplicated attribute to the database
                    pool.query('INSERT INTO variation_attributes SET ?', duplicatedAttributeData);
                  });

              });
            });
          });


          res.status(200).json({ message: 'Product duplicated successfully!', productId: duplicatedProductId });
        });
      });
    });
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
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

          res.status(200).json({message:"Product Created Successfully!"})
    }catch(error){
      console.log(error)
    }
};

export const GetProducts = async (req, res) => {
  try {
    const query = `
      SELECT
        p.*,
        v.id AS variationId,
        v.price,
        v.stock,
        va.id AS attributeId,
        va.attributeValue,
        a.attributeType
      FROM products p
      LEFT JOIN variations v ON p.id = v.productId
      LEFT JOIN variation_attributes va ON v.id = va.variationId
      LEFT JOIN attributes a ON p.id = a.productId;
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

    // Create a map to group products with their associated variations
    const productsMap = new Map();

    await Promise.all(
      productDetails.map(async (row) => {
        const id = row.id;

        const exchangeRateUSDToSelectedCurrency = await storedCurrencyExchange();
        const convertedProductPrices = Math.ceil(
          row.price * exchangeRateUSDToSelectedCurrency
        );

        if (!productsMap.has(id)) {
          productsMap.set(id, {
            id: id,
            name: row.name,
            price: convertedProductPrices,
            categories: row.categories,
            sku: row.sku,
            status: row.status,
            productImages: row.productImages,
            featuredImage: row.featuredImage,
            shortDescription: row.shortDescription,
            longDescription: row.longDescription,
            variations: [],
          });
        }

        const product = productsMap.get(id);
        const variation = {
          id: row.variationId,
          productId: id,
          price: convertedProductPrices,
          stock: row.stock,
          attributes: {
            attributeId: row.attributeId,
            id: id,
            variationId: row.variationId,
            attributeValue: row.attributeValue,
            attributeType: row.attributeType,
          },
        };
        product.variations.push(variation);
      })
    );

    // Convert the map values to an array of products
    const productsWithVariations = Array.from(productsMap.values());

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

    const exchangeRateUSDToSelectedCurrency = await storedCurrencyExchange();
    const convertedPrice =  Math.ceil(priceInUSD * exchangeRateUSDToSelectedCurrency);

    // Update the product data with the converted price
    const productWithConvertedPrice = { ...product, price: convertedPrice};

   
    res.status(200).json({ product: productWithConvertedPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product details" });
  }
};


// The API endpoint to join variations and attributes with an existing product
export const JoinVariationsAndAttributesWithProduct = async (req, res) => {
  // You should have the product object in req.body or req.params, assuming it's already fetched.
  const product = req.body.product; // Modify this line to access the product object correctly.
  try {
    const productWithVariationsAndAttributes = await joinVariationsAndAttributesWithProduct(product);
    res.status(200).json({ product: productWithVariationsAndAttributes });
  } catch (error) {
    res.status(500).json({ message: "Failed to join variations and attributes with the product" });
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
      res.json({ _id: newCategoryId, name: name, parentId: parentId });
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

  
  