const express = require('express')

const { getAllReview, getReviewById, createReview,   } = require('../controllers/review.controller')

const router = express.Router() 

router.get('/', getAllReview)

router.post('/', createReview)

router.get('/:id', getReviewById)



module.exports = {reviewRouter: router}