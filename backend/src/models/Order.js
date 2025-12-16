class Order {
  constructor(id, customerId, orderDate, totalAmount, status, cancellationReason) {
    this.OrderID = id;
    this.CustomerID = customerId;
    this.OrderDate = orderDate;
    this.TotalAmount = totalAmount;
    this.Status = status;
    this.CancellationReason = cancellationReason;
    this.Items = []; 
  }
}
module.exports = Order;