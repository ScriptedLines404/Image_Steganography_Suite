import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      title: "Military-Grade Encryption",
      description: "Choose your security level with robust algorithms including AES-256 and custom XOR for encrypted payloads",
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Advanced Embedding Techniques",
      description: "Sophisticated pixel manipulation powered by advanced encoding methods like 3D channel traversal to evade detection and maximize capacity",
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "AI-Resistant Security",
      description: "Powered by advanced encoding techniques designed to bypass automated steganalysis and AI detection",
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const techniques = [
    {
      name: "LSB (Least Significant Bit)",
      description: "Hides data in the least noticeable bits of image pixels",
      howItWorks: "Modifies the least significant bits of each pixel's color values. The human eye can't detect these subtle changes, making the stego-image appear identical to the original.",
      security: "Medium",
      useCase: "Basic text hiding, casual privacy protection"
    },
    {
      name: "XOR Encryption",
      description: "Basic encryption that hides data using XOR operations with a key",
      howItWorks: "Uses XOR operations between the secret data and a key before embedding. Provides basic encryption security and requires the same key for extraction.",
      security: "High",
      useCase: "Medium-security messaging, personal data protection"
    },
    {
      name: "AES Encryption",
      description: "Military-grade encryption combined with steganography",
      howItWorks: "Encrypts data using AES-128/256 before embedding in the image. Combines strong cryptography with steganography for maximum security against detection and decryption.",
      security: "Military",
      useCase: "Sensitive communications, corporate data protection"
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements matching Hero section */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating pixels/particles */}
        <div className="absolute top-1/6 left-1/5 w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float">
          <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-purple-500 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-2/5 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-15 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="relative inline-block mb-4 sm:mb-6">
            <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-50"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white relative">
              <span className="bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent">
                Advanced Features
              </span>
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Cutting-edge technology for secure data hiding in images with military-grade protection
          </p>
        </div>

        {/* Features Grid */}
        <section id="features">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Steganography Techniques Section */}
        <section id="techniques">
          <div className="group relative mb-12 sm:mb-16">
            <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-10 border border-white/10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Steganography Techniques
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 text-center leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
                Choose the right steganography method for your security needs. Each technique offers different levels of protection and functionality.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                {techniques.map((technique, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-gray-900/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white">{technique.name}</h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap w-fit ${
                          technique.security === 'Military' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          technique.security === 'High' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                          'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {technique.security} Security
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{technique.description}</p>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-blue-300 mb-1">How it works:</h4>
                          <p className="text-xs sm:text-sm text-gray-400">{technique.howItWorks}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-purple-300 mb-1">Best for:</h4>
                          <p className="text-xs sm:text-sm text-gray-400">{technique.useCase}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-400 gap-1">
                          <span>Encryption: {technique.security === 'Military' ? 'AES-256' : technique.security === 'High' ? 'XOR' : 'None'}</span>
                          <span>Speed: {technique.security === 'Military' ? 'Slow' : technique.security === 'High' ? 'Medium' : 'Fast'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="group relative">
          <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-white/10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Secure Your Communications?
              </span>
            </h3>
            <p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
              Start using our advanced steganography tools today to protect your sensitive information with military-grade encryption.
            </p>
            <Link to="/tool" className="group relative inline-block overflow-hidden px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-500 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 text-white flex items-center justify-center">
                Try Steganography Tools
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default Features;