const express = require('express')
const { getAllActors, createActors, getActorsById, updateActors, deleteActor } = require('../controllers/actor.controller')


const router = express.Router() 

router.get('/', getAllActors)

router.post('/', createActors)

router.get('/:id', getActorsById)

router.patch('/:id', updateActors)

router.delete('/:id', deleteActor )



module.exports = {actorsRouter: router}