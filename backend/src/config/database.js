const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rigs_store', 'postgres', 'S@ntos2011', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
