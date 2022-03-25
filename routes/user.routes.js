const express = require('express');

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/user.controller');

const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middlewares');

const {
  userExists,
  protectAccountOwner
} = require('../middlewares/users.middleware');

const router = express.Router();

router.use(validateSession);

router
.route('/')
.post(createUser)
.get(protectAdmin, getAllUsers);

router
.route('/login')
.post(loginUser)

// router.get('/check-token')
router.use('/', userExists);

router
.route('/:id')
.get(getUserById)
.patch(protectAccountOwner, updateUser)
.delete(protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
