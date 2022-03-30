const express = require('express');
const { body } = require('express-validator');

//controllers
const {
  getAllmovie,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie
} = require('../controllers/movie.controller');

//middleware
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middlewares');

const { movieExists } = require('../middlewares/moviesmiddleware');
const { createMovieValidators, validateResult } = require('../middlewares/validator.middleware');

//utils
const { upload } = require('../utils/multer');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllmovie)
  .post(protectAdmin, upload.single('imgUrl'),createMovieValidators, validateResult, createMovie);

router.use('/', movieExists);

router
  .route('/:id')
  .get(getMovieById)
  .patch(protectAdmin, updateMovie)
  .delete(protectAdmin, deleteMovie);

// router.post('/', validatesession, upload.single('imgUrl'), createmovie)
module.exports = { moviesRouter: router };
