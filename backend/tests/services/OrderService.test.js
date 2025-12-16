const OrderService = require('../../src/services/OrderService');
const OrderRepository = require('../../src/repositories/OrderRepository');
const ProductRepository = require('../../src/repositories/ProductRepository');
const StockService = require('../../src/services/StockService');
const { poolPromise, sql } = require('../../src/config/database');

// Mocks
jest.mock('../../src/repositories/OrderRepository');
jest.mock('../../src/repositories/ProductRepository');
jest.mock('../../src/services/StockService');
jest.mock('../../src/config/database', () => ({
  sql: {
    Transaction: jest.fn().mockImplementation(() => ({
      begin: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
    })),
    Request: jest.fn(),
    Int: 'Int',
    NVarChar: 'NVarChar',
    Decimal: 'Decimal'
  },
  poolPromise: Promise.resolve({})
}));

describe('OrderService - createOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an order successfully when stock is sufficient', async () => {
    // 1. Preparar datos
    const orderData = {
      customerId: 1,
      items: [{ productId: 1, quantity: 2 }]
    };

    ProductRepository.getStock.mockResolvedValue({ 
      Stock: 10, 
      Price: 100 
    });
    
    OrderRepository.create.mockResolvedValue(123); 

    // 2. Ejecutar
    const result = await OrderService.createOrder(orderData);

    // 3. Verificar
    expect(result.orderId).toBe(123);
    expect(result.totalAmount).toBe(200); 
    expect(ProductRepository.updateStock).toHaveBeenCalledWith(1, 2, expect.anything());
    expect(StockService.recordMovement).toHaveBeenCalledTimes(1);
  });

  it('should throw error and rollback when stock is insufficient', async () => {
    // 1. Arrange
    const orderData = {
      customerId: 1,
      items: [{ productId: 1, quantity: 20 }] 
    };

    ProductRepository.getStock.mockResolvedValue({ 
      Stock: 5, 
      Price: 100 
    });

    // 2. Act & Assert
    await expect(OrderService.createOrder(orderData))
      .rejects
      .toThrow('Insufficient stock for Product 1');

    // Verificar que NO se creo la orden ni se desconto stock
    expect(OrderRepository.create).not.toHaveBeenCalled();
    expect(ProductRepository.updateStock).not.toHaveBeenCalled();
  });
});