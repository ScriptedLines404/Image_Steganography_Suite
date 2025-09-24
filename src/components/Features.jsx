import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      title: "Military-Grade Encryption",
      description: "Choose your security level with robust algorithms including AES-256 and custom XOR for encrypted payloads",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Advanced Embedding Techniques",
      description: "Sophisticated pixel manipulation powered by advanced encoding methods like 3D channel traversal to evade detection and maximize capacity",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "AI-Resistant Security",
      description: "Powered by advanced encoding techniques designed to bypass automated steganalysis and AI detection",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Advanced Steganography Features
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our suite offers cutting-edge technology for secure data hiding in images
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to secure your communications?
          </h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
            Start using our advanced steganography tools today to protect your sensitive information.
          </p>
          <Link to="/tool" className="btn-primary inline-block">
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;