import React from 'react';

const KpiCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderColor: color }}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm uppercase font-bold">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-opacity-20`} style={{ backgroundColor: color }}>
          {Icon && <Icon className="w-8 h-8" style={{ color: color }} />}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;