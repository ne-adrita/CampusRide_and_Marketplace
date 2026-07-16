import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);
    if (result.success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-card p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary-600">CampusRide</Link>
          <h2 className="text-2xl font-semibold mt-4">Welcome back</h2>
          <p className="text-gray-600">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="University Email" type="email" name="email" placeholder="your.email@edu.com" value={formData.email} onChange={handleChange} error={errors.email} />
          <Input label="Password" type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} error={errors.password} />
          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700">Forgot password?</Link>
            <span className="text-gray-500">Don't have an account? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">Register</Link></span>
          </div>
          <Button type="submit" className="w-full" isLoading={loading}>Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;