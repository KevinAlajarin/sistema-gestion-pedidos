USE OMS_DB;
GO

-- SP para obtener productos con bajo stock
CREATE OR ALTER PROCEDURE sp_GetLowStockProducts
    @Threshold INT = 10
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        ProductID, 
        Name, 
        Sku, 
        Stock, 
        Price
    FROM Products
    WHERE Stock <= @Threshold
    ORDER BY Stock ASC;
END
GO

-- SP para reporte de ventas por cliente
CREATE OR ALTER PROCEDURE sp_GetCustomerSalesSummary
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        c.FullName,
        COUNT(o.OrderID) as TotalOrders,
        SUM(o.TotalAmount) as TotalSpent,
        MAX(o.OrderDate) as LastOrderDate
    FROM Customers c
    LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
    WHERE o.Status != 'CANCELLED'
    GROUP BY c.CustomerID, c.FullName
    ORDER BY TotalSpent DESC;
END
GO