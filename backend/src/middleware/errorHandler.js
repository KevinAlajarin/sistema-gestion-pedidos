const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err.message, { stack: err.stack, url: req.originalUrl });

    // Error de validacion personalizado 
    if (err.message === 'Validation Error') {
        return res.status(400).json({
            success: false,
            message: err.message,
            errors: err.errors
        });
    }

    // Errores de SQL Server
    if (err.code === 'EREQUEST') {
        return res.status(500).json({
            success: false,
            message: 'Database Error',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }

    // Default
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;