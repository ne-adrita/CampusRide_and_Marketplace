import React from 'react';
import { FaSearch } from 'react-icons/fa';

const ProductFilters = ({ filters, categories = [], onFilterChange, onClearFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="search"
            value={filters.search || ''}
            onChange={handleChange}
            placeholder="Search items..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>

        <select
          name="category"
          value={filters.category || ''}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
          ))}
        </select>

        <select
          name="condition"
          value={filters.condition || ''}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
        </select>

        <div className="flex space-x-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice || ''}
            onChange={handleChange}
            placeholder="Min $"
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice || ''}
            onChange={handleChange}
            placeholder="Max $"
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>

        <select
          name="sort"
          value={filters.sort || 'newest'}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="newest">Newest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>

        <button onClick={onClearFilters} className="btn-secondary text-sm whitespace-nowrap">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;