class StockMovement {
    constructor(id, productId, type, quantity, referenceType, referenceId, date) {
        this.MovementID = id;
        this.ProductID = productId;
        this.MovementType = type; 
        this.Quantity = quantity;
        this.ReferenceType = referenceType;
        this.ReferenceID = referenceId;
        this.MovementDate = date;
    }
}
module.exports = StockMovement;