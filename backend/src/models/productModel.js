const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM('eletronicos', 'roupas', 'alimentos'),
    allowNull: false,
    },
}, {
    tableName: 'products',
});

module.exports = Product;