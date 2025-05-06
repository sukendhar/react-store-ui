import React, { createContext, useState } from 'react';
import { authApi } from "./services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const signup = async (email, password, passwordConfirmation) => {
        const { data } = await authApi.post('/signup', { email, password, password_confirmation: passwordConfirmation });
        localStorage.setItem('token', data.token);
        setUser({ email: data.email });
    };

    const login = async (email, password) => {
        const { data } = await authApi.post('/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser({ email: data.email });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}