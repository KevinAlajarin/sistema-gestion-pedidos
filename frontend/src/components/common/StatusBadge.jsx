import React from 'react';

const STATUS_COLORS = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
    SHIPPED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    DELIVERED: 'bg-green-100 text-green-800 border-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
};

const StatusBadge = ({ status }) => {
    const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
    
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}>
            {status}
        </span>
    );
};

export default StatusBadge;