const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const clientRoutes = require('./routes/clientRoutes');
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const finalizacaoRoutes = require('./routes/finalizacaoRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', cartRoutes);
app.use('/api', clientRoutes);
app.use('/api', contactRoutes);
app.use('/api', orderRoutes);
app.use('/api', productRoutes);
app.use('/api', finalizacaoRoutes);