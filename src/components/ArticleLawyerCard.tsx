import React, { useState, useEffect } from 'react';
import { createShortUrl } from '@/utils/urlShortener';

interface ArticleLawyerCardProps {
  articleId?: string;
  lawyerUrl?: string;
}

const ArticleLawyerCard: React.FC<ArticleLawyerCardProps> = ({ 
  articleId, 
  lawyerUrl = 'https://rechtsanwalt-mueller.de?ref=handelsblatt' 
}) => {
  const [shortUrl, setShortUrl] = useState<string>(lawyerUrl);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const generateShortUrl = async () => {
      if (articleId) {
        console.log('Generating/retrieving short URL for lawyer article:', articleId);
        setIsGenerating(true);
        
        try {
          const generated = await createShortUrl(lawyerUrl, articleId);
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
  }, [articleId, lawyerUrl]);

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
      
      {/* Lawyer Advertisement Card - Mobile Responsive */}
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
            RECHTSBERATUNG
          </span>
        </div>

        {/* Mobile-First Layout */}
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 lg:space-y-0 items-center">
          
          {/* Content Section */}
          <div className="space-y-4 md:space-y-6 text-center">
            {/* Law Firm Logo */}
            <div className="flex justify-center">
              <div className="h-8 md:h-10 lg:h-12 w-auto flex items-center justify-center bg-gray-100 px-4 rounded">
                <span className="font-druk-web text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                  MÜLLER & PARTNER
                </span>
              </div>
            </div>
            
            {/* Headline - Mobile Responsive */}
            <h3 
              className="font-druk-web text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight" 
              style={{ color: '#1e293b' }}
            >
              RECHTLICHE PROBLEME? WIR HELFEN IHNEN WEITER
            </h3>
            
            <p 
              className="font-classic-grotesque text-sm md:text-base leading-relaxed" 
              style={{ color: '#475569' }}
            >
              Spezialisiert auf Wirtschaftsrecht, Arbeitsrecht und Verbraucherschutz. 
              Kostenlose Erstberatung und faire Preise für alle Mandanten.
            </p>

            {/* Trust Indicators - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-classic-grotesque" style={{ color: '#64748b' }}>
                  25+ Jahre Erfahrung
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-classic-grotesque" style={{ color: '#64748b' }}>
                  1000+ Erfolgreiche Fälle
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section - Mobile Optimized */}
          <div className="space-y-4 md:space-y-6 text-center">
            {/* Success Rate */}
            <div 
              className="border rounded-sm p-4 md:p-6" 
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e8f0fe 100%)',
                borderColor: '#3b82f6'
              }}
            >
              <div className="text-center">
                <div 
                  className="font-druk-normal text-2xl md:text-3xl font-bold mb-1" 
                  style={{ color: '#3b82f6' }}
                >
                  95% Erfolgsquote
                </div>
                <div 
                  className="font-classic-grotesque text-xs md:text-sm" 
                  style={{ color: '#64748b' }}
                >
                  Bei außergerichtlichen Einigungen
                </div>
              </div>
            </div>
            
            {/* Special Offer - Mobile Responsive */}
            <div 
              className="border-2 border-dashed rounded-sm p-3 md:p-4 text-center" 
              style={{
                borderColor: '#dc2626',
                backgroundColor: '#fef2f2'
              }}
            >
              <div 
                className="font-classic-grotesque text-xs md:text-sm font-medium mb-2" 
                style={{ color: '#991b1b' }}
              >
                Exklusiv für Handelsblatt-Leser:
              </div>
              <div 
                className="font-druk-web text-lg md:text-xl font-bold mb-1" 
                style={{ color: '#dc2626' }}
              >
                KOSTENLOSE ERSTBERATUNG
              </div>
              <div 
                className="font-classic-grotesque text-xs" 
                style={{ color: '#991b1b' }}
              >
                Normalpreis: 190€
              </div>
            </div>
            
            {/* CTA Button - Mobile Touch Friendly */}
            <div className="space-y-3">
              <button 
                onClick={handleCtaClick}
                disabled={isGenerating}
                className="w-full font-druk-normal text-white font-semibold text-sm md:text-base py-3 md:py-4 px-4 md:px-6 rounded-sm transition-all duration-200 hover:opacity-90 min-h-[44px] disabled:opacity-50" 
                style={{ backgroundColor: '#1d4ed8' }}
              >
                {isGenerating ? 'WIRD GELADEN...' : 'JETZT KOSTENLOS BERATEN LASSEN'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Legal Disclaimer */}
        <div 
          className="mt-6 md:mt-8 pt-4 md:pt-6 border-t text-center" 
          style={{ borderColor: '#e2e8f0' }}
        >
          <p 
            className="font-classic-grotesque text-xs leading-relaxed" 
            style={{ color: '#94a3b8' }}
          >
            Hinweis: Die Erstberatung ist kostenfrei und unverbindlich. Weitere Kosten entstehen nur bei Mandatserteilung.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleLawyerCard;