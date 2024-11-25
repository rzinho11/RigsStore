const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addItemToCart);
router.put('/cart', cartController.updateItemQuantity);
router.delete('/cart/:productId', cartController.removeItemFromCart);

module.exports = router;