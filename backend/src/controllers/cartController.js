const { Cart, Product } = require('../models/cartModel');

const cartController = {
  async getCart(req, res) {
    const userId = req.user.id;  // Acessando o id do usuário logado
    try {
      const cartItems = await Cart.findAll({
        where: { userId },
        include: { model: Product },
      });
      return res.json(cartItems);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar itens do carrinho', error });
    }
  },

  async addItemToCart(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user.id;  // Acessando o id do usuário logado
    try {
      const existingItem = await Cart.findOne({
        where: { userId, productId },
      });

      if (existingItem) {
        // Atualiza a quantidade se o item já existir
        await existingItem.update({ quantity: existingItem.quantity + quantity });
      } else {
        // Caso o item não exista, cria um novo item no carrinho
        await Cart.create({ userId, productId, quantity });
      }

      return res.status(201).json({ message: 'Item adicionado ao carrinho' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao adicionar item ao carrinho', error });
    }
  },

  async updateItemQuantity(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    try {
      const cartItem = await Cart.findOne({ where: { userId, productId } });
      if (!cartItem) {
        return res.status(404).json({ message: 'Item não encontrado no carrinho' });
      }

      await cartItem.update({ quantity });
      return res.json({ message: 'Quantidade atualizada' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar quantidade', error });
    }
  },

  async removeItemFromCart(req, res) {
    const { productId } = req.params;
    const userId = req.user.id;
    try {
      const cartItem = await Cart.findOne({ where: { userId, productId } });
      if (!cartItem) {
        return res.status(404).json({ message: 'Item não encontrado no carrinho' });
      }

      await cartItem.destroy();
      return res.json({ message: 'Item removido do carrinho' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao remover item', error });
    }
  },
};

module.exports = cartController;