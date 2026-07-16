import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
    toast.success('Password reset link sent to your email.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-50 py-12 px-4">
      <div className="max-w-md w-full surface-card p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary-600">CampusRide</Link>
          <h2 className="text-2xl font-semibold text-navy-800 mt-4">Forgot Password</h2>
          <p className="text-navy-400">Enter your university email to receive a reset link</p>
        </div>
        {sent ? (
          <div className="text-center py-6">
            <p className="text-green-600 font-medium mb-4">Reset link sent!</p>
            <p className="text-sm text-navy-400">Check your email inbox. If you don&apos;t see it, check your spam folder.</p>
            <Link to="/login" className="btn-primary inline-block mt-6">Back to Sign In</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="University Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@edu.com" required />
            <Button type="submit" className="w-full" isLoading={loading}>Send Reset Link</Button>
            <div className="text-center text-sm text-navy-400">
              Remember your password? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Sign In</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
