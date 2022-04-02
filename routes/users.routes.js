const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  loginUser,
  getUsersProducts,
  getOrderById,
  getUsersOrders
} = require('../controllers/users.controller');

// Middlewares
const { validateSession } = require('../middlewares/auth.middleware');
const {
  userExists,
  protectUserAccount
} = require('../middlewares/users.middleware');

const router = express.Router();

router.post('/', createNewUser);

router.post('/login', loginUser);

router.use(validateSession);

router.get('/', getAllUsers);

router.get('/me', getUsersProducts);

router.get('/orders', getUsersOrders);

router.get('/orders/:id', getOrderById);

router
  .use('/:id', userExists)
  .route('/:id')
  .get(getUserById)
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount, deleteUser);

module.exports = { usersRouter: router };
