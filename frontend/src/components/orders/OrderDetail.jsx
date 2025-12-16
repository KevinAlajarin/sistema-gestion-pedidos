import React, { useState } from 'react';
import OrderStatusUpdate from './OrderStatusUpdate';
import StatusBadge from '../common/StatusBadge';

const OrderDetail = ({ order, onClose, onRefresh }) => {
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-40">
            <div className="bg-white w-full max-w-2xl h-full shadow-2xl overflow-y-auto p-6 animate-slide-in">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Orden #{order.OrderID}</h2>
                        <p className="text-gray-500">Fecha: {new Date(order.OrderDate).toLocaleString()}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-4 rounded mb-6">
                    <div>
                        <p className="text-sm text-gray-500 uppercase">Estado Actual</p>
                        <StatusBadge status={order.Status} />
                    </div>
                    <button 
                        onClick={() => setIsStatusModalOpen(true)}
                        className="text-blue-600 text-sm font-bold hover:underline"
                    >
                        Cambiar Estado
                    </button>
                </div>

                <div className="mb-6">
                    <h3 className="font-bold border-b pb-2 mb-2">Detalles del Cliente</h3>
                    {/* Si tenemos el objeto cliente anidado o campos planos */}
                    <p>Cliente ID: {order.CustomerID}</p>
                    {order.FullName && <p>Nombre: {order.FullName}</p>}
                </div>

                <div className="mb-6">
                    <h3 className="font-bold border-b pb-2 mb-2">Items</h3>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-left">Producto</th>
                                <th className="p-2 text-center">Cant</th>
                                <th className="p-2 text-right">Precio U.</th>
                                <th className="p-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Si `order.Items` existe (depende de tu endpoint), iteralo. Si no, mostramos aviso */}
                            {order.Items ? order.Items.map((item, i) => (
                                <tr key={i} className="border-b">
                                    <td className="p-2">{item.ProductName || `Prod #${item.ProductID}`}</td>
                                    <td className="p-2 text-center">{item.Quantity}</td>
                                    <td className="p-2 text-right">${item.UnitPrice}</td>
                                    <td className="p-2 text-right">${item.LineTotal}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" className="p-4 text-center text-gray-500">Detalles de items no cargados en vista de lista.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                <div className="flex justify-end text-xl font-bold">
                    <span>Total: ${order.TotalAmount}</span>
                </div>

                {isStatusModalOpen && (
                    <OrderStatusUpdate 
                        order={order} 
                        onClose={() => setIsStatusModalOpen(false)}
                        onUpdate={() => { onRefresh(); onClose(); }} 
                    />
                )}
            </div>
        </div>
    );
};

export default OrderDetail;