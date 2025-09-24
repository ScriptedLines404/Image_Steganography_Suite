import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            IMAGE STEGANOGRAPHY
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Your secrets, hidden in pixels - send invisible, encrypted messages inside ordinary images, safe from prying eyes
          </p>
          
          {/* Tagline */}
          <div className="text-2xl md:text-3xl font-semibold text-primary-600 mb-10">
            Encrypt.Embed.Disappear
          </div>
          
          {/* Feature Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-12 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Secure Steganography Suite
            </h2>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              Advanced tools for covert data embedding and extraction across multiple image formats
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Link to="/tool" className="btn-primary text-center">
              Start Encrypting
            </Link>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;