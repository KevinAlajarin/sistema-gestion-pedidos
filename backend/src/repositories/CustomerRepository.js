const BaseRepository = require('./BaseRepository');
const { sql, poolPromise } = require('../config/database');

class CustomerRepository extends BaseRepository {
    constructor() {
        super('Customers');
    }

    async findByEmail(email) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT * FROM Customers WHERE Email = @Email');
        return result.recordset[0];
    }

    async create(customerData) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('FullName', sql.NVarChar, customerData.fullName)
            .input('Email', sql.NVarChar, customerData.email)
            .input('Phone', sql.NVarChar, customerData.phone)
            .input('Address', sql.NVarChar, customerData.address)
            .query(`
                INSERT INTO Customers (FullName, Email, Phone, Address)
                OUTPUT INSERTED.CustomerID
                VALUES (@FullName, @Email, @Phone, @Address)
            `);
        return result.recordset[0].CustomerID;
    }
}

module.exports = new CustomerRepository();