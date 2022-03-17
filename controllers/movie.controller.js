// const { Review } = require('../models/reviews.model')
// const { User } = require('../models/users.model')

const { Movies } = require('../models/movies.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');

exports.getAllmovie = catchAsync(async (req, res, next) => {
  const movie = await Movies.findAll({
    where: { status: 'active' }
  });

  //if(user.length === 0){
  //console.log(user);
  if (movie.length === 0) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movies.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.createMovie = catchAsync(async (req, res) => {
  const { title, description, duration, rating, img, genre, userId, movieId } = req.body;

  if (!title || !description || !duration || !rating || !img || genre || userId || movieId) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
  }
  const movie = await Movies.create({
    title: title,
    description: description,
    duration: duration,
    rating: rating,
    img: img,
    genre: genre,
    userId: userId,
    movieId: movieId
  });

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.updateMovie = catchAsync(async (req, res,next) => {

    const { id } = req.params;
      const data = filterObj(req.body, 'title', 'description', 'duration', 'rating', 'img', 'genre' ); 
  
      const movie = await Movies.findOne({
        where: { id: id, status: 'active' }
      });
  
      if (!movie) {
      return next(
        new AppError(400, 'Must provide a valid name, country, rating, age, profilePic'))
        
      }

      await movie.update({ ...data }); 
      res.status(204).json({ status: 'success',
      message: 'the actor with id ${id} was update correctly'
    });
    
  });

  exports.deleteMovie = catchAsync(async (req, res ) => {
    
      const { id } = req.params;
  
      const movie = await Movies.findOne({
        where: { id: id, status: 'active' }
      });
  
      if (!movie) {
      return next(
        new AppError(400, 'Must provide a valid name, email and password'))
       
      }
  
      // Soft delete
      await movie.update({ status: 'deleted' });
  
      res.status(204).json({ status: 'success' });
    
  });