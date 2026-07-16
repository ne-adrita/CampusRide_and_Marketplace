import React from 'react';

const Card = ({ children, className = '', hoverable = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-card overflow-hidden ${hoverable ? 'hover:shadow-card-hover transition-shadow duration-200' : ''} ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>{children}</div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>{children}</div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;