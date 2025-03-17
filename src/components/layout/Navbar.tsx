
import { useState, useEffect } from 'react';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-xl font-semibold tracking-tight transition-opacity duration-200 hover:opacity-80"
            >
              <span className="text-primary">Equity</span>
              <span className="font-light">Vision</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavItem label="Markets" />
            <NavItem label="Stocks" />
            <NavItem label="Analysis" />
            <NavItem label="Predictions" />
            <NavItem label="News" />
          </nav>
          
          <div className="hidden md:flex items-center space-x-6">
            <button
              aria-label="Search"
              className="p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Search size={20} />
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 hover:bg-primary/90 active:scale-95">
              Sign In
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-md p-2 text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden origin-top absolute w-full left-0 transition-all duration-300 ease-out-expo ${
          isMenuOpen
            ? 'opacity-100 scale-y-100 translate-y-0'
            : 'opacity-0 scale-y-95 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="glass px-4 py-6 space-y-4 shadow-lg mx-4 mt-2 rounded-xl border border-gray-100 dark:border-gray-800">
          <nav className="flex flex-col space-y-4">
            <MobileNavItem label="Markets" />
            <MobileNavItem label="Stocks" />
            <MobileNavItem label="Analysis" />
            <MobileNavItem label="Predictions" />
            <MobileNavItem label="News" />
          </nav>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-4">
            <button className="flex items-center justify-center w-full text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors p-2 rounded-lg">
              <Search className="mr-2" size={18} />
              <span>Search</span>
            </button>
            <button className="w-full bg-primary text-white px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-primary/90 active:scale-95">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ label }: { label: string }) => {
  return (
    <div className="relative group">
      <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors flex items-center">
        {label}
        <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
      </button>
      <div className="absolute left-0 w-48 mt-2 origin-top-left bg-white dark:bg-gray-900 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 glass">
        <div className="py-1">
          <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
            Overview
          </Link>
          <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
            Popular {label}
          </Link>
          <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
            Recent {label}
          </Link>
        </div>
      </div>
    </div>
  );
};

const MobileNavItem = ({ label }: { label: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors text-base font-medium"
      >
        {label}
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <div 
        className={`mt-1 ml-4 pl-2 border-l border-gray-100 dark:border-gray-800 space-y-1 transition-all duration-200 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <Link to="/" className="block py-2 text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
          Overview
        </Link>
        <Link to="/" className="block py-2 text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
          Popular {label}
        </Link>
        <Link to="/" className="block py-2 text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
          Recent {label}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
