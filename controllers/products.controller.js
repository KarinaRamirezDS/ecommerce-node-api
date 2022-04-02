// Models
const { Product } = require('../models/product.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

//Get All products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: {
      status: 'active'
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password']
        }
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    data: { products }
  });
});
// Get products by Id
exports.getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({
    status: 'success',
    data: { product }
  });
});

//Create a new product
exports.createNewProduct = catchAsync(async (req, res, next) => {
  const { title, description, quantity, price } = req.body;
  const { id } = req.currentUser;

  const newProduct = await Product.create({
    title,
    description,
    quantity,
    price,
    userId: id
  });

  res.status(201).json({
    status: 'success',
    data: { newProduct }
  });
});

//Update product
exports.updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  const data = filterObj(req.body, 'title', 'description', 'quantity', 'price');

  await product.update({ ...data });

  res.status(204).json({ status: 'success' });
});

//Changue status deleted

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
