const { body, validationResult } = require('express-validator');

const validateOrder = [
    body('customerId').isInt().withMessage('Customer ID must be an integer'),
    body('items').isArray({ min: 1 }).withMessage('Items must be an array with at least 1 item'),
    body('items.*.productId').isInt(),
    body('items.*.quantity').isInt({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateOrder };