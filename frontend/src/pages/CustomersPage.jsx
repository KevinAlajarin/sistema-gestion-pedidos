import React, { useState, useEffect } from 'react';
import CustomerList from '../components/customers/CustomerList';
import CustomerForm from '../components/customers/CustomerForm';
import { getCustomers } from '../api/customerAPI';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { UserPlus } from 'lucide-react';

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const loadCustomers = () => {
        setLoading(true);
        getCustomers()
            .then(setCustomers)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Cartera de Clientes</h1>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    <UserPlus className="w-4 h-4" /> 
                    {showForm ? 'Cancelar' : 'Nuevo Cliente'}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 animate-fade-in-down">
                    <CustomerForm onSuccess={() => { setShowForm(false); loadCustomers(); }} />
                </div>
            )}

            <CustomerList customers={customers} />
        </div>
    );
};

export default CustomersPage;