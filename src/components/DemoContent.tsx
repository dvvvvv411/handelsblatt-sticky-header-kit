
import React from 'react';

const DemoContent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Content to test scrolling */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <article className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Handelsblatt Header Demo
          </h1>
          <p className="text-gray-600 mb-6">
            Scrollen Sie nach unten, um den Sticky-Header-Effekt mit Schatten zu sehen.
          </p>
          
          <div className="space-y-6">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Artikel {i + 1}: Wirtschaftsnachrichten
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                  velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default DemoContent;
