module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  
    return Order;
  };  