const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Finalizacao = sequelize.define('Finalizacao', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  nomeCompleto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cartao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataValidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Finalizado', 'Cancelado'),
    defaultValue: 'Pendente',
    allowNull: false,
  },
}, {
  tableName: 'finalizacoes',
  timestamps: true,
});

module.exports = Finalizacao;
