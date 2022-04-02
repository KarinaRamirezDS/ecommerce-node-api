const express = require('express');

// Controller
const {
  getAllProducts,
  createNewProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/products.controller');

// Middlewares
const { validateSession } = require('../middlewares/auth.middleware');
const {
  productExists,
  productOwner
} = require('../middlewares/products.middleware');
const {
  createProductValidations,
  validateResult
} = require('../middlewares/validators.middleware');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllProducts)
  .post(createProductValidations, validateResult, createNewProduct);

router
  .use('/:id', productExists)
  .route('/:id')
  .get(getProductById)
  .patch(productOwner, updateProduct)
  .delete(productOwner, deleteProduct);

module.exports = { productsRouter: router };
