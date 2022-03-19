//import Datatypes
const { DataTypes } = require('sequelize');

//import DB
const { sequelize } = require('../utils/database');

const Movies = sequelize.define('movies', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Movies };
