const { User } = require('../models/users.model');
const { Actor } = require('../models/actors.model');
const { Movies } = require('../models/movies.model');
const { Review } = require('../models/reviews.model');
const { ActorsInMovies } = require('../models/actorsInMovies.model');

const initModels = () => {
  // 1 User <----> M Reviews
  User.hasMany(Review);
  Review.belongsTo(User);
  // movie -- M Review
  Movies.hasMany(Review);
  Review.belongsTo(Movies);

  // M Movie -- Actor
  Movies.belongsToMany(Actor, { through: ActorsInMovies });
  Actor.belongsToMany(Movies, { through: ActorsInMovies });
};

module.exports = { initModels };
