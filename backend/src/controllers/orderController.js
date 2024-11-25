const { Cart, Product, Order } = require('../models/orderModel');

const orderController = {
  async createOrder(req, res) {
    const userId = req.user.id;
    try {
      // Obter todos os itens do carrinho do usuário
      const cartItems = await Cart.findAll({
        where: { userId },
        include: { model: Product },
      });

      if (cartItems.length === 0) {
        return res.status(400).json({ message: 'Carrinho vazio' });
      }

      let totalAmount = 0;
      // Calcular o valor total do pedido
      for (let item of cartItems) {
        totalAmount += item.quantity * item.Product.price;
      }

      // Criar o pedido
      const order = await Order.create({ userId, totalAmount, status: 'pending' });

      // Limpar o carrinho após o pedido ser criado
      await Cart.destroy({ where: { userId } });

      return res.status(201).json({ message: 'Pedido criado com sucesso', order });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar pedido', error });
    }
  },

  async getOrderHistory(req, res) {
    const userId = req.user.id;
    try {
      const orders = await Order.findAll({ where: { userId } });
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter histórico de pedidos', error });
    }
  },
};

module.exports = orderController;
