import React, { useState } from 'react';
import { Search, Upload, User, Home, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="glass-effect sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PlayCircle className="w-8 h-8 text-neon-blue" />
            <span className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              NeonFlix
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-neon-blue transition-colors">
              <Home className="w-5 h-5" />
            </Link>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-dark-surface border border-dark-border rounded-full px-4 py-2 pl-10 focus:outline-none focus:border-neon-blue transition-colors"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            <Link to="/upload" className="hover:text-neon-purple transition-colors">
              <Upload className="w-5 h-5" />
            </Link>

            <Link to="/profile" className="hover:text-neon-blue transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
