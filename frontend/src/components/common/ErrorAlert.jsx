import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message }) => {
    if (!message) return null;
    return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded shadow-sm">
            <div className="flex items-center">
                <AlertCircle className="text-red-500 mr-2" />
                <p className="text-red-700 font-medium">{message}</p>
            </div>
        </div>
    );
};

export default ErrorAlert;