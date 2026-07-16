import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Card from '../components/ui/Card';
import ProductCard from '../components/marketplace/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaHeart } from 'react-icons/fa';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await api.get('/wishlist');
        setItems(data);
      } catch (error) { console.error('Error fetching wishlist:', error); }
      finally { setLoading(false); }
    };
    fetchWishlist();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        {items.length === 0 ? (
          <Card className="p-12 text-center">
            <FaHeart className="text-gray-300 text-5xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">Your wishlist is empty</h3>
            <Link to="/marketplace" className="btn-primary inline-block mt-4">Browse Marketplace</Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => <ProductCard key={item.product_id} product={item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;