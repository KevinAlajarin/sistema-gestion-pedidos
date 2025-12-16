import React from 'react';

const CustomerList = ({ customers, onSelect }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                        {onSelect && <th className="px-6 py-3"></th>}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((c) => (
                        <tr key={c.CustomerID} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{c.CustomerID}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.FullName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.Email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.Phone}</td>
                            {onSelect && (
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => onSelect(c)}
                                        className="text-blue-600 hover:text-blue-900 font-medium text-sm">
                                        Seleccionar
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;