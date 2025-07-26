import React, { useState } from 'react';

const HeroImageH2 = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="mb-4 md:mb-6 -mx-4 md:-mx-8 lg:-mx-16">
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
      </div>

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

export default HeroImageH2;