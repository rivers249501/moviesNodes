const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { validationResult } = require('express-validator');
//models
const { ActorsInMovies } = require('../models/actorsInMovies.model');
const { Movies } = require('../models/movies.model');
const { User } = require('../models/users.model');
const { Review } = require('../models/reviews.model');
const { Actor } = require('../models/actors.model');
//utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');
// const { moviesRouter } = require('../routes/movie.routes');

exports.getAllmovie = catchAsync(async (req, res, next) => {
  const movie = await Movies.findAll({
    where: { status: 'active' },
    include: [ {model: Actor}],
    // include: [{model: Review}]  
  });

  // if (movie.length === 0) {
  //   return next(new AppError(404, 'User not found'));
  // }
  //promise[]
  const moviesPromises = movie.map(
    async ({
      id,
      title,
      description,
      duration,
      rating,
      imgUrl,
      genre,
      createdAt,
      updatedAt,
      actor,
      // review
    }) => {
      const imgRef = ref(storage, imgUrl);
      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        title,
        description,
        duration,
        rating,
        imgUrl: imgDownloadUrl,
        genre,
        createdAt,
        updatedAt,
        actor, 
        // review
      };
    }
  );

  const resolveMovie = await Promise.all(moviesPromises);

  res.status(201).json({
    status: 'success',
    data: {
      movie: resolveMovie
    }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  // const { id } = req.params;
  // const movie = await Movies.findOne({
  //   where: { id: id, status: 'active' }
  // });
  const { movie } = req;
  // if (!movie) {
  //   return next(new AppError(404, 'User not found'));
  // }

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre, actors } = req.body;

  // if (!title || !description || !duration || !rating || !genre) {
  //   return next(new AppError(404, 'Verify the properties and their content'));
  // }
  // Upload img to Cloud Storage (Firebase)
  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/movies/${title}-${Date.now()}.${fileExtension}`
  );
  const result = await uploadBytes(imgRef, req.file.buffer);

  const newMovie = await Movies.create({
    title: title,
    description: description,
    duration: duration,
    rating: rating,
    imgUrl: result.metadata.fullPath,
    genre: genre
  
  });

  const actorsInMoviesPromises = actors.map(async (actorId) => {
    // Assign actors to newly created movie
    return await ActorsInMovies.create({ actorId, movieId: newMovie.id });
  });

  await Promise.all(actorsInMoviesPromises);

  res.status(200).json({
    status: 'success',
    data: {
      newMovie
    }
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  // const { id } = req.params;
  const { movie } = req;

  const data = filterObj(
    req.body,
    'title',
    'description',
    'duration',
    'rating',
    'img',
    'genre'
  );

  // const movie = await Movies.findOne({
  //   where: { id: id, status: 'active' }
  // });

  // if (!movie) {
  //   return next(
  //     new AppError(
  //       400,
  //       'Must provide a valid name, country, rating, age, profilePic'
  //     )
  //   );
  // }

  await movie.update({ ...data });
  res.status(204).json({
    status: 'success',
    message: 'the actor with id ${id} was update correctly'
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  // const { id } = req.params;
  const { movie } = req;
  // const movie = await Movies.findOne({
  //   where: { id: id, status: 'active' }
  // });

  // if (!movie) {
  //   return next(
  //     new AppError(400, 'Must provide a valid name, email and password')
  //   );
  // }

  // Soft delete
  await movie.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
