const formatCurrency = (amount) => {
    return Number(amount).toFixed(2);
};

const calculateOrderTotal = (items) => {
    return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
};

module.exports = {
    formatCurrency,
    calculateOrderTotal
};