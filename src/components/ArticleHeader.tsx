
import React from 'react';

interface ArticleHeaderProps {
  useCurrentDate?: boolean;
  publicationDate?: string | null;
}

const ArticleHeader = ({ useCurrentDate = true, publicationDate }: ArticleHeaderProps) => {
  const getDisplayDate = () => {
    if (useCurrentDate) {
      const today = new Date();
      return today.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } else if (publicationDate) {
      const date = new Date(publicationDate);
      return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } else {
      // Fallback to current date if no publication date is provided
      const today = new Date();
      return today.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  };

  return (
    <header className="mb-6">
      {/* Kicker Tag */}
      <div className="mb-4">
        <div className="flex items-center">
          <img src="https://resources.handelsblatt.com/hb-frontend/images/h-plus/h-plus.svg" width="28" height="23" alt="H+" className="mr-2" />
          <span className="text-sm md:text-base font-medium">
            Krypto
          </span>
        </div>
      </div>

      {/* Hauptüberschrift - Mobile Responsive mit größerer Schrift */}
      <h1 className="mb-4 text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight" style={{
        color: '#000000',
        lineHeight: '1.3',
        fontFamily: '"Guyot Headline", Georgia, "Times New Roman", serif',
        fontWeight: '700'
      }}>
        Dieses Gesetz sorgt für Goldgräberstimmung
      </h1>

      {/* Lead Text - Mobile Responsive mit größerer Schrift */}
      <p className="mb-4 text-lg sm:text-xl md:text-xl lg:text-2xl leading-relaxed" style={{
        color: '#4a5568',
        lineHeight: '1.5',
        fontFamily: '"ClassicGrotesquePro", Arial, sans-serif'
      }}>
        Der Bitcoin-Kurs hat erstmals die Marke von 100.000 Dollar überschritten. 
        Analysten führen dies auf institutionelle Investoren und regulatorische 
        Klarstellungen zurück. Welche Entwicklungen sind für 2025 zu erwarten?
      </p>

      {/* Autor/Datum - Mobile Optimized */}
      <div className="text-sm md:text-base space-y-1" style={{
        color: '#4a5568',
        fontWeight: '500'
      }}>
        <div>Astrid Dörner</div>
        <div>{getDisplayDate()}</div>
      </div>

      {/* Artikel anhören Button - Mobile Touch Friendly */}
      <div className="mt-4 flex items-center">
        <button 
          className="flex items-center justify-center min-w-[44px] min-h-[44px] mr-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors" 
          disabled
          aria-label="Artikel anhören"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" className="text-gray-500">
            <path fill="currentColor" d="M12 21.04V10.96c0-.74.836-1.2 1.502-.828l9.003 5.04a.94.94 0 0 1 0 1.656l-9.003 5.04c-.666.373-1.502-.088-1.502-.828Z" />
          </svg>
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="text-sm md:text-base text-gray-600 font-bold">Artikel anhören</span>
          <span className="text-xs sm:text-sm text-gray-500">nicht verfügbar</span>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
