import React, { useState, useEffect } from 'react';
import { createShortUrl } from '@/utils/urlShortener';

interface ArticlePaywallH2Props {
  articleId?: string;
  bitloonUrl?: string;
}

const ArticlePaywallH2: React.FC<ArticlePaywallH2Props> = ({ 
  articleId, 
  bitloonUrl = "https://bit.ly/4igV4QU" 
}) => {
  const [shortUrl, setShortUrl] = useState<string>(bitloonUrl);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const generateShortUrl = async () => {
      if (articleId && bitloonUrl && !shortUrl) {
        setIsGenerating(true);
        try {
          const generatedShortUrl = await createShortUrl(bitloonUrl, articleId);
          if (generatedShortUrl) {
            setShortUrl(generatedShortUrl);
          }
        } catch (error) {
          console.error('Error generating short URL:', error);
          setShortUrl(bitloonUrl);
        } finally {
          setIsGenerating(false);
        }
      }
    };

    generateShortUrl();
  }, [articleId, bitloonUrl, shortUrl]);

  const handleCtaClick = () => {
    if (shortUrl) {
      window.open(shortUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="my-8 md:my-12">
      <div 
        className="relative p-6 md:p-8 rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
        }}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Main Content */}
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex-1">
              {/* Logo and Brand */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  B
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Bitloon</h3>
                  <p className="text-blue-100 text-sm">Krypto-Investment Platform</p>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">
                🚀 Bitcoin über 100.000$ - Jetzt profitieren!
              </h2>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-blue-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Reguliert & Sicher</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">500.000+ Nutzer</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>

              {/* Performance Highlight */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Bitcoin Performance</p>
                    <p className="text-white text-2xl font-bold">+127%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">Letztes Jahr</p>
                    <p className="text-green-300 text-sm font-semibold">↗ Steigend</p>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg inline-block mb-4">
                <span className="font-bold text-sm">Code: HANDELSBLATT50 - 50€ Bonus!</span>
              </div>
            </div>

            {/* Right Content - CTA */}
            <div className="w-full md:w-auto flex-shrink-0">
              <div className="text-center">
                <button
                  onClick={handleCtaClick}
                  disabled={isGenerating}
                  className="bg-white text-purple-700 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Lädt...' : '🎯 Jetzt investieren'}
                </button>
                <p className="text-blue-100 text-xs mt-2">
                  Kostenlose Anmeldung • Sofortiger Zugang
                </p>
                <p className="text-blue-200 text-xs mt-1">
                  ⚡ Mindesteinzahlung: 10€
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Disclaimer */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="text-blue-100 text-xs leading-relaxed">
              <strong>Risikohinweis:</strong> Kryptowährungen sind hochvolatile Investments. 
              Ihr Kapital ist einem Verlustrisiko ausgesetzt. Investieren Sie nur Geld, 
              dessen Verlust Sie sich leisten können. 67% der Privatanleger verlieren Geld beim CFD-Handel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePaywallH2;