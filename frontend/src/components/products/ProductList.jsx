import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ProductList = ({ products }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((p) => {
                        const isLowStock = p.Stock < 10;
                        return (
                            <tr key={p.ProductID} className={isLowStock ? 'bg-red-50' : ''}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{p.Name}</div>
                                    <div className="text-xs text-gray-500 truncate max-w-xs">{p.Description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.Sku}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">${p.Price}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                                    {p.Stock}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {isLowStock ? (
                                        <span className="flex items-center text-xs text-red-600 font-bold bg-red-100 px-2 py-1 rounded-full w-fit">
                                            <AlertTriangle className="w-3 h-3 mr-1"/> Low Stock
                                        </span>
                                    ) : (
                                        <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full">In Stock</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;