-- Crear base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'OMS_DB')
BEGIN
    CREATE DATABASE OMS_DB;
END
GO

USE OMS_DB;
GO

-- 1. Tabla Customers
IF OBJECT_ID('dbo.Customers', 'U') IS NOT NULL DROP TABLE dbo.Customers;
CREATE TABLE Customers (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Phone NVARCHAR(20),
    Address NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- 2. Tabla Products
IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL DROP TABLE dbo.Products;
CREATE TABLE Products (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Sku NVARCHAR(50) NOT NULL UNIQUE,
    Price DECIMAL(10, 2) NOT NULL CHECK (Price >= 0),
    Stock INT NOT NULL DEFAULT 0 CHECK (Stock >= 0),
    Description NVARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- 3. Tabla Orders
IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL DROP TABLE dbo.Orders;
CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    TotalAmount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    Status NVARCHAR(20) NOT NULL CHECK (Status IN ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
    CancellationReason NVARCHAR(255) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- 4. Tabla OrderItems
IF OBJECT_ID('dbo.OrderItems', 'U') IS NOT NULL DROP TABLE dbo.OrderItems;
CREATE TABLE OrderItems (
    OrderItemID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    UnitPrice DECIMAL(10, 2) NOT NULL,
    LineTotal AS (Quantity * UnitPrice),
    CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    CONSTRAINT FK_OrderItems_Products FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- 5. Tabla StockMovements (Auditoría de inventario)
IF OBJECT_ID('dbo.StockMovements', 'U') IS NOT NULL DROP TABLE dbo.StockMovements;
CREATE TABLE StockMovements (
    MovementID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    MovementType NVARCHAR(10) NOT NULL CHECK (MovementType IN ('IN', 'OUT', 'ADJUST')),
    Quantity INT NOT NULL CHECK (Quantity > 0),
    ReferenceType NVARCHAR(50) NOT NULL, -- 'ORDER', 'MANUAL'
    ReferenceID INT NULL, -- OrderID
    MovementDate DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_StockMovements_Products FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
GO