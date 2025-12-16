import client from './client';

export const getOrders = async () => {
    const response = await client.get('/orders');
    return response.data.data;
};

export const createOrder = async (orderData) => {
    const response = await client.post('/orders', orderData);
    return response.data.data;
};

export const updateOrderStatus = async (id, status, reason) => {
    const response = await client.patch(`/orders/${id}/status`, { status, reason });
    return response.data.data;
};