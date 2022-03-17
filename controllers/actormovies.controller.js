const { ActorsInMovies } = require('../models/actorsInMovies.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.getAllActorInMovie = catchAsync(async (req, res, next) => {
  const actorMovie = await ActorsInMovies.findAll({
    // where: {status: 'active'}
  });

  //if(user.length === 0){
  //console.log(user);
  if (actorMovie.length === 0) {
    return next(new AppError(404, 'User not found'));
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
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      actorMovie
    }
  });
});

exports.createActor = catchAsync(async (req, res) => {
  const { actorId, movieId } = req.body;

  if (!actorId || !movieId ) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
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
