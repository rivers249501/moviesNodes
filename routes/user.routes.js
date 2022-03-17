const express = require('express')

const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/user.controller')

const router = express.Router() 

router.get('/', getAllUsers)

router.post('/', createUser)

router.get('/:id', getUserById)

router.patch('/', updateUser)

router.delete('/:id', deleteUser )



module.exports = {usersRouter: router}