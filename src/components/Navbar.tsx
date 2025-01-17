import React, { useState } from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'navbar-blur' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="px-4 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className="h-5 md:h-7 transition-transform duration-200 hover:scale-105"
          />
          <div className="hidden md:flex items-center space-x-4">
            {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-sm font-light hover:text-white transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className={`flex items-center transition-all duration-300 ${
              showSearch ? 'bg-black/80 px-2 py-1 rounded' : ''
            }`}>
              <Search 
                className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors"
                onClick={() => setShowSearch(!showSearch)}
              />
              <input
                type="text"
                placeholder="Titles, people, genres"
                className={`bg-transparent border-none outline-none text-sm ml-2 transition-all duration-300 ${
                  showSearch ? 'w-40 opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </div>
          </div>
          
          <div className="relative">
            <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </div>
          
          <div className="relative">
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => setShowProfile(!showProfile)}
            >
              <User className="w-5 h-5" />
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                showProfile ? 'rotate-180' : ''
              }`} />
            </div>
            
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 rounded-md shadow-lg py-2 fade-in">
                {['Account', 'Settings', 'Help Center', 'Sign out'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;