const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_nasc: {
    type: DataTypes.DATEONLY
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
    senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING
  },
  contato: {
    type: DataTypes.STRING
  },
  tipo: {
    type: DataTypes.ENUM('aluno', 'professor'),
    defaultValue: 'aluno'
  },
  altura: {
    type: DataTypes.FLOAT
  },
  peso: {
    type: DataTypes.FLOAT
  },
  medicacao: {
    type: DataTypes.TEXT
  },
  objetivo: {
    type: DataTypes.STRING
  },
  exame: {
    type: DataTypes.STRING // nome do arquivo
  },
  comorbidade: {
    type: DataTypes.TEXT
  },
  motivo: {
    type: DataTypes.TEXT
  },
}, {
  timestamps: true,
  tableName: 'usuario' // nome exato da tabela no banco
});

module.exports = User;
