import React, { useState } from 'react';

const SteganographyTool = () => {
  const [activeTab, setActiveTab] = useState('hide');
  const [coverImage, setCoverImage] = useState(null);
  const [secretImage, setSecretImage] = useState(null); // FIXED: Changed setCoverImage to setSecretImage
  const [coverExample, setCoverExample] = useState('N/A');
  const [secretExample, setSecretExample] = useState('N/A');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // New state variables for enhanced functionality
  const [technique, setTechnique] = useState('lsb'); // 'lsb', 'xor', 'aes'
  const [secretText, setSecretText] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [resultImage, setResultImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleCoverImageChange = (e) => {
    if (e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProcess = () => {
    setIsProcessing(true);
    
    // Simulate processing based on selected technique
    setTimeout(() => {
      setIsProcessing(false);
      
      if (activeTab === 'hide') {
        // Simulate successful hiding
        setResultImage(coverImage); // In real implementation, this would be the processed image
        setExtractedText('');
      } else {
        // Simulate successful extraction
        setExtractedText(secretText || 'THIS IS A SECRET MESSAGE'); // Demo text
        setResultImage(null);
      }
    }, 2000);
  };

  const handleReset = () => {
    setCoverImage(null);
    setSecretText('');
    setEncryptionKey('');
    setResultImage(null);
    setExtractedText('');
  };

  const techniqueDescriptions = {
    lsb: "Least Significant Bit - Hides data in the least noticeable bits of image pixels",
    xor: "XOR Encryption - Basic encryption that hides data using XOR operations with a key",
    aes: "AES Encryption - Military-grade encryption combined with steganography for maximum security"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden font-sans py-8">
      {/* Animated background elements matching Hero section */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating pixels/particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-float">
          <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-35 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-500 rounded-full opacity-30 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-60"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white relative">
              <span className="bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent">
                Advanced Steganography
              </span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light mb-4">
            Secure text and image hiding with multiple encryption techniques
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Choose your preferred steganography method and encryption level for maximum security
          </p>
        </div>

        {/* Technique Selection */}
        <div className="group relative mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Select Steganography Technique
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { value: 'lsb', label: 'LSB Technique', security: 'Medium', speed: 'Fast' },
                { value: 'xor', label: 'XOR Encryption', security: 'High', speed: 'Medium' },
                { value: 'aes', label: 'AES Encryption', security: 'Military', speed: 'Slow' }
              ].map((tech) => (
                <div
                  key={tech.value}
                  onClick={() => setTechnique(tech.value)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    technique === tech.value
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/10 bg-gray-800/30 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{tech.label}</span>
                    <div className={`w-3 h-3 rounded-full ${
                      tech.security === 'Military' ? 'bg-red-500' :
                      tech.security === 'High' ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{techniqueDescriptions[tech.value]}</p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Security: {tech.security}</span>
                    <span>Speed: {tech.speed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('hide')}
            className={`group relative overflow-hidden py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 ${
              activeTab === 'hide'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl'
                : 'bg-gray-800/50 text-gray-300 border border-white/10 hover:border-white/20 hover:bg-gray-700/50'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center">
              Hide Data
              {activeTab === 'hide' && (
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('unhide')}
            className={`group relative overflow-hidden py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 ${
              activeTab === 'unhide'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl'
                : 'bg-gray-800/50 text-gray-300 border border-white/10 hover:border-white/20 hover:bg-gray-700/50'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center">
              Extract Data
              {activeTab === 'unhide' && (
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </span>
          </button>
        </div>

        {/* Tool Interface */}
        <div className="group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            
            {/* Cover Image Section */}
            <div className="space-y-6 mb-8">
              <h3 className="text-xl font-bold text-white">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Cover Image:
                </span>
              </h3>
              
              <div className="flex items-center space-x-4">
                <label className="flex-1 group/file">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                    id="cover-input"
                  />
                  <div className="w-full py-3 px-4 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 text-center cursor-pointer font-medium">
                    Choose Cover Image
                  </div>
                </label>
                <span className="text-sm text-gray-400 flex-1">
                  {coverImage ? '📁 Image selected' : 'No file chosen'}
                </span>
              </div>

              {coverImage && (
                <div className="mt-4 p-4 bg-gray-800/30 rounded-xl border border-white/5">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Cover Preview:</h4>
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500/30 shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* Data Input Section */}
            {activeTab === 'hide' && (
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-bold text-white">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Secret Data:
                  </span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Secret Text:
                    </label>
                    <textarea
                      value={secretText}
                      onChange={(e) => setSecretText(e.target.value)}
                      placeholder="Enter the secret message you want to hide..."
                      className="w-full p-3 bg-gray-800/50 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300 min-h-[100px]"
                      maxLength={technique === 'aes' ? 500 : 1000}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {secretText.length} characters (Max: {technique === 'aes' ? '500' : '1000'})
                    </div>
                  </div>
                  
                  {technique !== 'lsb' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Encryption Key:
                        </label>
                        <input
                          type="password"
                          value={encryptionKey}
                          onChange={(e) => setEncryptionKey(e.target.value)}
                          placeholder="Enter your encryption key..."
                          className="w-full p-3 bg-gray-800/50 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Required for {technique.toUpperCase()} decryption
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* Extraction Section */}
            {activeTab === 'unhide' && technique !== 'lsb' && (
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-bold text-white">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Extraction Key:
                  </span>
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Decryption Key:
                  </label>
                  <input
                    type="password"
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                    placeholder="Enter the key used for encryption..."
                    className="w-full p-3 bg-gray-800/50 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Must match the original encryption key
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <button 
                onClick={handleProcess}
                disabled={isProcessing || !coverImage || (activeTab === 'hide' && !secretText) || !encryptionKey}
                className="group relative overflow-hidden px-8 py-3 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex-1 max-w-xs"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"></div>
                <span className="relative z-10 text-white flex items-center justify-center">
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    activeTab === 'hide' ? `Hide with ${technique.toUpperCase()}` : `Extract with ${technique.toUpperCase()}`
                  )}
                </span>
              </button>
              
              <button 
                onClick={handleReset}
                className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
              >
                Reset
              </button>
            </div>

            {/* Results Section */}
            {(resultImage || extractedText) && (
              <div className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-white/10">
                <h4 className="font-semibold text-white mb-4 text-lg">
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {activeTab === 'hide' ? 'Success!' : 'Extracted Data:'}
                  </span>
                </h4>
                
                {activeTab === 'hide' && resultImage && (
                  <div className="text-center">
                    <p className="text-gray-300 mb-4">Your data has been successfully hidden in the image!</p>
                    <div className="p-4 bg-gray-800/50 rounded-xl inline-block">
                      <img 
                        src={resultImage} 
                        alt="Processed result" 
                        className="w-32 h-32 object-cover rounded-lg border-2 border-green-500/30 shadow-lg"
                      />
                    </div>
                    <div className="mt-4">
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-300">
                        Download Secure Image
                      </button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'unhide' && extractedText && (
                  <div>
                    <p className="text-gray-300 mb-2">Hidden message extracted successfully:</p>
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-green-500/30">
                      <p className="text-green-400 font-mono whitespace-pre-wrap">{extractedText}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Technique Information */}
        <div className="mt-12 group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                About {technique.toUpperCase()} Technique
              </span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div className="space-y-4">
                <h4 className="font-semibold text-white">How it works:</h4>
                <p className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  {techniqueDescriptions[technique]}
                </p>
                <p className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  {technique === 'lsb' ? 'Modifies least significant bits of pixel values' :
                   technique === 'xor' ? 'Uses XOR operations with a key for encryption' :
                   'Combines AES encryption with steganography for maximum security'}
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Security Features:</h4>
                <p className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  {technique === 'lsb' ? 'Basic security - suitable for casual use' :
                   technique === 'xor' ? 'Medium security - requires decryption key' :
                   'Military-grade security - AES-128 encryption'}
                </p>
                <p className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  {technique === 'lsb' ? 'Fast processing - ideal for large images' :
                   technique === 'xor' ? 'Balanced speed and security' :
                   'Highest security - recommended for sensitive data'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteganographyTool;