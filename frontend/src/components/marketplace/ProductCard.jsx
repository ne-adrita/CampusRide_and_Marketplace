import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import Avatar from '../ui/Avatar';
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = React.useState(product.is_wishlisted || false);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { toast.error('Please login to add to wishlist'); return; }
    try {
      if (isInWishlist) {
        await api.delete(`/products/${product.product_id}/wishlist`);
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        await api.post(`/products/${product.product_id}/wishlist`);
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      if (!error.response) {
        setIsInWishlist(!isInWishlist);
      }
    }
  };

  const timeAgo = product.created_at
    ? (() => {
        const diff = Date.now() - new Date(product.created_at).getTime();
        const hrs = Math.floor(diff / 3600000);
        if (hrs < 1) return 'Just now';
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
      })()
    : null;

  return (
    <div className="surface-card-hover overflow-hidden group cursor-pointer relative" onClick={() => navigate(`/product/${product.product_id}`)}>
      {/* Image */}
      <div className="aspect-[4/3] bg-navy-100 overflow-hidden relative">
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-navy-300">No image</div>
        )}
        {/* Badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge variant={product.condition === 'New' || product.condition === 'Like New' ? 'success' : 'info'}>{product.condition}</Badge>
        </div>
        {/* Wishlist heart */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"
        >
          {isInWishlist ? <FaHeart className="text-red-500" size={14} /> : <FaRegHeart className="text-navy-400" size={14} />}
        </button>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-semibold text-navy-800 text-sm leading-snug truncate flex-1 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-primary-600">${product.price}</span>
          {timeAgo && <span className="text-xs text-navy-400">{timeAgo}</span>}
        </div>
        {product.location && (
          <div className="flex items-center text-xs text-navy-400 mb-3">
            <FaMapMarkerAlt className="mr-1" size={10} />
            {product.location}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-navy-100">
          <div className="flex items-center space-x-2">
            <Avatar name={product.seller_name} size="xs" />
            <span className="text-xs font-medium text-navy-600">{product.seller_name}</span>
          </div>
          <Rating value={product.seller_rating || 0} size="xs" showValue />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
