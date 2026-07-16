import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaFacebook, FaTwitter, FaInstagram, FaGithub, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 text-navy-300">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center text-white">
                <FaGraduationCap size={16} />
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold text-white">CampusRide</span>
                <span className="block text-[10px] font-medium text-navy-400 tracking-wide">&amp; Marketplace</span>
              </div>
            </div>
            <p className="text-sm text-navy-400 leading-relaxed mb-4 max-w-xs">
              Buy, sell, and share rides with your fellow students.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-xl bg-navy-700 flex items-center justify-center text-navy-400 hover:bg-primary-500 hover:text-white transition-all"><FaFacebook size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-xl bg-navy-700 flex items-center justify-center text-navy-400 hover:bg-primary-500 hover:text-white transition-all"><FaTwitter size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-xl bg-navy-700 flex items-center justify-center text-navy-400 hover:bg-primary-500 hover:text-white transition-all"><FaInstagram size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-xl bg-navy-700 flex items-center justify-center text-navy-400 hover:bg-primary-500 hover:text-white transition-all"><FaGithub size={14} /></a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link to="/rides" className="hover:text-white transition-colors">Rides</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/faq" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Safety Tips</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-navy-400">
          <p>&copy; {year} CampusRide &amp; Marketplace. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Built for students <FaHeart className="text-red-400 mx-1" size={12} /> on campus
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
