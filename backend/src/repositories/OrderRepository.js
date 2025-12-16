const BaseRepository = require('./BaseRepository');
const { sql } = require('../config/database');

class OrderRepository extends BaseRepository {
  constructor() {
    super('Orders');
  }

  async create(orderData, transaction) {
    const request = new sql.Request(transaction); 
    
    const result = await request
      .input('CustomerID', sql.Int, orderData.customerId)
      .input('Status', sql.NVarChar, orderData.status)
      .input('TotalAmount', sql.Decimal(12, 2), orderData.totalAmount)
      .query(`
        INSERT INTO Orders (CustomerID, Status, TotalAmount)
        OUTPUT INSERTED.OrderID
        VALUES (@CustomerID, @Status, @TotalAmount);
      `);
    
    return result.recordset[0].OrderID;
  }

  async addOrderItem(itemData, transaction) {
    const request = new sql.Request(transaction);
    await request
      .input('OrderID', sql.Int, itemData.orderId)
      .input('ProductID', sql.Int, itemData.productId)
      .input('Quantity', sql.Int, itemData.quantity)
      .input('UnitPrice', sql.Decimal(10, 2), itemData.unitPrice)
      .query(`
        INSERT INTO OrderItems (OrderID, ProductID, Quantity, UnitPrice)
        VALUES (@OrderID, @ProductID, @Quantity, @UnitPrice);
      `);
  }

  async updateStatus(orderId, status, reason = null, transaction = null) {
    // Si no hay transaccion externa, se usa pool directo (caso simple)
    const request = transaction ? new sql.Request(transaction) : new sql.Request(await require('../config/database').poolPromise);
    
    await request
      .input('OrderID', sql.Int, orderId)
      .input('Status', sql.NVarChar, status)
      .input('Reason', sql.NVarChar, reason)
      .query(`
        UPDATE Orders 
        SET Status = @Status, CancellationReason = @Reason, UpdatedAt = GETDATE()
        WHERE OrderID = @OrderID
      `);
  }
  
  async getOrderWithDetails(orderId) {
    const pool = await require('../config/database').poolPromise;
    const result = await pool.request()
        .input('OrderID', sql.Int, orderId)
        .query(`
            SELECT o.*, c.FullName, c.Email, i.ProductID, p.Name as ProductName, i.Quantity, i.UnitPrice, i.LineTotal
            FROM Orders o
            JOIN Customers c ON o.CustomerID = c.CustomerID
            JOIN OrderItems i ON o.OrderID = i.OrderID
            JOIN Products p ON i.ProductID = p.ProductID
            WHERE o.OrderID = @OrderID
        `);
    
    return result.recordset; 
  }
}

module.exports = new OrderRepository();