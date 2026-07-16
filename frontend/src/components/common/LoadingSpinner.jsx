import React from 'react';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizes = { sm: 'h-6 w-6 border-2', md: 'h-10 w-10 border-3', lg: 'h-16 w-16 border-4' };
  const spinner = <div className={`animate-spin rounded-full ${sizes[size]} border-primary-600 border-t-transparent`} />;

  if (fullScreen) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">{spinner}</div>;
  }
  return <div className="flex justify-center items-center p-8">{spinner}</div>;
};

export default LoadingSpinner;