import React, { useState } from 'react';
import { updateOrderStatus } from '../../api/orderAPI';

const OrderStatusUpdate = ({ order, onClose, onUpdate }) => {
    const [status, setStatus] = useState(order.Status);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (status === 'CANCELLED' && !reason) return alert("Debe especificar una razón para cancelar.");
        
        setLoading(true);
        try {
            await updateOrderStatus(order.OrderID, status, reason);
            onUpdate(); 
            onClose();
        } catch (error) {
            alert("Error actualizando estado");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-96 shadow-xl">
                <h3 className="font-bold text-lg mb-4">Actualizar Orden #{order.OrderID}</h3>
                
                <label className="block text-sm font-medium mb-1">Nuevo Estado</label>
                <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED (Restores Stock)</option>
                </select>

                {status === 'CANCELLED' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-red-600">Razón de Cancelación *</label>
                        <textarea 
                            className="w-full border p-2 rounded" 
                            rows="3"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                    <button 
                        onClick={handleSave} 
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusUpdate;