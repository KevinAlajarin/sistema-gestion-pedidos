import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, Package, PlusCircle } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/orders', label: 'Órdenes', icon: ShoppingCart },
        { path: '/create-order', label: 'Nueva Orden', icon: PlusCircle },
        { path: '/customers', label: 'Clientes', icon: Users },
        { path: '/products', label: 'Productos', icon: Package },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0">
            <div className="h-16 flex items-center justify-center border-b border-slate-700">
                <h1 className="text-2xl font-bold tracking-wider text-blue-400">OMS PRO</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-700">
                <p className="text-xs text-slate-500 text-center">v1.0.0 Enterprise</p>
            </div>
        </aside>
    );
};

export default Sidebar;