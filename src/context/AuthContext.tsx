import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedSession = localStorage.getItem('admin_session') || localStorage.getItem('admin_auth');
        if (savedSession === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (password: string) => {
        // Hardcoded master password with environment variable fallback
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'chaotic333admin';
        if (password.trim() === adminPassword.trim()) {
            localStorage.setItem('admin_session', 'true');
            localStorage.setItem('admin_auth', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('admin_session');
        localStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
