const express = require('express');
// const cors = require('cors')

//controllers
const { globalErrorhandler } = require('./controllers/error.controller');
//Routes
const { actorInMovieRouter } = require('./routes/actorMovie.routes');
const { actorsRouter } = require('./routes/actors.routes');
const { moviesRouter } = require('./routes/movie.routes');
const { reviewRouter } = require('./routes/review.routes');
const { usersRouter } = require('./routes/user.routes');

//Errors
const { AppError } = require('./utils/appError');

//init server
const app = express();

//import json
app.use(express.json());

// Enable multipart/form-data incoming data (to receive files)
app.use(express.urlencoded({ extended: true }));

//enable cors
// app.use(cors());

//endpoints
app.use('/api/v1/users', usersRouter);

app.use('/api/v1/review', reviewRouter);

app.use('/api/v1/movies', moviesRouter);

app.use('/api/v1/actorinmovies', actorInMovieRouter);

app.use('/api/v1/actors', actorsRouter);

app.use('*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Error handler (err -> AppError)
app.use(globalErrorhandler);

module.exports = { app };
