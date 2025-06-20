
import React from 'react';

const ArticleSidebar = () => {
  return (
    <div 
      className="sticky p-6 rounded-lg"
      style={{ 
        top: '80px',
        backgroundColor: '#f7fafc',
        width: '300px',
        minHeight: '400px'
      }}
    >
      <h3 className="text-lg font-semibold mb-4 font-guyot-headline" style={{ color: '#1a202c' }}>
        Mehr zum Thema
      </h3>
      
      <div className="space-y-4">
        <div className="pb-4 border-b border-gray-200">
          <h4 className="text-sm font-medium mb-2 hover:text-blue-600 cursor-pointer">
            Ethereum steigt auf über 4.000 Dollar
          </h4>
          <p className="text-xs text-gray-600">
            Die zweitgrößte Kryptowährung profitiert ebenfalls vom Boom
          </p>
        </div>
        
        <div className="pb-4 border-b border-gray-200">
          <h4 className="text-sm font-medium mb-2 hover:text-blue-600 cursor-pointer">
            Regulierung: EU plant schärfere Regeln
          </h4>
          <p className="text-xs text-gray-600">
            Neue Vorschriften sollen Verbraucher besser schützen
          </p>
        </div>
        
        <div className="pb-4 border-b border-gray-200">
          <h4 className="text-sm font-medium mb-2 hover:text-blue-600 cursor-pointer">
            Mining: Umweltbelastung im Fokus
          </h4>
          <p className="text-xs text-gray-600">
            Diskussion um Nachhaltigkeit von Kryptowährungen
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg border">
        <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
        <p className="text-xs text-gray-600 mb-3">
          Bleiben Sie auf dem Laufenden mit unserem Krypto-Newsletter
        </p>
        <button className="w-full py-2 px-4 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
          Jetzt abonnieren
        </button>
      </div>
    </div>
  );
};

export default ArticleSidebar;
