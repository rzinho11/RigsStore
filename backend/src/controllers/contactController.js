const Contact = require('../models/contactModel');

const contactController = {

  async submitContactForm(req, res) {
    const { name, email, mensagem } = req.body;

    try {
      
      if (!name || !email || !mensagem) {
        console.error('Dados incompletos para criar mensagem.');
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
      }

      const contact = await Contact.create({ name, email, mensagem });

      console.log("Mensagem enviada com sucesso:", contact);

      res.status(201).json(contact);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      res.status(500).json({ message: 'Erro ao enviar mensagem', error: error.message });
    }
  }
};

module.exports = contactController;