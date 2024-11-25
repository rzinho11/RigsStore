const Finalizacao = require('../models/finalizacaoModel');

const finalizarVenda = async (req, res) => {
  try {
    const { userId, totalAmount, nomeCompleto, email, cartao, dataValidade, cvv } = req.body;

    const finalizacao = await Finalizacao.create({
      userId,
      totalAmount,
      nomeCompleto,
      email,
      cartao,
      dataValidade,
      cvv,
      status: 'Finalizado',
    });

    res.status(201).json({
      message: 'Venda finalizada com sucesso!',
      finalizacao,
    });
  } catch (error) {
    console.error('Erro ao finalizar a venda:', error);
    res.status(500).json({
      message: 'Erro ao finalizar a venda. Tente novamente.',
      error: error.message,
    });
  }
};

module.exports = { finalizarVenda };