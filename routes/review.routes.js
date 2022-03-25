const express = require('express');

const {
  getAllReview,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/review.controller');

// middlewares
const { validateSession } = require('../middlewares/auth.middlewares');

const router = express.Router();

router.route('/').get(getAllReview).post(validateSession, createReview);

router
  .route('/:id')
  .get(getReviewById)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = { reviewRouter: router };
