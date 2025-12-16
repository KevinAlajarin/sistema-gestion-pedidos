const { poolPromise } = require('../config/database');

exports.getStats = async (req, res) => {
    const pool = await poolPromise;
    
    const [counts, revenue, byStatus] = await Promise.all([
        pool.request().query("SELECT COUNT(*) as TotalOrders FROM Orders"),
        pool.request().query("SELECT SUM(TotalAmount) as TotalRevenue FROM Orders WHERE Status != 'CANCELLED'"),
        pool.request().query("SELECT Status, COUNT(*) as Count FROM Orders GROUP BY Status")
    ]);

    res.json({
        totalOrders: counts.recordset[0].TotalOrders,
        totalRevenue: revenue.recordset[0].TotalRevenue || 0,
        ordersByStatus: byStatus.recordset
    });
};