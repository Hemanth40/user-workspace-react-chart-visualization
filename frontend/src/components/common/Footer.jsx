import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="relative z-10">
      <div className="bg-glass-200 backdrop-blur-md border-t border-glass-300">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                DesaliSense
              </h3>
              <p className="text-white/80">
                Advanced AI-powered solutions for seawater desalination optimization
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/" 
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/predict" 
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    Prediction
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/visualization" 
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-white/80">
                <li className="hover:text-white transition-colors duration-300">
                  Email: info@desalisense.com
                </li>
                <li className="hover:text-white transition-colors duration-300">
                  Phone: (555) 123-4567
                </li>
                <li className="hover:text-white transition-colors duration-300">
                  Address: 123 Tech Street, Innovation City
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-glass-300 mt-8 pt-8 text-center">
            <p className="text-white/80">&copy; {new Date().getFullYear()} DesaliSense. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
