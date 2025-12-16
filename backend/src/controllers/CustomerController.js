const CustomerService = require('../services/CustomerService');
const asyncHandler = require('../middleware/asyncHandler');

exports.getCustomers = asyncHandler(async (req, res) => {
    const customers = await CustomerService.getAllCustomers();
    res.json({ success: true, data: customers });
});

exports.getCustomerById = asyncHandler(async (req, res) => {
    const customer = await CustomerService.getCustomerById(req.params.id);
    res.json({ success: true, data: customer });
});

exports.createCustomer = asyncHandler(async (req, res) => {
    const result = await CustomerService.createCustomer(req.body);
    res.status(201).json({ success: true, data: result });
});