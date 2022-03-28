const express = require('express');

//controllers
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/user.controller');

//middlewares
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middlewares');

const {
  userExists,
  protectAccountOwner
} = require('../middlewares/users.middleware');

const router = express.Router();

router.post('/', createUser).post('/login', loginUser);
// .route('/login')

router.use(validateSession);

router.route('/').get(protectAdmin, getAllUsers);

// router.get('/check-token')
router.use('/', userExists);

router
  .route('/:id')
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
