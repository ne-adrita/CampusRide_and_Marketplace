import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaShieldAlt, FaComment, FaStar } from 'react-icons/fa';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Campus life, <span className="text-yellow-300">simplified.</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Buy and sell second-hand gear with fellow students, and share rides across campus.
              Safer. Cheaper. More connected.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={user ? '/marketplace' : '/register'} className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                {user ? 'Browse Marketplace' : 'Join Your Campus'}
              </Link>
              <Link to="/marketplace" className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center"><div className="text-3xl font-bold text-primary-600">12,384</div><div className="text-gray-600">Verified Students</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-primary-600">3,241</div><div className="text-gray-600">Active Listings</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-primary-600">8,760</div><div className="text-gray-600">Rides Completed</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-primary-600">4.9★</div><div className="text-gray-600">Average Rating</div></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Built for Student Life</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-primary-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Community</h3>
              <p className="text-gray-600">Only students with .edu emails can join. Every profile shows a verified badge.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaComment className="text-primary-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-lg mb-2">In-app Chat</h3>
              <p className="text-gray-600">Talk to buyers, sellers, and drivers without sharing your phone number.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-primary-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Ratings & Reviews</h3>
              <p className="text-gray-600">Build trust with a transparent rating system for buyers, sellers, and drivers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join your campus community?</h2>
          <p className="text-xl text-primary-100 mb-8">It takes 60 seconds. Verified students only.</p>
          <Link to="/register" className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;