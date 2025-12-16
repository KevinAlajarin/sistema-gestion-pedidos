import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import CreateOrderPage from './pages/CreateOrderPage';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Redireccionar raíz a dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Rutas Principales */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/create-order" element={<CreateOrderPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            
            {/* Ruta 404 (Catch all) */}
            <Route path="*" element={
              <div className="text-center mt-20">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-gray-500">Página no encontrada</p>
              </div>
            } />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;