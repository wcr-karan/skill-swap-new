import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { authAPI } from '../api/endpoints';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Set default header
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const res = await authAPI.getMe();
                    setUser(res.data);
                } catch (error) {
                    console.error("Auth init failed:", error);
                    localStorage.removeItem('token');
                    delete api.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        const res = await authAPI.login({ email, password });
        const { token } = res.data;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Fetch user details immediately after login
        const userRes = await authAPI.getMe();
        setUser(userRes.data);
        return userRes.data;
    };

    const register = async (name, email, password) => {
        await authAPI.register({ name, email, password });
        // Auto-login after register? Or redirect to login? 
        // Let's just return true and let the component handle redirection to login
        return true;
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const updateUser = (userData) => {
        setUser(prev => ({ ...prev, ...userData }));
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
