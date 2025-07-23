const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER
  },
  genero: {
    type: DataTypes.STRING
  },
  altura: {
    type: DataTypes.FLOAT
  },
  peso: {
    type: DataTypes.FLOAT
  },
  objetivo: {
    type: DataTypes.STRING
  },
  nivel: {
    type: DataTypes.STRING
  }
});

module.exports = User;
