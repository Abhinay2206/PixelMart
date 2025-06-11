import React from 'react';
import { Gamepad2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Gamepad2 className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">PixelMart</span>
            </div>
            <p className="text-sm mb-4">
              Your ultimate destination for gaming. Discover the latest games, exclusive deals, and join our community of gamers.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@pixelmart.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-sm hover:text-cyan-400 transition-colors">All Games</a></li>
              <li><a href="/products?category=RPG" className="text-sm hover:text-cyan-400 transition-colors">RPG Games</a></li>
              <li><a href="/products?category=FPS" className="text-sm hover:text-cyan-400 transition-colors">FPS Games</a></li>
              <li><a href="/products?category=Sports" className="text-sm hover:text-cyan-400 transition-colors">Sports Games</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-cyan-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm hover:text-cyan-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-cyan-400 transition-colors">Returns</a></li>
              <li><a href="#" className="text-sm hover:text-cyan-400 transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Get the latest gaming news and exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-l-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button className="px-4 py-2 bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-medium rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-sm">© 2024 PixelMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}