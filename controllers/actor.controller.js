const { ref, uploadBytes } = require('firebase/storage');
//models
const { Actor } = require('../models/actors.model');
const { Movies } = require('../models/movies.model');
const { validationResult } = require('express-validator');
//utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    include: [{ model: Movies }]
  });

  // if (actors.length === 0) {
  //   return next(new AppError(404, 'User not found'));
  // }

  //promise[]
  const actorPromises = actors.map(
    async ({
      id,
      title,
      country,
      rating,
      profilePic,
      age,
      createdAt,
      updatedAt,
      movies
    }) => {
      const imgRef = ref(storage, profilePic);
      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        title,
        country,
        rating,
        profilePic: imgDownloadUrl,
        age,
        createdAt,
        updatedAt,
        movies
      };
    }
  );

  const resolveActor = await Promise.all(actorPromises);

  res.status(201).json({
    status: 'success',
    data: {
      actors: resolveActor
    }
  });
});

exports.getActorsById = catchAsync(async (req, res, next) => {
  // console.log('rew');
  // const { id } = req.params;
  // const actors = await Actor.findOne({
  //   where: { id: id, status: 'active' }
  // });

  // if (!actors) {
  //   return next(new AppError(404, 'User not found'));
  // }
  const { actor } = req;

  res.status(200).json({
    status: 'success',
    data: {
      actor
    }
  });
});

exports.createActors = catchAsync(async (req, res, next) => {
  const { name, country, rating, age, profilePic } = req.body;

  //validation req.body
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map(({ msg }) => msg)
      .join('.');
    return next(new AppError(400, errorMsg));
  }
  // if (!name || !country || !rating || !age || !profilePic) {
  //   return next(
  //     new AppError(400, 'Must provide a valid name, country, rating, age and profilePic')
  //   );
  // }
  const fileExtension = req.file.originalname.split('.')[1];

  //firebase upload img cloud storage firebase
  const imgRef = ref(
    storage,
    `imgs/actors/${name}-${Date.now()}.${fileExtension}`
  );
  const result = await uploadBytes(imgRef, req.file.buffer);

  const newActors = await Actor.create({
    name: name,
    country: country,
    rating: rating,
    age: age,
    profilePic: result.metadata.fullPath
  });

  res.status(200).json({
    status: 'success',
    data: {
      newActors
    }
  });
});

exports.updateActors = catchAsync(async (req, res, next) => {
  // const { id } = req.params;
  const { actor } = req;
  const data = filterObj(req.body, 'name', 'country', 'rating', 'age');

  // const actors = await Actor.findOne({
  //   where: { id: id, status: 'active' }
  // });

  // if (!actors) {
  // return next(
  //   new AppError(400, 'Must provide a valid name, country, rating, age, profilePic'))

  // }

  await actor.update({ ...data });
  res.status(204).json({
    status: 'success',
    message: 'the actor with id ${id} was update correctly'
  });
});
// Delete post
exports.deleteActor = catchAsync(async (req, res, next) => {
  // const { id } = req.params;
  const { actor } = req;
  // const data = filterObj(
  //   req.body,
  //   'name',
  //   'country',
  //   'rating',
  //   'age',
  //   'profilePic'
  // );
  // const actors = await Actor.findOne({
  //   where: { id: id, status: 'active' }
  // });

  // if (!actors) {
  // return next(
  //   new AppError(400, 'Must provide a valid name, email and password'))

  // }
  // Soft delete
  await actor.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
