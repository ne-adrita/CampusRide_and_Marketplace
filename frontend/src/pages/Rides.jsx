import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import RideCard from '../components/rides/RideCard';
import RideFilters from '../components/rides/RideFilters';
import Pagination from '../components/ui/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaSearch } from 'react-icons/fa';

const Rides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', origin: '', destination: '', date: '', maxPrice: '', sort: 'newest' });
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });

  useEffect(() => { fetchRides(); }, [filters, pagination.page]);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/rides', { params: { ...filters, page: pagination.page, limit: pagination.limit } });
      setRides(data.rides);
      setPagination(data.pagination);
    } catch (error) { console.error('Error fetching rides:', error); }
    finally { setLoading(false); }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    setPagination({ ...pagination, page: 1 });
  };

  const handleClearFilters = () => {
    setFilters({ search: '', origin: '', destination: '', date: '', maxPrice: '', sort: 'newest' });
    setPagination({ ...pagination, page: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Ride Sharing</h1>
          <Link to="/create-ride" className="btn-primary mt-4 md:mt-0">+ Offer a Ride</Link>
        </div>

        <RideFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

        <div className="mt-6">
          <p className="text-gray-600 mb-4">{pagination.total} rides available</p>
          {loading ? <LoadingSpinner /> : rides.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <FaSearch className="text-gray-300 text-5xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">No rides found</h3>
              <button onClick={handleClearFilters} className="btn-primary mt-4">Clear filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rides.map((ride) => <RideCard key={ride.ride_id} ride={ride} />)}
              </div>
              <Pagination currentPage={pagination.page} totalPages={pagination.pages} onPageChange={(page) => { setPagination({ ...pagination, page }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rides;