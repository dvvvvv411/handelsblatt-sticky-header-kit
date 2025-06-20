
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
      
      {/* Paywall Card */}
      <div 
        className="relative z-20 bg-white border rounded-xl text-center mx-auto"
        style={{
          padding: '40px',
          borderRadius: '12px',
          maxWidth: '500px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <div className="mb-4">
          <span 
            className="inline-block px-3 py-1 text-sm font-semibold rounded-full"
            style={{
              backgroundColor: '#f7fafc',
              color: '#2d3748'
            }}
          >
            H+ Exklusiv
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-4" style={{ color: '#1a202c' }}>
          Weiterlesen mit Handelsblatt+
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Erhalten Sie Zugang zu diesem und allen weiteren Artikeln im Web und in 
          unserer App für 4 Wochen kostenlos.
        </p>
        
        <div className="space-y-3">
          <button 
            className="w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors duration-200 hover:opacity-90"
            style={{ 
              backgroundColor: '#f56500'
            }}
          >
            4 Wochen für 1€ testen
          </button>
          
          <div className="text-sm">
            <span className="text-gray-600">Bereits Abonnent? </span>
            <a 
              href="/login" 
              className="font-medium hover:underline"
              style={{ color: '#3182ce' }}
            >
              Hier anmelden
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Danach 9,99€ pro Monat. Jederzeit kündbar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePaywall;
