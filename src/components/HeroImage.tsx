
import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const HeroImage = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="mb-4 md:mb-6 -mx-4 md:-mx-8 lg:-mx-16">
      {/* Image Container - Mobile Responsive */}
      <div 
        className="relative mx-auto overflow-hidden cursor-pointer"
        style={{ 
          maxWidth: '900px',
          aspectRatio: '16/10',
          borderRadius: '4px',
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
          loading="lazy"
        />
        
        {/* Zoom Button - Mobile Touch Friendly */}
        <button
          className="absolute top-2 md:top-4 right-2 md:right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-80"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
          title="Vergrößern"
          aria-label="Bild vergrößern"
        >
          <Copy 
            size={20} 
            className="text-white"
          />
        </button>
      </div>

      {/* Caption - Mobile Responsive */}
      <p 
        className="mt-2 md:mt-3 text-xs md:text-sm italic text-center mx-4 md:mx-8 lg:mx-16 leading-relaxed"
        style={{ 
          color: '#718096'
        }}
      >
        Bitcoin und andere Kryptowährungen erleben einen beispiellosen Aufschwung. 
        Quelle: Getty Images
      </p>
    </div>
  );
};

export default HeroImage;
