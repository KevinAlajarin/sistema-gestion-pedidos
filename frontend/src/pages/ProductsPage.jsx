import React, { useState, useEffect } from 'react';
import ProductList from '../components/products/ProductList';
import { getProducts } from '../api/productAPI';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Inventario de Productos</h1>
            <ProductList products={products} />
        </div>
    );
};

export default ProductsPage;