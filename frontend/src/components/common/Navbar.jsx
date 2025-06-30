import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
<nav className="fixed w-full z-50 bg-glass-200 backdrop-blur-md border-b border-glass-300 rounded-xl shadow-lg px-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            DesaliSense
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-primary-300 transition-colors duration-300"
            >
              Home
            </Link>
            <Link 
              to="/predict" 
              className="text-white hover:text-primary-300 transition-colors duration-300"
            >
              Prediction
            </Link>
            <Link 
              to="/visualization" 
              className="text-white hover:text-primary-300 transition-colors duration-300"
            >
              Visualization
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-primary-300 transition-colors duration-300"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-primary-300 transition-colors duration-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-glass-300 backdrop-blur-md rounded-lg mt-2 p-4 animate-gradient">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-primary-300 transition-colors duration-300"
              >
                Home
              </Link>
              <Link 
                to="/predict" 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-primary-300 transition-colors duration-300"
              >
                Prediction
              </Link>
              <Link 
                to="/visualization" 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-primary-300 transition-colors duration-300"
              >
                Visualization
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-primary-300 transition-colors duration-300"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
