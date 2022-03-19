const express = require('express')

const { getAllmovie, createMovie, getMovieById, updateMovie, deleteMovie } = require('../controllers/movie.controller')
const { upload } = require('../utils/multer')

const router = express.Router() 

router.get('/', getAllmovie)

// router.post('/', createMovie)

router.get('/:id', getMovieById)

router.patch('/:id', updateMovie)

router.delete('/:id', deleteMovie)

router.post('/', upload.single('imgUrl'), createMovie)

module.exports = {moviesRouter: router}