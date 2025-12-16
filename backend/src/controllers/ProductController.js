const ProductService = require('../services/ProductService');
const asyncHandler = require('../middleware/asyncHandler');

exports.getProducts = asyncHandler(async (req, res) => {
    const products = await ProductService.getAllProducts();
    res.json({ success: true, data: products });
});

exports.getProductById = asyncHandler(async (req, res) => {
    const product = await ProductService.getProductById(req.params.id);
    res.json({ success: true, data: product });
});