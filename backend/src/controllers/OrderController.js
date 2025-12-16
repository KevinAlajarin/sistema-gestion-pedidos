const OrderService = require('../services/OrderService');
const asyncHandler = require('../middleware/asyncHandler');

exports.createOrder = asyncHandler(async (req, res) => {
  const result = await OrderService.createOrder(req.body);
  res.status(201).json({ success: true, data: result });
});

exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await OrderService.getAllOrders();
  res.json({ success: true, data: orders });
});

exports.updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, reason } = req.body;
    const result = await OrderService.updateStatus(id, status, reason);
    res.json({ success: true, data: result });
});