
import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const HeroImage = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="mb-6 -mx-16">
      {/* Image Container */}
      <div 
        className="relative mx-auto overflow-hidden cursor-pointer"
        style={{ 
          maxWidth: '900px',
          aspectRatio: '3/2',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src="https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=533&fit=crop"
          alt="Bitcoin und Kryptowährungen"
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Zoom Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full transition-opacity duration-200 hover:opacity-80"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
          title="Vergrößern"
        >
          <Copy 
            size={20} 
            className="text-white"
          />
        </button>
      </div>

      {/* Caption */}
      <p 
        className="mt-3 text-sm italic text-center mx-16"
        style={{ 
          color: '#718096',
          fontSize: '14px'
        }}
      >
        Bitcoin und andere Kryptowährungen erleben einen beispiellosen Aufschwung. 
        Quelle: Getty Images
      </p>
    </div>
  );
};

export default HeroImage;
