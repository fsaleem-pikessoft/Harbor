'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, roles: string[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = (token: string, roles: string[]) => {
    Cookies.set('token', token, { expires: 7 }); // 7-day expiry
    setIsAuthenticated(true);
    if (roles.includes('Admin')) {
      router.push('/admin/adminDashboard');
    } else {
      router.push('/dashboard');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    queryClient.clear();
    toast.success('Logout Successfully');
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
