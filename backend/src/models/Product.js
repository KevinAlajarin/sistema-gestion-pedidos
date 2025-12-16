class Product {
    constructor(id, name, sku, price, stock, description) {
        this.ProductID = id;
        this.Name = name;
        this.Sku = sku;
        this.Price = price;
        this.Stock = stock;
        this.Description = description;
    }
}
module.exports = Product;