import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const RideFilters = ({ filters, onFilterChange, onClearFilters }) => {
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
            placeholder="Search rides..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>

        <input
          type="text"
          name="origin"
          value={filters.origin || ''}
          onChange={handleChange}
          placeholder="From"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />

        <input
          type="text"
          name="destination"
          value={filters.destination || ''}
          onChange={handleChange}
          placeholder="To"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />

        <input
          type="date"
          name="date"
          value={filters.date || ''}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />

        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice || ''}
          onChange={handleChange}
          placeholder="Max price"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />

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

        <button onClick={onClearFilters} className="btn-secondary text-sm whitespace-nowrap col-span-full md:col-span-1">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

RideFilters.propTypes = {
  filters: PropTypes.shape({
    search: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
    date: PropTypes.string,
    maxPrice: PropTypes.string,
    sort: PropTypes.string,
  }),
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default RideFilters;
