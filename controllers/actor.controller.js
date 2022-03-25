const { Actor } = require('../models/actors.model');
const { Movies } = require('../models/movies.model');

const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');
const { ref, uploadBytes } = require('firebase/storage');
const { storage } = require('../utils/firebase');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    include: [{ model: Movies }]
  });

  if (actors.length === 0) {
    return next(new AppError(404, 'User not found'));
  }

  //promise[]
  const actorPromises = allActor.map(
    async ({
      id,
      name,
      country,
      duration,
      rating,
      age,
      profilePic,
      createdAt,
      updatedAt
    }) => {
      const imgRef = ref(storage, imgUrl);
      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        name,
        country,
        duration,
        rating,
        age,
        profilePic: imgDownloadUrl,
        createdAt,
        updatedAt
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
  // if (!name || !country || !rating || !age || !profilePic) {
  //   return next(
  //     new AppError(400, 'Must provide a valid name, country, rating, age and profilePic')
  //   );
  // }
  const fileExtension = req.file.originalname.split('.')[1];

  //firebase upload img cloud storage firebase
  const imgRef = ref(
    storage,
    `imgs/movies/${name}-${Date.now()}.${fileExtension}`
  );
  const result = await uploadBytes(imgRef, req.file.buffer);

  const actors = await Actor.create({
    name: name,
    country: country,
    rating: rating,
    age: age,
    profilePic: result.metadata.fullPath
  });

  res.status(200).json({
    status: 'success',
    data: {
      actors
    }
  });
});

exports.updateActors = catchAsync(async (req, res, next) => {
  // const { id } = req.params;
  const { actor } = req;
  const data = filterObj(
    req.body,
    'name',
    'country',
    'rating',
    'age',
    'profilePic'
  );

  // const actors = await Actor.findOne({
  //   where: { id: id, status: 'active' }
  // });

  // if (!actors) {
  // return next(
  //   new AppError(400, 'Must provide a valid name, country, rating, age, profilePic'))

  // }

  await actor.update({ ...data });
  res
    .status(204)
    .json({
      status: 'success',
      message: 'the actor with id ${id} was update correctly'
    });
});
// Delete post
exports.deleteActor = catchAsync(async (req, res, next) => {
  // const { id } = req.params;
  const { actor } = req;
  const data = filterObj(
    req.body,
    'name',
    'country',
    'rating',
    'age',
    'profilePic'
  );
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
