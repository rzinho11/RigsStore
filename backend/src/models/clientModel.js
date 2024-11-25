const sequelize  = require('../config/database');
const { DataTypes } = require('sequelize');

const Client = sequelize.define('Client', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoCliente: {
    type: DataTypes.ENUM('juridica', 'fisica'),
    allowNull: false
  }
}, {
  tableName: 'cliente',
  timestamps: true,
});

module.exports = Client;