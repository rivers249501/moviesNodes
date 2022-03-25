const express = require('express');

//controllers
const {
  getAllActors,
  createActors,
  getActorsById,
  updateActors,
  deleteActor
} = require('../controllers/actor.controller');

//middleware
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middlewares');
const { actorExists } = require('../middlewares/actors.middleware');

//utils
const { upload } = require('../utils/multer');

//route
const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllActors)
  .post(protectAdmin, upload.single('imgUrl'), createActors);

router
  .use('/:id', actorExists)
  .route('/:id')
  .get(getActorsById)
  .patch(protectAdmin, updateActors)
  .delete(protectAdmin, deleteActor);

module.exports = { actorsRouter: router };
