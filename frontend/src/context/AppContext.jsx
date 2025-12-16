import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({ name: 'Admin User', role: 'ADMIN' });
    const [globalLoading, setGlobalLoading] = useState(false);

    return (
        <AppContext.Provider value={{ user, setUser, globalLoading, setGlobalLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);