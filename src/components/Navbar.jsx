import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom section-padding">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Steganography Suite</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Features
            </a>
            <a href="#security" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Security
            </a>
            <a href="#techniques" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Techniques
            </a>
            <button className="btn-primary">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-gray-600 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-4 pb-4">
            <a href="#features" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Features
            </a>
            <a href="#security" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Security
            </a>
            <a href="#techniques" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Techniques
            </a>
            <button className="btn-primary w-full">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar