import React from 'react';
import OrderForm from '../components/orders/OrderForm';
import { useNavigate } from 'react-router-dom';

const CreateOrderPage = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Nueva Orden de Venta</h1>
            <OrderForm onSuccess={() => navigate('/orders')} />
        </div>
    );
};

export default CreateOrderPage;