const BaseRepository = require('./BaseRepository');
const { sql, poolPromise } = require('../config/database');

class ProductRepository extends BaseRepository {
  constructor() {
    super('Products');
  }

  async updateStock(productId, quantityToDeduct, transaction) {
    const request = new sql.Request(transaction);
    await request
      .input('ProductID', sql.Int, productId)
      .input('Qty', sql.Int, quantityToDeduct)
      .query(`
        UPDATE Products 
        SET Stock = Stock - @Qty 
        WHERE ProductID = @ProductID
      `);
  }
  
  async incrementStock(productId, quantityToAdd, transaction) {
    const request = new sql.Request(transaction);
    await request
      .input('ProductID', sql.Int, productId)
      .input('Qty', sql.Int, quantityToAdd)
      .query(`UPDATE Products SET Stock = Stock + @Qty WHERE ProductID = @ProductID`);
  }

  async getStock(productId, transaction) {
     const request = new sql.Request(transaction);
     const res = await request
        .input('ID', sql.Int, productId)
        .query('SELECT Stock, Price FROM Products WHERE ProductID = @ID');
     return res.recordset[0];
  }
}

module.exports = new ProductRepository();