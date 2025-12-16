import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white shadow-sm h-16 flex justify-between items-center px-6">
            <h2 className="text-xl font-semibold text-gray-800">Panel de Administración</h2>
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-2 border-l pl-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                        A
                    </div>
                    <span className="text-sm font-medium text-gray-700">Admin User</span>
                </div>
            </div>
        </header>
    );
};

export default Header;