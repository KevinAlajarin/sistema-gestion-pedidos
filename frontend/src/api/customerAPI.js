import client from './client';

export const getCustomers = async () => {
    const response = await client.get('/customers');
    return response.data.data;
};

export const getCustomerById = async (id) => {
    const response = await client.get(`/customers/${id}`);
    return response.data.data;
};

export const createCustomer = async (customerData) => {
    const response = await client.post('/customers', customerData);
    return response.data.data;
}; 