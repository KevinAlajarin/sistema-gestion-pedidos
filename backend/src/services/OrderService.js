const { sql, poolPromise } = require('../config/database');
const OrderRepository = require('../repositories/OrderRepository');
const ProductRepository = require('../repositories/ProductRepository');
const StockService = require('./StockService'); // Encapsula lógica de movimientos
const { ORDER_STATUS } = require('../config/constants');

class OrderService {

  async createOrder(data) {
    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin(); 

      // 1. Calcular total y validar stock PREVIO a insercion
      let totalAmount = 0;
      const enrichedItems = [];

      for (const item of data.items) {
        const product = await ProductRepository.getStock(item.productId, transaction);
        if (!product) throw new Error(`Product ${item.productId} not found`);
        if (product.Stock < item.quantity) {
          throw new Error(`Insufficient stock for Product ${item.productId}. Available: ${product.Stock}`);
        }
        
        const lineTotal = product.Price * item.quantity;
        totalAmount += lineTotal;
        enrichedItems.push({ ...item, unitPrice: product.Price });
      }

      // 2. Crear Orden Header
      const orderId = await OrderRepository.create({
        customerId: data.customerId,
        status: ORDER_STATUS.PENDING,
        totalAmount: totalAmount
      }, transaction);

      // 3. Procesar Items y Stock
      for (const item of enrichedItems) {
        // Insertar Item
        await OrderRepository.addOrderItem({
          orderId,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        }, transaction);

        // Descontar Stock
        await ProductRepository.updateStock(item.productId, item.quantity, transaction);

        // Registrar Movimiento Stock
        await StockService.recordMovement({
            productId: item.productId,
            type: 'OUT',
            quantity: item.quantity,
            referenceType: 'ORDER',
            referenceId: orderId
        }, transaction);
      }

      await transaction.commit(); // CONFIRMAR TRANSACCION
      return { orderId, totalAmount, status: ORDER_STATUS.PENDING };

    } catch (error) {
      await transaction.rollback(); // REVERTIR SI FALLA
      throw error;
    }
  }

  async updateStatus(orderId, newStatus, reason) {
      // Logica de validación de transición de estados
      const currentOrderRows = await OrderRepository.getOrderWithDetails(orderId);
      if(currentOrderRows.length === 0) throw new Error("Order not found");
      
      const currentStatus = currentOrderRows[0].Status;

      if(currentStatus === ORDER_STATUS.CANCELLED) throw new Error("Cannot update a cancelled order");

      if (newStatus === ORDER_STATUS.CANCELLED) {
          return this.cancelOrder(orderId, currentOrderRows, reason);
      }

      await OrderRepository.updateStatus(orderId, newStatus);
      return { orderId, status: newStatus };
  }

  async cancelOrder(orderId, orderDetails, reason) {
      const pool = await poolPromise;
      const transaction = new sql.Transaction(pool);
      
      try {
          await transaction.begin();
          
          await OrderRepository.updateStatus(orderId, ORDER_STATUS.CANCELLED, reason, transaction);

          // Devolver stock
          const uniqueItems = orderDetails.map(row => ({ pid: row.ProductID, qty: row.Quantity }));
          
          for(const item of uniqueItems) {
              await ProductRepository.incrementStock(item.pid, item.qty, transaction);
              
              await StockService.recordMovement({
                productId: item.pid,
                type: 'IN',
                quantity: item.qty,
                referenceType: 'ORDER_CANCEL',
                referenceId: orderId
            }, transaction);
          }

          await transaction.commit();
          return { message: "Order Cancelled and Stock Restored" };

      } catch (err) {
          await transaction.rollback();
          throw err;
      }
  }

  async getAllOrders() {
      return await OrderRepository.getAll();
  }
}

module.exports = new OrderService();