import express from 'express';
import multer from 'multer';
import path from 'path';
import { InsertProducts, UploadImages,GetProducts, GetAProduct, DuplicateProduct,InsertCategories,
  GetCategories, UpdateCategory, DeleteCategory, JoinVariationsAndAttributesWithProduct } from '../Controllers/productController.js';
  import {getCurrencyCodeApi} from '../Controllers/currencyMethods.js'

const router = express.Router();

router.post("/products",InsertProducts);

  // Create a storage engine to save the uploaded files to the server's file system
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Store images in the 'uploads' directory
    },
    filename: (req, file, cb) => {
      // Generate a unique filename using the current timestamp
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
  });
  
  const upload = multer({ storage: storage });
  
router.post('/upload-images/:productId',upload.fields([{ name: "featuredImage", maxCount: 1 },{ name: "thumbnailImages", maxCount: 10 },]),UploadImages);

router.get("/products",GetProducts);

// Endpoint to get product details by productId
router.get("/products/:productId",GetAProduct);

// Endpoint to get product details by productId
router.get("/products/join-variations-attributes",JoinVariationsAndAttributesWithProduct);

router.post('/products/:productId/duplicate',DuplicateProduct);

router.get('/categories', GetCategories);

router.post('/categories', express.json(), InsertCategories);


router.put('/categories/:categoryId', UpdateCategory);

router.delete('/categories/:categoryId', DeleteCategory);


router.post('/post-currency', getCurrencyCodeApi);

    
export default router;