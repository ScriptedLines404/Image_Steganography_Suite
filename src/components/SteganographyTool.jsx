import React, { useState } from 'react';

const SteganographyTool = () => {
  const [activeTab, setActiveTab] = useState('hide');
  const [coverImage, setCoverImage] = useState(null);
  const [secretImage, setSecretImage] = useState(null);
  const [coverExample, setCoverExample] = useState('N/A');
  const [secretExample, setSecretExample] = useState('N/A');

  const handleCoverImageChange = (e) => {
    if (e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSecretImageChange = (e) => {
    if (e.target.files[0]) {
      setSecretImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Image Steganography
          </h1>
          <div className="flex justify-center space-x-8 mb-6">
            <button className="text-lg font-medium text-primary-600 hover:text-primary-700 border-b-2 border-primary-600 pb-1">
              How it works
            </button>
            <button className="text-lg font-medium text-gray-600 hover:text-gray-900 pb-1">
              How to defeat it
            </button>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Hide images inside other images.
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            This is a client-side Javascript tool to steganographically hide images inside the lower "bits" of other images.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-gray-700 text-center">
            Select either "Hide image" or "Unhide image". Play with the <strong>example</strong> images (all 200x200 px) to get a feel for it.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('hide')}
            className={`py-3 px-6 rounded-lg font-medium text-lg transition-colors duration-200 ${
              activeTab === 'hide'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Hide image
          </button>
          <button
            onClick={() => setActiveTab('unhide')}
            className={`py-3 px-6 rounded-lg font-medium text-lg transition-colors duration-200 ${
              activeTab === 'unhide'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Unhide image
          </button>
        </div>

        {/* Tool Interface */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cover Image Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Cover image:</h3>
              
              <div className="flex items-center space-x-4">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                    id="cover-input"
                  />
                  <div className="btn-secondary w-full text-center cursor-pointer">
                    Choose File
                  </div>
                </label>
                <span className="text-sm text-gray-500 flex-1">
                  {coverImage ? 'File selected' : 'No file chosen'}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Example:</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={coverExample}
                  onChange={(e) => setCoverExample(e.target.value)}
                >
                  <option value="N/A">N/A</option>
                  <option value="example1.jpg">Example 1</option>
                  <option value="example2.jpg">Example 2</option>
                  <option value="example3.jpg">Example 3</option>
                </select>
              </div>

              {coverImage && (
                <div className="mt-4">
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Secret Image Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {activeTab === 'hide' ? 'Secret image:' : 'Stegano image:'}
              </h3>
              
              <div className="flex items-center space-x-4">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSecretImageChange}
                    className="hidden"
                    id="secret-input"
                  />
                  <div className="btn-secondary w-full text-center cursor-pointer">
                    Choose File
                  </div>
                </label>
                <span className="text-sm text-gray-500 flex-1">
                  {secretImage ? 'File selected' : 'No file chosen'}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Example:</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={secretExample}
                  onChange={(e) => setSecretExample(e.target.value)}
                >
                  <option value="N/A">N/A</option>
                  <option value="example1.jpg">Example 1</option>
                  <option value="example2.jpg">Example 2</option>
                  <option value="example3.jpg">Example 3</option>
                </select>
              </div>

              {secretImage && (
                <div className="mt-4">
                  <img 
                    src={secretImage} 
                    alt="Secret preview" 
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Process Button */}
          <div className="mt-8 text-center">
            <button className="btn-primary px-8 py-3 text-lg">
              {activeTab === 'hide' ? 'Hide Image' : 'Unhide Image'}
            </button>
          </div>

          {/* Result Section */}
          {(coverImage || secretImage) && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Result:</h4>
              <div className="text-center text-gray-600">
                {activeTab === 'hide' 
                  ? 'Click "Hide Image" to create your steganographic image'
                  : 'Click "Unhide Image" to extract the hidden image'
                }
              </div>
            </div>
          )}
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">How it works:</h3>
          <div className="space-y-3 text-gray-700">
            <p>• Each pixel's color values are represented by 8 bits (0-255)</p>
            <p>• We replace the least significant bits with bits from the secret image</p>
            <p>• The human eye can't detect these subtle changes</p>
            <p>• The result looks identical to the original cover image</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteganographyTool;