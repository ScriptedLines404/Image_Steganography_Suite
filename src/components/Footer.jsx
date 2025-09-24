import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold">Steganography Suite</span>
            </div>
            <p className="text-gray-400 max-w-md text-lg">
              Advanced tools for covert data embedding and extraction across multiple image formats with military-grade encryption.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a></li>
              <li><a href="#security" className="text-gray-400 hover:text-white transition-colors duration-200">Security</a></li>
              <li><a href="#techniques" className="text-gray-400 hover:text-white transition-colors duration-200">Techniques</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>support@steganography.com</li>
              <li>+1 (555) 123-4567</li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Steganography Suite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;