const { User } = require('../models/users.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    where: { status: 'active' }
  });

  //if(user.length === 0){
  //console.log(user);
  if (user.length === 0) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
});
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id: id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username ||
     !email || 
     !password || 
     !role ){
    //  username.indexOf(" ") > -1 || 
    // email.length < 10 || 
    // password.length < 6 || 
    // role.length < 4) {
    return next(
      new AppError(400, 'Must provide a valid username, email, password and role')
    );
  }
  const user = await User.create({
    username: username,
    email: email,
    password: password,
    role: role
  });

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateUser = catchAsync(async (req, res,next) => {

    const { id } = req.params;
      const data = filterObj(req.body, 'username', 'email', 'password', 'role'); 
  
      const user = await User.findOne({
        where: { id: id, status: 'active' }
      });
  
      if (!user) {
      return next(
        new AppError(400, 'Must provide a valid username, email, password, role'))
        
      }

      await user.update({ ...data }); 
      res.status(204).json({ status: 'success',
      message: 'the actor with id ${id} was update correctly'
    });
    
  });
  exports.deleteUser = catchAsync(async (req, res ) => {
    
      const { id } = req.params;
  
      const user = await User.findOne({
        where: { id: id, status: 'active' }
      });
  
      if (!user) {
      return next(
        new AppError(400, 'Must provide a valid name, email and password'))
       
      }
  
      // Soft delete
      await user.update({ status: 'deleted' });
  
      res.status(204).json({ status: 'success' });
    
  });
  