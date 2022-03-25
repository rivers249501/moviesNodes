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

router.post('/', createUser);

router.post('/login', loginUser);

router.use(validateSession);

router.get('/', protectAdmin, getAllUsers);

// router.get('/check-token')
router.use('/', userExists);

router.get('/:id', getUserById);

router.patch('/:id', protectAccountOwner, updateUser);

router.delete('/:id', protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
