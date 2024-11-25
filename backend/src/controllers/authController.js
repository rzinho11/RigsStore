const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

// Função para login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findUserByUsername(username);

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    // Verifica a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    // Gerar um token JWT
    const token = jwt.sign(
      { user_id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor!' });
  }
};

// Função para registro de usuário
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userId = await userModel.createUser(username, password, role);
    res.status(201).json({ message: 'Usuário criado com sucesso!', user_id: userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário!' });
  }
};

module.exports = { loginUser, registerUser };