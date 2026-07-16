import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.product_id}`}>
      <Card className="overflow-hidden hover:shadow-card-hover transition h-full">
        <div className="aspect-square bg-gray-100">
          {product.image ? (
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm truncate">{product.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-primary-600">${product.price}</span>
            <Badge variant={product.condition === 'New' ? 'success' : 'info'}>{product.condition || 'Good'}</Badge>
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span>{product.seller_name}</span>
            <Rating value={product.seller_rating || 0} size="sm" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;