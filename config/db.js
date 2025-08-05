/*const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tinho1243@', // Coloque sua senha
  database: 'academiaTCC'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
  module.exports = connection;
});*/

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('academiaTCC', 'root', 'Tinho1243@', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;


