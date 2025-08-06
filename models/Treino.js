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
  },
  userId: {                    // <-- ADICIONE ISSO!
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

// Relação
Treino.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Treino, { foreignKey: 'userId' });

module.exports = Treino;

