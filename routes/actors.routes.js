const express = require('express');
const { body } = require('express-validator');

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
  .post(
    protectAdmin,
    upload.single('pictureProfile'),
    // [
    //   body('name').isString().notEmpty(),
    //   body('country')
    //     .isString()
    //     .notEmpty()
    //     .withMessage('must provide valid country name'),
    //   body('rating')
    //     .isNumeric()
    //     .custom((value) => value > 0 && value <= 5),
    //   body('age')
    //     .isNumeric()
    //     .custom((value) => value > 0)
    // ],
    createActors
  );

router
  .use('/:id', protectAdmin, actorExists)
  .route('/:id')
  .get(getActorsById)
  .patch(updateActors)
  .delete(deleteActor);

module.exports = { actorsRouter: router };
