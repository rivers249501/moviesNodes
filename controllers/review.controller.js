const { Review } = require('../models/reviews.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
// const { User } = require('../models/users.model')

exports.getAllReview = catchAsync(async (req, res, next) => {
  const review = await Review.findAll({
    where: { status: 'active' }
  });

  //if(user.length === 0){
  //console.log(user);
  if (review.length === 0) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.getReviewById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({
    where: { id: id, status: 'active' }
  });

  if (!review) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // const {id} = req.currentUser
  const { title, comment, rating, movieId } = req.body;

  console.log(req.currentUser.id);

  if (!title || !comment || !rating || !movieId) {
    return next(
      new AppError(
        400,
        'Must provide a valid title, comment, rating, and movieId'
      )
    );
  }
  const review = await Review.create({
    title: title,
    comment: comment,
    rating: rating,
    userId: req.currentUser.id,
    movieId: movieId
  });

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = filterObj(
    req.body,
    'title',
    'comment',
    'rating',
    'userId',
    'movieId'
  );

  const review = await Review.findOne({
    where: { id: id, status: 'active' }
  });

  if (!review) {
    return next(
      new AppError(
        400,
        'Must provide a valid name, country, rating, age, profilePic'
      )
    );
  }

  await review.update({ ...data });
  res
    .status(204)
    .json({
      status: 'success',
      message: 'the actor with id ${id} was update correctly'
    });
});
// Delete post
exports.deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: { id: id, status: 'active' }
  });

  if (!review) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
  }

  // Soft delete
  await review.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
