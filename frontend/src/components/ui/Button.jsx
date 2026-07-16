import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', isLoading = false, disabled = false, ...props }) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-base', lg: 'px-6 py-3 text-lg' };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;