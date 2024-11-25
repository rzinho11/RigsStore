const sequelize = require('./database');

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}

module.exports = { connectDB };

