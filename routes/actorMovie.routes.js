const express = require('express');
const {
  getAllActorInMovie,
  createActor
} = require('../controllers/actormovies.controller');

const router = express.Router();
router.route('/').get(getAllActorInMovie).post(createActor);

router.get('/:id', getAllActorInMovie);

module.exports = { actorInMovieRouter: router };
