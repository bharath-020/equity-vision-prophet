
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block text-xl font-semibold tracking-tight mb-4">
              <span className="text-primary">Equity</span>
              <span className="font-light">Vision</span>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Advanced stock market analysis and prediction platform. Get insights, trends, and forecasts to make informed investment decisions.
            </p>
            
            <div className="flex space-x-4">
              <SocialLink icon={<Twitter size={18} />} href="#" label="Twitter" />
              <SocialLink icon={<Linkedin size={18} />} href="#" label="LinkedIn" />
              <SocialLink icon={<Github size={18} />} href="#" label="GitHub" />
              <SocialLink icon={<Mail size={18} />} href="#" label="Email" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Features
            </h3>
            <ul className="space-y-3">
              <FooterLink label="Market Analysis" />
              <FooterLink label="Stock Predictions" />
              <FooterLink label="Portfolio Tracking" />
              <FooterLink label="Financial News" />
              <FooterLink label="API Access" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <FooterLink label="About Us" />
              <FooterLink label="Careers" />
              <FooterLink label="Blog" />
              <FooterLink label="Press" />
              <FooterLink label="Contact" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <FooterLink label="Documentation" />
              <FooterLink label="Help Center" />
              <FooterLink label="Community" />
              <FooterLink label="Learning Center" />
              <FooterLink label="Pricing" />
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} EquityVision. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ label }: { label: string }) => {
  return (
    <li>
      <Link 
        to="/" 
        className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors flex items-center group"
      >
        <ChevronRight size={16} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
        {label}
      </Link>
    </li>
  );
};

const SocialLink = ({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) => {
  return (
    <a 
      href={href} 
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors duration-200"
    >
      {icon}
    </a>
  );
};

export default Footer;
