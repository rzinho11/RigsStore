const express = require('express');
const { finalizarVenda } = require('../controllers/finalizacaoController');

const router = express.Router();

router.post('/finalizar', finalizarVenda);

module.exports = router;