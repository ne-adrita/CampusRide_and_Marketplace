import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, max = 5, size = 'md', showValue = false }) => {
  const sizes = { xs: 'text-[10px]', sm: 'text-sm', md: 'text-base', lg: 'text-xl' };
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
  if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  const remainingStars = max - Math.ceil(value);
  for (let i = 0; i < remainingStars; i++) stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);

  return (
    <div className="flex items-center space-x-1">
      <div className={`flex ${sizes[size]}`}>{stars}</div>
      {showValue && <span className="text-gray-600 text-sm font-medium ml-1">{value.toFixed(1)}</span>}
    </div>
  );
};

export default Rating;