const express = require('express')

const { getAllUsers,
     createUser, 
     getUserById, 
     updateUser, deleteUser, loginUser } = require('../controllers/user.controller')

const { validateSession } =require('../middlewares/auth.middlewares')

const router = express.Router() 

router.get('/',validateSession, getAllUsers)

router.post('/', createUser)

router.get('/:id',validateSession, getUserById)

router.patch('/:id',validateSession, updateUser)

router.delete('/:id',validateSession, deleteUser )

router.post('/login', loginUser);


module.exports = {usersRouter: router}