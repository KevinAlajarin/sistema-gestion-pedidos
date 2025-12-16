const { sql } = require('../config/database');

class StockService {
    async recordMovement(data, transaction) {
        const request = new sql.Request(transaction);
        await request
            .input('ProductID', sql.Int, data.productId)
            .input('Type', sql.NVarChar, data.type)
            .input('Qty', sql.Int, data.quantity)
            .input('RefType', sql.NVarChar, data.referenceType)
            .input('RefID', sql.Int, data.referenceId)
            .query(`
                INSERT INTO StockMovements (ProductID, MovementType, Quantity, ReferenceType, ReferenceID)
                VALUES (@ProductID, @Type, @Qty, @RefType, @RefID)
            `);
    }
}

module.exports = new StockService();