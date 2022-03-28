const express = require('express');

const {
  getAllActorInMovie,
  getActorById,
  createActor
} = require('../controllers/actormovies.controller');

const router = express.Router();

router
.route('/')
.get(getAllActorInMovie)
.post(createActor);

router.get('/:id', getActorById);

module.exports = { actorInMovieRouter: router };
