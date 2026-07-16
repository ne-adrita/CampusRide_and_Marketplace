import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const IS_PREVIEW = import.meta.env.VITE_PREVIEW_MODE === 'true';

const AuthContext = createContext();

const previewUser = IS_PREVIEW ? {
  user_id: 'user_001',
  name: 'Alex Student',
  email: 'alex@university.edu',
  studentId: 'STU-2024-042',
  verified: true,
  role: 'student',
  avatar: null,
  phone: '+1-555-0100',
  bio: 'CS junior. Love hiking and photography.',
  rating: 4.8,
} : null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (IS_PREVIEW) {
      setUser(previewUser);
      setLoading(false);
      return;
    }
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser({ ...data, user_id: data.user_id || data._id || data.id });
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      const userData = { ...data.user, user_id: data.user.user_id || data.user._id || data.user.id };
      setUser(userData);
      toast.success('Welcome back!');
      return { success: true };
    } catch (error) {
      if (IS_PREVIEW && !error.response) {
        setUser(previewUser);
        toast.success('Welcome back!');
        return { success: true };
      }
      return { success: false, error: error.response?.data?.message || 'Network error. Backend unreachable.' };
    }
  };

  const register = async (name, email, studentId, password) => {
    try {
      const { data } = await api.post('/auth/register', {
        name,
        email,
        studentId,
        password,
      });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      const userData = { ...data.user, user_id: data.user.user_id || data.user._id || data.user.id };
      setUser(userData);
      toast.success('Registration successful! Please wait for admin verification.');
      return { success: true };
    } catch (error) {
      if (IS_PREVIEW && !error.response) {
        setUser(previewUser);
        toast.success('Registered successfully!');
        return { success: true };
      }
      return { success: false, error: error.response?.data?.message || 'Network error. Backend unreachable.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isVerified: user?.verified || false,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};