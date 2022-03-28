const { ActorsInMovies } = require('../models/actorsInMovies.model');
//utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.getAllActorInMovie = catchAsync(async (req, res, next) => {
  const actorMovie = await ActorsInMovies.findAll({
    // where: {status: 'active'}
  });

  //if(user.length === 0){
  //console.log(user);
  if (actorMovie.length === 0) {
    res.status(400).json({
      status: 'error',
      message: 'there are not user until'
    });
    return;
  }

  res.status(201).json({
    status: 'success',
    data: {
      actorMovie
    }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actorMovie = await ActorsInMovies.findOne({
    where: { id: id, status: 'active' }
  });

  if (!actorMovie) {
    res.status(404).json({
      status: 'error',
      message: 'the id ${ id } selected was no found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      actorMovie
    }
  });
});

exports.createActor = catchAsync(async (req, res, next) => {
  const { actorId, movieId } = req.body;

  if (!actorId || !movieId) {
    return next(new AppError(400, 'Must provide a valid actorId, and movieId'));
  }
  const actorMovie = await ActorsInMovies.create({
    actorId: actorId,
    movieId: movieId
  });

  res.status(200).json({
    status: 'success',
    data: {
      actorMovie
    }
  });
});
