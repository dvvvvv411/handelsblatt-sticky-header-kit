
import React from 'react';

const ArticleHeader = () => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return <header className="mb-6">
      {/* Kicker Tag */}
      <div className="mb-4">
        <div className="flex items-center">
          <img src="https://resources.handelsblatt.com/hb-frontend/images/h-plus/h-plus.svg" width="28" height="23" alt="H+" className="mr-2" />
          <span className="text-xs font-medium" style={{
          fontSize: '14.4px'
        }}>
            Krypto
          </span>
        </div>
      </div>

      {/* Hauptüberschrift */}
      <h1 className="mb-4 text-2xl md:text-3xl lg:text-4xl xl:text-5xl" style={{
      color: '#000000',
      lineHeight: '1.4',
      fontFamily: '"Guyot Headline", Georgia, "Times New Roman", serif',
      fontWeight: '700'
    }}>Dieses Gesetz sorgt für Goldgräberstimmg</h1>

      {/* Lead Text */}
      <p className="mb-4 text-lg md:text-xl lg:text-2xl" style={{
      color: '#4a5568',
      lineHeight: '1.4',
      fontFamily: '"ClassicGrotesquePro", Arial, sans-serif'
    }}>
        Der Bitcoin-Kurs hat erstmals die Marke von 100.000 Dollar überschritten. 
        Analysten führen dies auf institutionelle Investoren und regulatorische 
        Klarstellungen zurück. Welche Entwicklungen sind für 2025 zu erwarten?
      </p>

      {/* Autor/Datum */}
      <div className="text-base space-y-1" style={{
      color: '#4a5568',
      fontSize: '16px',
      fontWeight: '500'
    }}>
        <div>Astrid Dörner</div>
        <div>{getCurrentDate()}</div>
      </div>
    </header>;
};

export default ArticleHeader;
