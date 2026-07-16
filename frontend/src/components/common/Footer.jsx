import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">CampusRide</h3>
            <p className="text-sm text-gray-400">
              A university-exclusive platform for buying, selling, and campus ride sharing.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/marketplace" className="hover:text-white transition">Marketplace</Link></li>
              <li><Link to="/rides" className="hover:text-white transition">Rides</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaFacebook /></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaInstagram /></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaGithub /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CampusRide & Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;