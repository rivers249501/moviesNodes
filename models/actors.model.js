const { DataTypes } = require('sequelize');

//import DB
const { sequelize } = require('../utils/database');

const Actor = sequelize.define('actor', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    require: true
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: false,
    require: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max:5,
      min:1
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Actor }