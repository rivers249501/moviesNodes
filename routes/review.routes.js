const express = require('express')

const { getAllReview, getReviewById, createReview, updateReview, deleteReview,   } = require('../controllers/review.controller')

const router = express.Router() 

router.get('/', getAllReview)

router.post('/', createReview)

router.get('/:id', getReviewById)

router.patch('/:id', updateReview)

router.delete('/:id', deleteReview)


module.exports = {reviewRouter: router}