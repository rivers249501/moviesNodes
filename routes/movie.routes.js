const express = require('express')

const { getAllmovie, createMovie, getMovieById } = require('../controllers/movie.controller')

const router = express.Router() 

router.get('/', getAllmovie)

router.post('/', createMovie)

router.get('/:id', getMovieById)



module.exports = {moviesRouter: router}