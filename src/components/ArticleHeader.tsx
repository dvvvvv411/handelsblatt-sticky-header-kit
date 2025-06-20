
import React from 'react';

const ArticleHeader = () => {
  return (
    <header className="mb-6">
      {/* Kicker Tag */}
      <div className="mb-4">
        <div className="flex items-center">
          <img 
            src="https://resources.handelsblatt.com/hb-frontend/images/h-plus/h-plus.svg" 
            width="23" 
            height="19" 
            alt="H+" 
            className="mr-2"
          />
          <span 
            className="text-xs font-medium"
            style={{ 
              fontSize: '12px'
            }}
          >
            Krypto
          </span>
        </div>
      </div>

      {/* Hauptüberschrift */}
      <h1 
        className="font-guyot-headline mb-4 text-2xl md:text-3xl"
        style={{ 
          color: '#1a202c',
          lineHeight: '1.2',
          fontSize: 'clamp(36px, 6vw, 48px)',
          fontWeight: '800'
        }}
      >
        Bitcoin erreicht neues Allzeithoch: Experten sehen weiteres Wachstumspotenzial
      </h1>

      {/* Lead Text */}
      <p 
        className="mb-4 text-lg"
        style={{ 
          color: '#4a5568',
          fontSize: '27px',
          lineHeight: '1.4'
        }}
      >
        Der Bitcoin-Kurs hat erstmals die Marke von 100.000 Dollar überschritten. 
        Analysten führen dies auf institutionelle Investoren und regulatorische 
        Klarstellungen zurück. Welche Entwicklungen sind für 2025 zu erwarten?
      </p>

      {/* Autor/Datum */}
      <div 
        className="text-sm"
        style={{ 
          color: '#718096',
          fontSize: '14px'
        }}
      >
        Von Astrid Dörner - 18.06.2025 - 11:47 Uhr
      </div>
    </header>
  );
};

export default ArticleHeader;
