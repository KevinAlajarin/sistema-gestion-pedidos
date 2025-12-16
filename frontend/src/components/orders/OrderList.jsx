import React, { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import { Eye } from 'lucide-react';

const OrderList = ({ orders, onViewDetails }) => {
    const [filterStatus, setFilterStatus] = useState('ALL');

    const filteredOrders = filterStatus === 'ALL' 
        ? orders 
        : orders.filter(o => o.Status === filterStatus);

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Filtros */}
            <div className="p-4 border-b bg-gray-50 flex gap-2">
                {['ALL', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition ${
                            filterStatus === status 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white border text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                        <tr key={order.OrderID} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">#{order.OrderID}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(order.OrderDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                Cliente #{order.CustomerID}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                ${order.TotalAmount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={order.Status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                    onClick={() => onViewDetails(order)}
                                    className="text-blue-600 hover:text-blue-900 flex items-center justify-end gap-1 ml-auto">
                                    <Eye className="w-4 h-4" /> Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;