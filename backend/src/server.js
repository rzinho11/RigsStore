require('dotenv').config();

const express = require('express');
const { sequelize } = require('./config/database');

const app = express();

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Banco de dados conectado!');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const Client = require('./models/clientModel');

sequelize.sync()
  .then(() => {
    console.log('Tabelas criadas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao criar tabelas:', error);
  });
