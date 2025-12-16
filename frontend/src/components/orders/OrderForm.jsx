import React, { useState, useEffect } from 'react';
import { getCustomers } from '../../api/customerAPI';
import { getProducts } from '../../api/productAPI';
import { createOrder } from '../../api/orderAPI';
import LoadingSpinner from '../common/LoadingSpinner';

const OrderForm = ({ onSuccess }) => {
    const [step, setStep] = useState(1); 
    const [loading, setLoading] = useState(false);
    
    // Data Sources
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    // Form State
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [custData, prodData] = await Promise.all([getCustomers(), getProducts()]);
                setCustomers(custData);
                setProducts(prodData);
            } catch (err) {
                alert("Error cargando datos maestros");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const addToCart = (product, qty) => {
        if (qty <= 0) return;
        if (qty > product.Stock) return alert(`Solo hay ${product.Stock} unidades disponibles.`);

        const existing = cart.find(item => item.productId === product.ProductID);
        if (existing) {
            // Actualizar cantidad
            if (existing.quantity + qty > product.Stock) return alert("Excede stock disponible");
            setCart(cart.map(item => item.productId === product.ProductID ? {...item, quantity: item.quantity + qty} : item));
        } else {
            // Agregar nuevo
            setCart([...cart, { productId: product.ProductID, name: product.Name, price: product.Price, quantity: qty }]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.productId !== id));
    };

    const handleSubmit = async () => {
        if (!selectedCustomer || cart.length === 0) return;
        setLoading(true);
        try {
            await createOrder({
                customerId: selectedCustomer.CustomerID,
                items: cart.map(i => ({ productId: i.productId, quantity: i.quantity }))
            });
            alert("Orden creada exitosamente (Stock descontado)");
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error(err);
            alert("Error procesando orden: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    if (loading && customers.length === 0) return <LoadingSpinner />;

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
                <div className="h-1 bg-gray-200 w-12 mx-2"></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
            </div>

            {/* Seleccion de cliente */}
            {step === 1 && (
                <div>
                    <h3 className="text-lg font-bold mb-4">Seleccionar Cliente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                        {customers.map(c => (
                            <div 
                                key={c.CustomerID} 
                                onClick={() => setSelectedCustomer(c)}
                                className={`p-4 border rounded cursor-pointer hover:bg-blue-50 transition ${selectedCustomer?.CustomerID === c.CustomerID ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : ''}`}
                            >
                                <p className="font-bold">{c.FullName}</p>
                                <p className="text-sm text-gray-500">{c.Email}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button 
                            disabled={!selectedCustomer}
                            onClick={() => setStep(2)}
                            className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50 hover:bg-blue-700"
                        >
                            Siguiente: Agregar Productos
                        </button>
                    </div>
                </div>
            )}

            {/* Agregar productos */}
            {step === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Catalogo de productos */}
                    <div className="border-r pr-4">
                        <h3 className="font-bold mb-3">Catálogo</h3>
                        <div className="space-y-2 h-96 overflow-y-auto">
                            {products.map(p => (
                                <div key={p.ProductID} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                                    <div>
                                        <p className="font-medium">{p.Name}</p>
                                        <p className="text-sm text-gray-500">${p.Price} | Stock: {p.Stock}</p>
                                    </div>
                                    <button 
                                        onClick={() => addToCart(p, 1)}
                                        disabled={p.Stock < 1}
                                        className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 disabled:opacity-50"
                                    >
                                        + Agregar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart */}
                    <div>
                        <h3 className="font-bold mb-3">Resumen de Orden</h3>
                        {selectedCustomer && (
                            <div className="bg-blue-50 p-3 rounded mb-3 text-sm">
                                Cliente: <strong>{selectedCustomer.FullName}</strong>
                            </div>
                        )}
                        <div className="bg-gray-50 p-4 rounded h-64 overflow-y-auto">
                            {cart.length === 0 ? <p className="text-gray-400 text-center mt-10">Carrito vacío</p> : (
                                cart.map(item => (
                                    <div key={item.productId} className="flex justify-between items-center mb-2 border-b pb-2">
                                        <div>
                                            <p className="text-sm font-bold">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.quantity} x ${item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">${(item.quantity * item.price).toFixed(2)}</span>
                                            <button onClick={() => removeFromCart(item.productId)} className="text-red-500 text-xs">X</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-4 flex justify-between items-center text-xl font-bold">
                            <span>Total:</span>
                            <span>${cart.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}</span>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setStep(1)} className="w-1/3 border py-2 rounded">Atrás</button>
                            <button 
                                onClick={handleSubmit} 
                                disabled={cart.length === 0 || loading}
                                className="w-2/3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold"
                            >
                                {loading ? 'Procesando...' : 'Confirmar Transacción'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderForm;