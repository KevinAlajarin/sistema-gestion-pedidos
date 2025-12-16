USE OMS_DB;
GO

-- Insertar Clientes
INSERT INTO Customers (FullName, Email, Phone, Address) VALUES 
('Juan Pérez', 'juan.perez@email.com', '555-0101', 'Av. Siempre Viva 123'),
('Maria Garcia', 'maria.garcia@email.com', '555-0102', 'Calle Falsa 123'),
('Carlos Lopez', 'carlos.lopez@email.com', '555-0103', 'Rivadavia 4500');

-- Insertar Productos
INSERT INTO Products (Name, Sku, Price, Stock, Description) VALUES
('Laptop Dell XPS 13', 'LAP-DELL-001', 1200.00, 15, 'Ultrabook de alto rendimiento'),
('Monitor LG 27"', 'MON-LG-002', 300.00, 50, 'Monitor IPS 4K'),
('Teclado Mecánico', 'KB-MECH-003', 80.00, 100, 'Teclado RGB Switches Blue'),
('Mouse Logitech', 'MOU-LOG-004', 45.00, 5, 'Mouse ergonómico inalámbrico'); -- Stock bajo intencional
GO