import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-sm border-t border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-600 text-sm mb-2 md:mb-0">
            Copyright © 2025{' '}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              SKCET
            </a>
            . All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-800 text-sm hover:underline"
            >
              Terms & Conditions
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-800 text-sm hover:underline"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-800 text-sm hover:underline"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;