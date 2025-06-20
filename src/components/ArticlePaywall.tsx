
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
        className="relative z-20 bg-white border rounded-xl mx-auto overflow-hidden"
        style={{
          borderRadius: '16px',
          maxWidth: '900px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Column - Bitloon Promotional Content */}
          <div 
            className="p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a365d 0%, #2d3748 50%, #1a202c 100%)'
            }}
          >
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #f56500 0%, transparent 50%), 
                                 radial-gradient(circle at 75% 75%, #ed8936 0%, transparent 50%)`
              }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Bitloon Logo */}
              <div className="mb-6">
                <img 
                  src="https://i.imgur.com/Q191f5z.png" 
                  alt="Bitloon Logo" 
                  className="h-10 w-auto"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              
              {/* Headline */}
              <h3 className="text-2xl font-bold mb-4 text-white font-guyot-headline leading-tight">
                Verdiene bis zu 2.000€ pro Monat mit Bitcoin-Trading
              </h3>
              
              {/* Profit Statistics */}
              <div className="mb-6 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">+847%</div>
                    <div className="text-sm text-gray-300">Durchschnittlicher Gewinn</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">€1,847</div>
                    <div className="text-sm text-gray-300">Monatliches Einkommen</div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                Nutze unsere KI-gestützte Trading-Plattform und profitiere vom Bitcoin-Boom. 
                Keine Vorkenntnisse erforderlich.
              </p>
              
              {/* Promotional Code Section */}
              <div className="mb-6 p-4 border-2 border-dashed border-orange-400/50 rounded-lg bg-orange-500/10">
                <div className="text-sm font-medium text-orange-300 mb-2">
                  Exklusiver Promo-Code:
                </div>
                <div className="text-xl font-bold text-orange-400">
                  HANDELSBLATT50
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  50€ Startbonus + Keine Gebühren
                </div>
              </div>
              
              {/* Call-to-Action Button */}
              <button 
                className="w-full py-3 px-6 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#f56500',
                  background: 'linear-gradient(135deg, #f56500 0%, #ed8936 100%)'
                }}
              >
                Jetzt kostenlos starten
              </button>
            </div>
          </div>
          
          {/* Right Column - Handelsblatt Reviews */}
          <div className="p-8 bg-gray-50">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-gray-800 mb-2 font-druk-normal">
                Was unsere Leser sagen
              </h4>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-2">4.8/5 (2,847 Bewertungen)</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-gray-700 mb-2 italic">
                  "Dank Bitloon konnte ich mein Portfolio um 340% steigern. 
                  Die Plattform ist sehr benutzerfreundlich."
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Michael K.</strong>, Handelsblatt Premium-Abonnent
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-700 mb-2 italic">
                  "Endlich eine seriöse Trading-Plattform. Bin seit 8 Monaten dabei 
                  und sehr zufrieden mit den Ergebnissen."
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Sandra M.</strong>, Handelsblatt Digital-Leserin
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                <p className="text-sm text-gray-700 mb-2 italic">
                  "Die KI-Funktionen sind beeindruckend. Habe bereits 
                  mehrere erfolgreiche Trades automatisch abgeschlossen."
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Thomas R.</strong>, Handelsblatt Investor
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-center">
                <span className="text-gray-600">Bereits über </span>
                <span className="font-bold text-green-600">25.000 erfolgreiche Trader</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Risk Warning Footer */}
        <div className="px-8 py-4 bg-gray-100 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Risikohinweis: Trading birgt Verlustrisiken. Vergangene Gewinne sind keine Garantie für zukünftige Ergebnisse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePaywall;
