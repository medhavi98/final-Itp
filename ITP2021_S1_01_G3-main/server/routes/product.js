const Product = require('../models/product');
const express = require("express");

//const {  } = require('../controller/category');
const {
  requireSignin,
  adminMiddleware,
  uploadS3,
} = require("../common-middleware");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
} = require("../controllers/product");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
//const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "../client/public"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  '/product/create',
  requireSignin,
  adminMiddleware,
  upload.single('productPicture'),
  //uploadS3.array('productPicture'),
  createProduct
);
router.get("/products/:slug", getProductsBySlug);
//router.get('/category/getcategory', getCategories);
router.get("/product/:productId", getProductDetailsById);
router.delete(
  "/product/deleteProductById",
  requireSignin,
  adminMiddleware,
  deleteProductById
);
router.post(
  "/product/getProducts",
  requireSignin,
  adminMiddleware,
  getProducts
);
router.get('/getAllPro',async(req, res) => {

  try {
      
      const products = await Product.find();
  
      res.json({
         // "cusID": cusID.email,
          "products": products
      });
      
  } catch (error) {
      console.log(error);
  }

});

module.exports = router;
