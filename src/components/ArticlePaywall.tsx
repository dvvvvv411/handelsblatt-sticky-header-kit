
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
        className="relative z-20 bg-white border border-gray-200 rounded-lg mx-auto overflow-hidden shadow-sm"
        style={{
          maxWidth: '900px'
        }}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Column - Bitloon Promotional Content */}
          <div 
            className="p-8 relative overflow-hidden bg-gray-900"
          >
            {/* Subtle background pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #f97316 0%, transparent 50%), 
                                 radial-gradient(circle at 75% 75%, #ea580c 0%, transparent 50%)`
              }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Bitloon Logo */}
              <div className="mb-6">
                <img 
                  src="https://i.imgur.com/Q191f5z.png" 
                  alt="Bitloon Logo" 
                  className="h-8 w-auto"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              
              {/* Headline - Using Handelsblatt font */}
              <h3 className="text-xl font-bold mb-4 text-white font-guyot-headline leading-tight">
                Verdiene bis zu 2.000€ pro Monat mit Bitcoin-Trading
              </h3>
              
              {/* Profit Statistics */}
              <div className="mb-6 p-4 rounded border border-gray-700 bg-gray-800/50">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-orange-400">+847%</div>
                    <div className="text-xs text-gray-400 font-classic-grotesque">Durchschnittlicher Gewinn</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-orange-400">€1,847</div>
                    <div className="text-xs text-gray-400 font-classic-grotesque">Monatliches Einkommen</div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed text-sm font-classic-grotesque">
                Nutze unsere KI-gestützte Trading-Plattform und profitiere vom Bitcoin-Boom. 
                Keine Vorkenntnisse erforderlich.
              </p>
              
              {/* Promotional Code Section */}
              <div className="mb-6 p-3 border border-dashed border-orange-500/30 rounded bg-orange-500/10">
                <div className="text-xs font-medium text-orange-300 mb-1 font-druk-normal">
                  EXKLUSIVER PROMO-CODE:
                </div>
                <div className="text-lg font-bold text-orange-400 font-druk-normal">
                  HANDELSBLATT50
                </div>
                <div className="text-xs text-gray-300 mt-1 font-classic-grotesque">
                  50€ Startbonus + Keine Gebühren
                </div>
              </div>
              
              {/* Call-to-Action Button - Handelsblatt style */}
              <button 
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded transition-colors duration-200 font-druk-normal text-sm"
              >
                JETZT KOSTENLOS STARTEN
              </button>
            </div>
          </div>
          
          {/* Right Column - Handelsblatt Reviews */}
          <div className="p-8 bg-gray-50">
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3 font-druk-normal">
                WAS UNSERE LESER SAGEN
              </h4>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
                <span className="text-xs text-gray-600 ml-2 font-classic-grotesque">4.8/5 (2.847 Bewertungen)</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-3 border-l-orange-500 shadow-sm">
                <p className="text-sm text-gray-700 mb-2 italic font-classic-grotesque">
                  "Dank Bitloon konnte ich mein Portfolio um 340% steigern. 
                  Die Plattform ist sehr benutzerfreundlich."
                </p>
                <div className="text-xs text-gray-500 font-druk-normal">
                  <strong>MICHAEL K.</strong>, Handelsblatt Premium-Abonnent
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border-l-3 border-l-gray-600 shadow-sm">
                <p className="text-sm text-gray-700 mb-2 italic font-classic-grotesque">
                  "Endlich eine seriöse Trading-Plattform. Bin seit 8 Monaten dabei 
                  und sehr zufrieden mit den Ergebnissen."
                </p>
                <div className="text-xs text-gray-500 font-druk-normal">
                  <strong>SANDRA M.</strong>, Handelsblatt Digital-Leserin
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border-l-3 border-l-orange-600 shadow-sm">
                <p className="text-sm text-gray-700 mb-2 italic font-classic-grotesque">
                  "Die KI-Funktionen sind beeindruckend. Habe bereits 
                  mehrere erfolgreiche Trades automatisch abgeschlossen."
                </p>
                <div className="text-xs text-gray-500 font-druk-normal">
                  <strong>THOMAS R.</strong>, Handelsblatt Investor
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-center font-classic-grotesque">
                <span className="text-gray-600">Bereits über </span>
                <span className="font-bold text-orange-600">25.000 erfolgreiche Trader</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Risk Warning Footer */}
        <div className="px-8 py-3 bg-gray-100 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center font-classic-grotesque">
            Risikohinweis: Trading birgt Verlustrisiken. Vergangene Gewinne sind keine Garantie für zukünftige Ergebnisse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePaywall;
