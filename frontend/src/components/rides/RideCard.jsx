import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import Rating from '../ui/Rating';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { format } from 'date-fns';

const RideCard = ({ ride }) => {
  return (
    <Link to={`/ride/${ride.ride_id}`}>
      <Card className="overflow-hidden hover:shadow-card-hover transition h-full p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar name={ride.driver_name} size="md" />
            <div>
              <p className="font-medium">{ride.driver_name}</p>
              <Rating value={ride.driver_rating || 0} size="sm" showValue />
            </div>
          </div>
          <Badge variant={ride.status === 'active' ? 'success' : 'warning'}>
            {ride.seats_available} seats left
          </Badge>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center text-sm">
            <FaMapMarkerAlt className="text-primary-600 mr-2" />
            <span className="font-medium">{ride.origin}</span>
            <span className="mx-2 text-gray-400">→</span>
            <span className="font-medium">{ride.destination}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <FaCalendarAlt className="mr-2" />
            <span>{format(new Date(ride.date_time), 'EEE, MMM d • h:mm a')}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <FaUsers className="mr-2" />
            <span>{ride.seats_available} of {ride.seats_total} seats available</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          <span className="font-bold text-primary-600">${ride.fare_per_seat} / seat</span>
          <Badge variant="info">{ride.vehicle_details || 'Car'}</Badge>
        </div>
      </Card>
    </Link>
  );
};

export default RideCard;