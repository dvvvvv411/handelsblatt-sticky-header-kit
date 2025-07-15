import React from 'react';
import { ExternalLink } from 'lucide-react';

interface LawyerCardProps {
  articleId?: string;
  lawyerUrl?: string;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ 
  articleId, 
  lawyerUrl = "https://anwalt.de" 
}) => {
  const handleCtaClick = () => {
    if (lawyerUrl) {
      window.open(lawyerUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img 
              src="https://anwalt.de/images/anwalt-de-logo.svg" 
              alt="Anwalt.de Logo" 
              className="h-8 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
              Anzeige
            </span>
          </div>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              Kostenlos Anwälte vergleichen und sparen
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>100% kostenlos:</strong> Angebote von bis zu 3 Anwälten in Ihrer Nähe
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Spezialisiert:</strong> Anwälte mit Expertise in Ihrem Rechtsgebiet
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Transparent:</strong> Klare Kostenvoranschläge und faire Preise
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCtaClick}
              className="w-full lg:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 group"
            >
              Jetzt kostenlos Anwälte finden
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src="https://anwalt.de/images/anwalt-beratung-kostenlos.jpg" 
              alt="Anwalt Beratung" 
              className="w-full max-w-xs lg:max-w-sm h-auto rounded-lg shadow-md"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300x200/3B82F6/ffffff?text=Anwalt.de';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;