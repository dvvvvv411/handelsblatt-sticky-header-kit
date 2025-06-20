
import React, { useState, useEffect } from 'react';
import { Menu, Search, User } from 'lucide-react';

const HandelsblattHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky-enabled sticky top-0 w-full bg-white border-b border-gray-300 z-[1000] transition-shadow duration-200 ${
        isScrolled ? 'shadow-md' : ''
      }`}
      style={{ 
        height: '60px',
        boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sticky-container flex justify-between items-center h-full relative">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          {/* Burger Menu */}
          <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded transition-colors duration-200">
            <Menu size={24} className="text-gray-700" />
            <span className="text-gray-700 font-medium hidden md:inline">Menü</span>
          </button>
          
          {/* Search Button */}
          <button className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded transition-colors duration-200">
            <Search size={24} className="text-gray-700" />
          </button>
        </div>

        {/* LOGO (ZENTRAL) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <a 
            href="/" 
            className="text-blue-900 font-bold tracking-wider hover:opacity-80 transition-opacity duration-200"
            style={{ 
              color: '#1a365d',
              width: '180px',
              fontSize: '20px'
            }}
          >
            <span className="hidden md:inline" style={{ width: '180px', display: 'inline-block', textAlign: 'center' }}>
              HANDELSBLATT
            </span>
            <span className="md:hidden" style={{ width: '120px', display: 'inline-block', textAlign: 'center', fontSize: '16px' }}>
              HANDELSBLATT
            </span>
          </a>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {/* Profile Link */}
          <a 
            href="/login" 
            className="flex items-center gap-2 hover:bg-slate-100 p-2 rounded transition-colors duration-200"
          >
            <User size={24} className="text-gray-700" />
            <span className="text-gray-700 font-medium hidden md:inline">Anmelden</span>
          </a>
          
          {/* Abo Button */}
          <button 
            className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 transition-colors duration-200"
            style={{ 
              backgroundColor: '#e53e3e',
              padding: '8px 16px'
            }}
          >
            Abo
          </button>
        </div>
      </div>
    </header>
  );
};

export default HandelsblattHeader;
