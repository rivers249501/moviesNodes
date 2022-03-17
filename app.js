const express = require('express');

//Routes
const { actorInMovieRouter } = require('./routes/actorMovie.routes');
const { actorsRouter } = require('./routes/actors.routes');
const { moviesRouter } = require('./routes/movie.routes');
const { reviewRouter } = require('./routes/review.routes');
const { usersRouter } = require('./routes/user.routes');

//Errors
const { AppError } = require('./utils/appError');
const { globalErrorhandler } = require('./controllers/error.controller');

//init server
const app = express();

//import json
app.use(express.json());

//endpoints
app.use('/api/v1/users', usersRouter);

app.use('/api/v1/review', reviewRouter);

app.use('/api/v1/movies', moviesRouter);

app.use('/api/v1/actorinmovies', actorInMovieRouter);

app.use('/api/v1/actor', actorsRouter);

app.use('*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Error handler (err -> AppError)
app.use(globalErrorhandler);

module.exports = { app };
