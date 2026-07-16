import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', studentId: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!formData.email.includes('.edu')) newErrors.email = 'Only university (.edu) emails are allowed';
    if (!formData.studentId) newErrors.studentId = 'Student ID is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const result = await register(formData.name, formData.email, formData.studentId, formData.password);
    setLoading(false);
    if (result.success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-card p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary-600">CampusRide</Link>
          <h2 className="text-2xl font-semibold mt-4">Verify with your Student ID</h2>
          <p className="text-gray-600">Join the verified campus community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} error={errors.name} />
          <Input label="University Email" type="email" name="email" placeholder="your.email@edu.com" value={formData.email} onChange={handleChange} error={errors.email} />
          <Input label="Student ID" type="text" name="studentId" placeholder="2021-XXXXX" value={formData.studentId} onChange={handleChange} error={errors.studentId} />
          <Input label="Password" type="password" name="password" placeholder="Min. 6 characters" value={formData.password} onChange={handleChange} error={errors.password} />
          <Input label="Confirm Password" type="password" name="confirmPassword" placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
          <div className="flex items-center text-sm">
            <input type="checkbox" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-gray-600">I agree to the <Link to="/terms" className="text-primary-600 hover:text-primary-700">Terms of Service</Link></label>
          </div>
          <Button type="submit" className="w-full" isLoading={loading}>Create Account</Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;