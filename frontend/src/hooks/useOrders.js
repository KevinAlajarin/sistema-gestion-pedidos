import { useState, useEffect, useCallback } from 'react';
import { getOrders } from '../api/orderAPI';

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getOrders();
            // Ordenar por fecha descendente
            const sorted = data.sort((a, b) => new Date(b.OrderDate) - new Date(a.OrderDate));
            setOrders(sorted);
            setError(null);
        } catch (err) {
            setError('Error al cargar órdenes');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { orders, loading, error, refetch: fetchOrders };
};

export default useOrders;