import client from './client';

export const getProducts = async () => {
    const response = await client.get('/products');
    return response.data.data;
};

export const getProductById = async (id) => {
    const response = await client.get(`/products/${id}`);
    return response.data.data;
};