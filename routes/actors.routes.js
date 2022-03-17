const express = require('express')
const { getAllActors, createActors, getActorsById } = require('../controllers/actor.controller')


const router = express.Router() 

router.get('/', getAllActors)

router.post('/', createActors)

router.get('/:id', getActorsById)



module.exports = {actorsRouter: router}