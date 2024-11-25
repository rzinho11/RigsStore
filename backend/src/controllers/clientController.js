const Client = require('../models/clientModel');

const clientController = {
  async createClient(req, res) {
    const { name, email, endereco, bairro, tipoCliente } = req.body;

    if (!name || !email || !endereco || !bairro || !tipoCliente) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
      const existingClient = await Client.findOne({ where: { email } });
      if (existingClient) {
        return res.status(400).json({ message: 'Cliente já cadastrado com esse email.' });
      }

      const newClient = await Client.create({
        name,
        email,
        endereco,
        bairro,
        tipoCliente
      });

      return res.status(201).json({
        message: 'Cliente cadastrado com sucesso',
        client: newClient
      });
    } catch (error) {

      console.error('Erro ao cadastrar o cliente:', error);
      return res.status(500).json({ 
        message: 'Erro ao cadastrar o cliente', 
        error: error.message 
      });
    }
  }
};

module.exports = clientController;