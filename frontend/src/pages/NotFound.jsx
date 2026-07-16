import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center space-x-2">
          <FaHome size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
