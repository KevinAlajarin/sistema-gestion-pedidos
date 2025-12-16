const CustomerRepository = require('../repositories/CustomerRepository');

class CustomerService {
    async getAllCustomers() {
        return await CustomerRepository.getAll();
    }

    async getCustomerById(id) {
        const customer = await CustomerRepository.getById(id, 'CustomerID');
        if (!customer) throw new Error('Customer not found');
        return customer;
    }

    async createCustomer(data) {
        // Validar duplicados
        const existing = await CustomerRepository.findByEmail(data.email);
        if (existing) throw new Error('Customer with this email already exists');
        
        const newId = await CustomerRepository.create(data);
        return { id: newId, ...data };
    }
}

module.exports = new CustomerService();