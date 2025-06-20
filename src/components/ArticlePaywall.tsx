
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
      
      {/* Bitloon Advertisement Card */}
      <div 
        className="relative z-20 bg-white border rounded-xl text-center mx-auto"
        style={{
          padding: '40px',
          borderRadius: '12px',
          maxWidth: '500px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        {/* Bitloon Logo */}
        <div className="mb-6">
          <img 
            src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=120&h=40&fit=crop&crop=center" 
            alt="Bitloon Logo" 
            className="mx-auto"
            style={{ width: '120px', height: '40px', objectFit: 'contain' }}
          />
        </div>
        
        {/* Headline */}
        <h3 className="text-2xl font-bold mb-6 font-guyot-headline" style={{ color: '#1a202c' }}>
          Verdiene bis zu 2.000€ pro Monat mit Bitcoin-Trading
        </h3>
        
        {/* Profit Statistics */}
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#f0f8ff' }}>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">+847%</div>
              <div className="text-sm text-gray-600">Durchschnittlicher Gewinn</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">€1,847</div>
              <div className="text-sm text-gray-600">Monatliches Einkommen</div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Nutze unsere KI-gestützte Trading-Plattform und profitiere vom Bitcoin-Boom. 
          Keine Vorkenntnisse erforderlich - unser Algorithmus handelt automatisch für dich.
        </p>
        
        {/* Promotional Code Section */}
        <div className="mb-6 p-4 border-2 border-dashed border-orange-300 rounded-lg" style={{ backgroundColor: '#fff8f0' }}>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Exklusiver Promo-Code für Handelsblatt-Leser:
          </div>
          <div className="text-xl font-bold" style={{ color: '#f56500' }}>
            HANDELSBLATT50
          </div>
          <div className="text-sm text-gray-600 mt-1">
            50€ Startbonus + Keine Gebühren im ersten Monat
          </div>
        </div>
        
        {/* Call-to-Action Button */}
        <div className="space-y-3">
          <button 
            className="w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors duration-200 hover:opacity-90"
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
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Risikohinweis: Trading birgt Verlustrisiken. Vergangene Gewinne sind keine Garantie für zukünftige Ergebnisse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePaywall;
