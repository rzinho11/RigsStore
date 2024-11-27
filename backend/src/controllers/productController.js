const Product = require('../models/productModel');

const productController = {
  async getAllProducts(req, res) {
    try {
      console.log("Request recebido:", req); // Log do request
  
      const products = await Product.findAll();
      console.log("Produtos obtidos com sucesso:", products); // Log do sucesso
      return res.json(products);
    } catch (error) {
      console.error('Erro ao obter produtos:', error); // Log do erro
      return res.status(500).json({ message: 'Erro ao obter produtos', error: error.message });
    }
  },

  async createProduct(req, res) {
    const { name, description, price, stock, categoria } = req.body;
    
    try {
      console.log("Dados recebidos para criar produto:", req.body);

      if (!name || !description || !price || !stock || !categoria) {
        console.error('Dados incompletos para criar produto.');
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }

      const products = await Product.create({ name, description, price, stock, categoria });

      console.log("Produto criado com sucesso:", products);

      res.status(201).json(products);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
    }
  },

  async updateProduct(req, res) {
    let { id } = req.params;
    const { name, description, price, stock, categoria } = req.body;
  
    // Adicionando log para ver o valor do id
    console.log(`ID recebido para atualização: ${id}, tipo: ${typeof id}`);
  
    // Converte o id para inteiro de forma mais robusta
    id = Number(id); // Usando Number() em vez de parseInt
    console.log(`ID convertido: ${id}, tipo: ${typeof id}`); // Log para ver a conversão
  
    if (!Number.isInteger(id) || id <= 0) { // Verifica se o id é um número inteiro positivo
      return res.status(400).json({ message: 'ID inválido' });
    }
  
    try {
      console.log(`Atualizando produto com ID ${id}:`, req.body); // Log do ID e dados recebidos
      const products = await Product.findByPk(id);
      if (!products) {
        console.error(`Produto com ID ${id} não encontrado.`);
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
  
      await products.update({ name, description, price, stock, categoria });
      console.log(`Produto com ID ${id} atualizado com sucesso.`);
      return res.json(products);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error); // Log do erro
      return res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
  },
  
  async deleteProduct(req, res) {
    let { id } = req.params;
  
    // Adicionando log para ver o valor do id
    console.log(`ID recebido para deletar: ${id}, tipo: ${typeof id}`);
  
    // Converte o id para inteiro de forma mais robusta
    id = Number(id); // Usando Number() em vez de parseInt
    console.log(`ID convertido: ${id}, tipo: ${typeof id}`); // Log para ver a conversão
  
    if (!Number.isInteger(id) || id <= 0) { // Verifica se o id é um número inteiro positivo
      return res.status(400).json({ message: 'ID inválido' });
    }
  
    try {
      console.log(`Tentando deletar produto com ID ${id}`); // Log do ID recebido
      const products = await Product.findByPk(id);
      if (!products) {
        console.error(`Produto com ID ${id} não encontrado.`);
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      await products.destroy();
      console.log(`Produto com ID ${id} deletado com sucesso.`);
      return res.status(204).json();
    } catch (error) {
      console.error('Erro ao deletar produto:', error); // Log do erro
      return res.status(500).json({ message: 'Erro ao deletar produto', error: error.message });
    }
  }  
};

module.exports = productController;
