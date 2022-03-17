const { Actor } = require('../models/actors.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: {status: 'active'}
  });

  //if(user.length === 0){
  //console.log(user);
  if (actors.length === 0) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      actors
    }
  });
});

exports.getActorsById = catchAsync(async (req, res, next) => {
  console.log('rew');
  const { id } = req.params;
  const actors = await Actor.findOne({
    where: { id: id, status: 'active' }
  });

  if (!actors) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      actors
    }
  });
});

exports.createActors = catchAsync(async (req, res) => {
  const { name, country, rating, age, profilePic } = req.body;
  if (!name || !country || !rating || !age || !profilePic) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
  }
  const actors = await Actor.create({
    name: name,
    country: country,
    rating: rating,
    age: age,
    profilePic: profilePic
  });

  res.status(200).json({
    status: 'success',
    data: {
      actors
    }
  });
});

exports.updateActors = catchAsync(async (req, res,next) => {

    const { id } = req.params;
      const data = filterObj(req.body, 'name', 'country', 'rating', 'age', 'profilePic'); 
  
      const actors = await Actor.findOne({
        where: { id: id, status: 'active' }
      });
  
      if (!actors) {
      return next(
        new AppError(400, 'Must provide a valid name, country, rating, age, profilePic'))
        
      }

      await actors.update({ ...data }); 
      res.status(204).json({ status: 'success',
      message: 'the actor with id ${id} was update correctly'
    });
    
  });
  // Delete post
  exports.deleteActor = catchAsync(async (req, res ) => {
    
      const { id } = req.params;
  
      const actors = await Actor.findOne({
        where: { id: id, status: 'active' }
      });
  
      if (!actors) {
      return next(
        new AppError(400, 'Must provide a valid name, email and password'))
       
      }
  
      // Soft delete
      await actors.update({ status: 'deleted' });
  
      res.status(204).json({ status: 'success' });
    
  });
  