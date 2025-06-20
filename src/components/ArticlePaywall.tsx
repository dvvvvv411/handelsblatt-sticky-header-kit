
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
      
      {/* Bitloon Advertisement Card - Handelsblatt Style */}
      <div 
        className="relative z-20 bg-white border-2 rounded-none shadow-sm"
        style={{
          padding: '32px',
          borderColor: '#e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        {/* Sponsored Label */}
        <div className="mb-6">
          <span 
            className="text-xs font-druk-web tracking-wider px-3 py-1 rounded-sm"
            style={{ 
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              fontSize: '11px'
            }}
          >
            ANZEIGE
          </span>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Logo and Content */}
          <div className="space-y-6">
            {/* Bitloon Logo */}
            <div>
              <img 
                src="https://i.imgur.com/Q191f5z.png" 
                alt="Bitloon Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            
            {/* Headline - Handelsblatt Style */}
            <h3 className="font-guyot-headline text-2xl lg:text-3xl font-bold leading-tight" style={{ color: '#1e293b' }}>
              Verdiene bis zu 2.000€ pro Monat mit Bitcoin-Trading
            </h3>
            
            <p className="font-classic-grotesque text-base leading-relaxed" style={{ color: '#475569' }}>
              Nutze unsere KI-gestützte Trading-Plattform und profitiere vom Bitcoin-Boom. 
              Keine Vorkenntnisse erforderlich – unser Algorithmus handelt automatisch für dich.
            </p>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-classic-grotesque" style={{ color: '#64748b' }}>Reguliert & Sicher</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-classic-grotesque" style={{ color: '#64748b' }}>25.000+ Nutzer</span>
              </div>
            </div>
          </div>

          {/* Right Column - Statistics and CTA */}
          <div className="space-y-6">
            {/* Performance Metrics - Clean Design */}
            <div className="border rounded-sm p-6" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="font-druk-normal text-3xl font-bold text-green-600 mb-1">+847%</div>
                  <div className="font-classic-grotesque text-sm" style={{ color: '#64748b' }}>Durchschnittlicher Gewinn</div>
                </div>
                <div>
                  <div className="font-druk-normal text-3xl font-bold text-green-600 mb-1">€1,847</div>
                  <div className="font-classic-grotesque text-sm" style={{ color: '#64748b' }}>Monatliches Einkommen</div>
                </div>
              </div>
            </div>
            
            {/* Promo Code - Handelsblatt Orange */}
            <div 
              className="border-2 border-dashed rounded-sm p-4 text-center"
              style={{ 
                borderColor: '#f97316',
                backgroundColor: '#fff7ed'
              }}
            >
              <div className="font-classic-grotesque text-sm font-medium mb-2" style={{ color: '#9a3412' }}>
                Exklusiver Code für Handelsblatt-Leser:
              </div>
              <div className="font-druk-web text-xl font-bold mb-1" style={{ color: '#f97316' }}>
                HANDELSBLATT50
              </div>
              <div className="font-classic-grotesque text-xs" style={{ color: '#9a3412' }}>
                50€ Startbonus + Keine Gebühren im ersten Monat
              </div>
            </div>
            
            {/* CTA Button - Handelsblatt Style */}
            <div className="space-y-3">
              <button 
                className="w-full font-druk-normal text-white font-semibold text-base py-4 px-6 rounded-sm transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: '#1e293b'
                }}
              >
                JETZT KOSTENLOS STARTEN
              </button>
              
              <div className="text-center font-classic-grotesque text-sm">
                <span style={{ color: '#64748b' }}>Bereits über </span>
                <span className="font-semibold text-green-600">25.000 erfolgreiche Trader</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Risk Disclaimer */}
        <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: '#e2e8f0' }}>
          <p className="font-classic-grotesque text-xs" style={{ color: '#94a3b8' }}>
            Risikohinweis: Trading birgt Verlustrisiken. Vergangene Gewinne sind keine Garantie für zukünftige Ergebnisse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePaywall;
