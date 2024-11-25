const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'contact',
  timestamps: false,
});

module.exports = Contact;