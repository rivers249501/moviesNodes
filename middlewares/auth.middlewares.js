const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');

// Models
const { User } = require('../models/users.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

dotenv.config({ path: './config.env' });

exports.validateSession = catchAsync(async (req, res, next) => {
  // Extract token from headers
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Bearer token123.split(' ') -> [Bearer, token123]
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError(401, 'Invalid session, token no entregado'));
  }

  // Verify that token is still valid
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // Validate that the id the token contains belongs to a valid user
  // SELECT id, email FROM users;

  const user = await User.findOne({
    where: { id: decodedToken.id, status: 'active' },
    attributes: {
      exclude: ['password']
    }
  });
  console.log(user);

  if (!user) {
    return next(new AppError(401, 'Invalid session'));
  }

  // console.log(user);
  req.currentUser = user;

  // Grant access
  next();
});

exports.protectAdmin = catchAsync(async (req, res, next) => {
  //grant access
  if (req.currentUser.role !== 'admin') {
    return next(new AppError(403, 'access denied'));
  }

  next();
});
