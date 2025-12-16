const ProductRepository = require('../repositories/ProductRepository');

class ProductService {
    async getAllProducts() {
        return await ProductRepository.getAll();
    }

    async getProductById(id) {
        const product = await ProductRepository.getById(id, 'ProductID');
        if (!product) throw new Error('Product not found');
        return product;
    }

    // Método para reabastecimiento manual (NO venta)
    async restockProduct(id, quantity) {
        if (quantity <= 0) throw new Error('Quantity must be positive');
        
        await ProductRepository.incrementStock(id, quantity);
        return { message: 'Stock updated successfully' };
    }
}

module.exports = new ProductService();