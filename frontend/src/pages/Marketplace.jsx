import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../services/productService';
import ProductCard from '../components/marketplace/ProductCard';
import ProductFilters from '../components/marketplace/ProductFilters';
import Pagination from '../components/ui/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaSearch } from 'react-icons/fa';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: '', minPrice: '', maxPrice: '', condition: '', location: '', sort: 'newest' });
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });
  const [categories, setCategories] = useState([]);

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { fetchProducts(); }, [filters, pagination.page]);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) { console.error('Error fetching categories:', error); }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts({ ...filters, page: pagination.page, limit: pagination.limit });
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) { console.error('Error fetching products:', error); }
    finally { setLoading(false); }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    setPagination({ ...pagination, page: 1 });
  };

  const handleClearFilters = () => {
    setFilters({ search: '', category: '', minPrice: '', maxPrice: '', condition: '', location: '', sort: 'newest' });
    setPagination({ ...pagination, page: 1 });
  };

  return (
    <div className="min-h-screen bg-navy-50 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-navy-800">Marketplace</h1>
          <Link to="/create-listing" className="btn-primary mt-4 md:mt-0">+ List Your Item</Link>
        </div>

        <ProductFilters filters={filters} categories={categories} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

        <div className="mt-6">
          <p className="text-navy-400 mb-4">{pagination.total} items found</p>
          {loading ? <LoadingSpinner /> : products.length === 0 ? (
            <div className="text-center py-12 surface-card">
              <FaSearch className="text-navy-200 text-5xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-navy-600">No items found</h3>
              <button onClick={handleClearFilters} className="btn-primary mt-4">Clear all filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => <ProductCard key={product.product_id} product={product} />)}
              </div>
              <Pagination currentPage={pagination.page} totalPages={pagination.pages} onPageChange={(page) => { setPagination({ ...pagination, page }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
