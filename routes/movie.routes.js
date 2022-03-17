const express = require('express')

const { getAllmovie, createMovie, getMovieById, updateMovie, deleteMovie } = require('../controllers/movie.controller')

const router = express.Router() 

router.get('/', getAllmovie)

router.post('/', createMovie)

router.get('/:id', getMovieById)

router.patch('/:id', updateMovie)

router.delete('/:id', deleteMovie)


module.exports = {moviesRouter: router}