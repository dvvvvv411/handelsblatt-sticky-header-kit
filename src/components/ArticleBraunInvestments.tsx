import React, { useState, useEffect } from 'react';
import { createShortUrl } from '@/utils/urlShortener';

interface ArticleBraunInvestmentsProps {
  articleId?: string;
  braunInvestmentsUrl?: string;
}

const ArticleBraunInvestments: React.FC<ArticleBraunInvestmentsProps> = ({ 
  articleId, 
  braunInvestmentsUrl = 'https://braun-investments.com?ref=handelsblatt' 
}) => {
  const [shortUrl, setShortUrl] = useState<string>(braunInvestmentsUrl);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const generateShortUrl = async () => {
      if (articleId) {
        console.log('Generating/retrieving short URL for article:', articleId);
        setIsGenerating(true);
        
        try {
          const generated = await createShortUrl(braunInvestmentsUrl, articleId);
          if (generated) {
            console.log('Short URL generated/retrieved successfully:', generated);
            setShortUrl(generated);
          } else {
            console.warn('Failed to generate/retrieve short URL, using original URL');
          }
        } catch (error) {
          console.error('Error generating/retrieving short URL:', error);
        } finally {
          setIsGenerating(false);
        }
      } else {
        console.log('No articleId provided, using original URL');
      }
    };

    generateShortUrl();
  }, [articleId, braunInvestmentsUrl]);

  const handleCtaClick = () => {
    console.log('CTA button clicked, redirecting to:', shortUrl);
    window.open(shortUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative my-6 md:my-8">
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{
          background: 'linear-gradient(transparent 0%, white 60%, white 100%)',
          height: '150px md:200px'
        }} 
      />
      
      {/* Braun Investments Advertisement Card - Mobile Responsive */}
      <div 
        className="relative z-20 bg-white border-2 rounded-none shadow-sm p-4 md:p-6 lg:p-8" 
        style={{
          borderColor: '#e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        {/* Sponsored Label */}
        <div className="mb-4 md:mb-6 text-center">
          <span 
            className="text-xs font-druk-web tracking-wider px-3 py-1 rounded-sm" 
            style={{
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              fontSize: '11px'
            }}
          >
            ÜBER BRAUN INVESTMENTS
          </span>
        </div>

        {/* Mobile-First Layout */}
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 lg:space-y-0 items-center">
          
          {/* Content Section */}
          <div className="space-y-4 md:space-y-6 text-center">
            {/* Braun Investments Logo */}
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/39e0e747-14c4-4878-ac4e-4dbc41ca728a.png" 
                alt="Braun Investments Logo" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain" 
              />
            </div>
            
            {/* Headline - Mobile Responsive */}
            <h3 
              className="font-druk-web text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight" 
              style={{ color: '#1e293b' }}
            >
              EXKLUSIVES INVESTMENT ANGEBOT BEI DER SANTANDER BANK
            </h3>
            
            <p 
              className="font-classic-grotesque text-sm md:text-base leading-relaxed" 
              style={{ color: '#475569' }}
            >
              Ihre Einlagen sind maximal bis zu 100.000 € je Kunde durch den deutschen Einlagensicherungsfonds gesetzlich abgesichert. Damit können Sie Ihr Investment mit Vertrauen anlegen, denn Ihr Geld ist umfassend geschützt.
            </p>

            {/* Trust Indicators - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-classic-grotesque" style={{ color: '#64748b' }}>
                  Nur für Neukunden
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-classic-grotesque" style={{ color: '#64748b' }}>
                  100 % Einlagensicherung
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section - Mobile Optimized */}
          <div className="space-y-4 md:space-y-6 text-center">
            {/* Performance Metrics */}
            <div 
              className="border rounded-sm p-4 md:p-6" 
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e8f5e8 100%)',
                borderColor: '#21C45D'
              }}
            >
              <div className="text-center">
                <div 
                  className="font-druk-normal text-2xl md:text-3xl font-bold mb-1" 
                  style={{ color: '#21C45D' }}
                >
                  4,1% Festgeld
                </div>
                <div 
                  className="font-classic-grotesque text-xs md:text-sm" 
                  style={{ color: '#64748b' }}
                >
                  und 3,2% Tagesgeld bei der Santander Bank
                </div>
              </div>
            </div>
            
            {/* Promo Code - Mobile Responsive */}
            <div 
              className="border-2 border-dashed rounded-sm p-3 md:p-4 text-center" 
              style={{
                borderColor: '#f97316',
                backgroundColor: '#fff7ed'
              }}
            >
              <div 
                className="font-classic-grotesque text-xs md:text-sm font-medium mb-2" 
                style={{ color: '#9a3412' }}
              >
                Exklusiver Code für Handelsblatt-Leser:
              </div>
              <div 
                className="font-druk-web text-lg md:text-xl font-bold mb-1" 
                style={{ color: '#f97316' }}
              >
                HANDELSBLATT50
              </div>
              <div 
                className="font-classic-grotesque text-xs" 
                style={{ color: '#9a3412' }}
              >
                50€ Startbonus
              </div>
            </div>
            
            {/* CTA Button - Mobile Touch Friendly */}
            <div className="space-y-3">
              <button 
                onClick={handleCtaClick}
                disabled={isGenerating}
                className="w-full font-druk-normal text-white font-semibold text-sm md:text-base py-3 md:py-4 px-4 md:px-6 rounded-sm transition-all duration-200 hover:opacity-90 min-h-[44px] disabled:opacity-50" 
                style={{ backgroundColor: '#ef6400' }}
              >
                {isGenerating ? 'WIRD GELADEN...' : 'JETZT KOSTENLOS STARTEN'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Risk Disclaimer */}
        <div 
          className="mt-6 md:mt-8 pt-4 md:pt-6 border-t text-center" 
          style={{ borderColor: '#e2e8f0' }}
        >
          <p 
            className="font-classic-grotesque text-xs leading-relaxed" 
            style={{ color: '#94a3b8' }}
          >
            Risikohinweis: Trading birgt Verlustrisiken. Vergangene Gewinne sind keine Garantie für zukünftige Ergebnisse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleBraunInvestments;