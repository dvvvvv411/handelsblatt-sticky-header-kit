
import React from 'react';

const ArticlePaywall = () => {
  return (
    <div className="relative my-8">
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent 0%, white 60%, white 100%)',
          height: '200px'
        }}
      />
      
      {/* Bitloon Advertisement Card - Full Width */}
      <div 
        className="relative z-20 bg-white border rounded-xl"
        style={{
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Column - Logo and Headline */}
          <div className="text-center lg:text-left">
            {/* Bitloon Logo */}
            <div className="mb-6">
              <img 
                src="https://i.imgur.com/Q191f5z.png" 
                alt="Bitloon Logo" 
                className="mx-auto lg:mx-0"
                style={{ width: '160px', height: 'auto', objectFit: 'contain' }}
              />
            </div>
            
            {/* Headline */}
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-guyot-headline" style={{ color: '#1a202c' }}>
              Verdiene bis zu 2.000€ pro Monat mit Bitcoin-Trading
            </h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nutze unsere KI-gestützte Trading-Plattform und profitiere vom Bitcoin-Boom. 
              Keine Vorkenntnisse erforderlich - unser Algorithmus handelt automatisch für dich.
            </p>
          </div>

          {/* Right Column - Statistics, Promo Code, and CTA */}
          <div className="text-center">
            {/* Profit Statistics */}
            <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#f0f8ff' }}>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">+847%</div>
                  <div className="text-sm text-gray-600">Durchschnittlicher Gewinn</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">€1,847</div>
                  <div className="text-sm text-gray-600">Monatliches Einkommen</div>
                </div>
              </div>
            </div>
            
            {/* Promotional Code Section */}
            <div className="mb-6 p-4 border-2 border-dashed border-orange-300 rounded-lg" style={{ backgroundColor: '#fff8f0' }}>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Exklusiver Promo-Code für Handelsblatt-Leser:
              </div>
              <div className="text-2xl font-bold" style={{ color: '#f56500' }}>
                HANDELSBLATT50
              </div>
              <div className="text-sm text-gray-600 mt-1">
                50€ Startbonus + Keine Gebühren im ersten Monat
              </div>
            </div>
            
            {/* Call-to-Action Button */}
            <div className="space-y-3">
              <button 
                className="w-full py-4 px-8 text-white font-semibold text-lg rounded-lg transition-colors duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: '#f56500'
                }}
              >
                Jetzt kostenlos starten
              </button>
              
              <div className="text-sm">
                <span className="text-gray-600">Bereits über </span>
                <span className="font-bold text-green-600">25.000 erfolgreiche Trader</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Risk Disclaimer - Full Width */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Risikohinweis: Trading birgt Verlustrisiken. Vergangene Gewinne sind keine Garantie für zukünftige Ergebnisse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePaywall;
