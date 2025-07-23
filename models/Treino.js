const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const Treino = db.define('Treino', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  objetivo: {
    type: DataTypes.STRING
  },
  divisao: {
    type: DataTypes.STRING
  }
});

// Relação: um usuário pode ter vários treinos
Treino.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Treino, { foreignKey: 'userId' });

module.exports = Treino;
