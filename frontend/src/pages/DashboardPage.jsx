import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../api/dashboardAPI';
import KpiCard from '../components/dashboard/KpiCard';
import OrdersByStatusChart from '../components/dashboard/OrdersByStatusChart';
import RevenueChart from '../components/dashboard/RevenueChart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { DollarSign, ShoppingBag, AlertCircle, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDashboardStats()
            .then(data => setStats(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Ejecutivo</h1>
            
            {/* KPI seccion */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KpiCard 
                    title="Ingresos Totales" 
                    value={`$${stats.totalRevenue}`} 
                    icon={DollarSign} 
                    color="#10B981" 
                />
                <KpiCard 
                    title="Órdenes Totales" 
                    value={stats.totalOrders} 
                    icon={ShoppingBag} 
                    color="#3B82F6" 
                />
                <KpiCard 
                    title="Ticket Promedio" 
                    value={`$${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : 0}`} 
                    icon={TrendingUp} 
                    color="#8B5CF6" 
                />
                 <KpiCard 
                    title="Alertas Sistema" 
                    value="OK" 
                    icon={AlertCircle} 
                    color="#6B7280" 
                />
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <RevenueChart />
                </div>
                <div>
                    {stats.ordersByStatus.length > 0 
                        ? <OrdersByStatusChart data={stats.ordersByStatus} />
                        : <div className="bg-white p-10 rounded shadow text-center text-gray-400">Sin datos de órdenes</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;