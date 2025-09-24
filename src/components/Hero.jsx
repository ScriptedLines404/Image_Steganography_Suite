import React from 'react'

const Hero = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            IMAGE STEGANOGRAPHY
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Your secrets, hidden in pixels - send invisible, encrypted messages inside ordinary images, safe from prying eyes
          </p>
          <div className="text-2xl md:text-3xl font-semibold text-primary-600 mb-10">
            Encrypt.Embed.Disappear
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Secure Steganography Suite
            </h2>
            <p className="text-gray-700 text-lg">
              Advanced tools for covert data embedding and extraction across multiple image formats
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary text-lg py-3 px-6">
              Start Encrypting
            </button>
            <button className="btn-secondary text-lg py-3 px-6">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero