// Models
const { Actor } = require('../models/actors.model');
const { Movies } = require('../models/movies.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.actorExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    attributes: { exclude: ['password'] },
    where: { id, status: 'active' },
    include: [{ model: Movies }]
  });

  if (!actor) {
    return next(new AppError(404, 'No actor found with that ID'));
  }

  req.actor = actor;
  next();
});
