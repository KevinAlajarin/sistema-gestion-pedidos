class OrderItem {
    constructor(id, orderId, productId, quantity, unitPrice) {
        this.OrderItemID = id;
        this.OrderID = orderId;
        this.ProductID = productId;
        this.Quantity = quantity;
        this.UnitPrice = unitPrice;
    }
}
module.exports = OrderItem;