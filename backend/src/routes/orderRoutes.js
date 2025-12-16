const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { validateOrder } = require('../middleware/validation');

router.post('/', validateOrder, OrderController.createOrder);
router.get('/', OrderController.getOrders);
router.patch('/:id/status', OrderController.updateStatus);

module.exports = router;