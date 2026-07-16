import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as authService from '../services/authService';
import { initData, resetAllData } from '../data';

const IS_PREVIEW = import.meta.env.VITE_PREVIEW_MODE === 'true';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('campusride_token'));

  useEffect(() => {
    if (IS_PREVIEW) {
      initData();
      authService.getMe().then(({ data }) => {
        setUser({ ...data, user_id: data.user_id });
        setLoading(false);
      });
      return;
    }
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const { data } = await authService.getMe();
      setUser({ ...data, user_id: data.user_id || data._id || data.id });
    } catch (error) {
      if (error?.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      const userData = { ...result.data.user, user_id: result.data.user.user_id || result.data.user._id || result.data.user.id };
      setToken(result.data.token);
      setUser(userData);
      toast.success('Welcome back!');
    }
    return result;
  };

  const register = async (name, email, studentId, password) => {
    const result = await authService.register(name, email, studentId, password);
    if (result.success) {
      const userData = { ...result.data.user, user_id: result.data.user.user_id || result.data.user._id || result.data.user.id };
      setToken(result.data.token);
      setUser(userData);
      toast.success('Registration successful!');
    }
    return result;
  };

  const logout = () => {
    localStorage.removeItem('campusride_token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const resetDemo = () => {
    resetAllData();
    authService.getMe().then(({ data }) => {
      setUser({ ...data, user_id: data.user_id });
    });
    toast.success('Demo data reset');
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    resetDemo,
    isAuthenticated: !!user,
    isVerified: user?.verified || false,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
