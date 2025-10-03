import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating pixels/particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-float">
          <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-35 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-500 rounded-full opacity-30 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Main Title with dynamic sizing */}
          <div className="relative mb-4 md:mb-6">
            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-60"></div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight sm:leading-none tracking-tight">
              <span className="block bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent">
                IMAGE
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-white bg-clip-text text-transparent mt-1 sm:mt-2 md:mt-3 lg:mt-4">
                STEGANOGRAPHY
              </span>
            </h1>
          </div>
          
          {/* Subtitle with dynamic sizing */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto font-light">
            Your secrets, hidden in pixels — send invisible, encrypted messages inside ordinary images, safe from prying eyes
          </p>
          
          {/* Separator */}
          <div className="relative mb-6 sm:mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Tagline with dynamic sizing */}
          <div className="relative mb-8 sm:mb-10">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Encrypt · Embed · Disappear
              </span>
            </div>
            
            {/* Animated encryption dots */}
            <div className="flex justify-center space-x-2 sm:space-x-3">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${dot * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Single CTA Button with dynamic sizing */}
          <div className="flex justify-center relative mt-6 sm:mt-8">
            <Link 
              to="/tool" 
              className="group relative overflow-hidden px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl transition-all duration-500 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 text-white flex items-center justify-center">
                Start Encrypting
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2 sm:ml-3 md:ml-4 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 border-2 border-blue-400/30 rounded-xl sm:rounded-2xl transform scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;