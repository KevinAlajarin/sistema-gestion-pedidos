import React, { useState } from 'react';
import useOrders from '../hooks/useOrders';
import OrderList from '../components/orders/OrderList';
import OrderDetail from '../components/orders/OrderDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';

const OrdersPage = () => {
    const { orders, loading, error, refetch } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState(null);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Órdenes</h1>
                <button onClick={refetch} className="text-blue-600 hover:underline">Actualizar</button>
            </div>
            
            <OrderList orders={orders} onViewDetails={setSelectedOrder} />

            {selectedOrder && (
                <OrderDetail 
                    order={selectedOrder} 
                    onClose={() => setSelectedOrder(null)}
                    onRefresh={refetch}
                />
            )}
        </div>
    );
};

export default OrdersPage;