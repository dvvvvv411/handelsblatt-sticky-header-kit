import React from 'react';

interface LawyerCardProps {
  className?: string;
  lawyerUrl?: string;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ 
  className = "", 
  lawyerUrl = 'https://anwalt-directory.com' 
}) => {
  const handleCtaClick = () => {
    console.log('Lawyer Card CTA button clicked, redirecting to:', lawyerUrl);
    window.open(lawyerUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`relative my-6 md:my-8 ${className}`}>
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
            RECHTSANWALT-WERBUNG
          </span>
        </div>

        {/* Mobile-First Layout */}
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 lg:space-y-0 items-center">
          
          {/* Content Section */}
          <div className="space-y-4 md:space-y-6 text-center">
            {/* Law Firm Logo */}
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=80&fit=crop&crop=center" 
                alt="Anwaltskanzlei Logo" 
                className="h-12 md:h-16 lg:h-20 w-auto object-contain bg-gray-100 px-4 py-2 rounded" 
              />
            </div>
            
            {/* Headline - Mobile Responsive */}
            <h3 
              className="font-druk-web text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight" 
              style={{ color: '#1e293b' }}
            >
              ERHALTEN SIE PROFESSIONELLE RECHTSBERATUNG
            </h3>
            
            <p 
              className="font-classic-grotesque text-sm md:text-base leading-relaxed" 
              style={{ color: '#475569' }}
            >
              Unsere erfahrenen Rechtsanwälte beraten Sie umfassend in allen Rechtsgebieten. 
              Vertrauen Sie auf unsere Expertise und jahrelange Erfahrung.
            </p>

            {/* Trust Indicators - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="font-classic-grotesque" style={{ color: '#64748b' }}>
                  Über 20 Jahre Erfahrung
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="font-classic-grotesque" style={{ color: '#64748b' }}>
                  Deutschlandweit tätig
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section - Mobile Optimized */}
          <div className="space-y-4 md:space-y-6 text-center">
            {/* Service Highlight */}
            <div 
              className="border rounded-sm p-4 md:p-6" 
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e8f4f8 100%)',
                borderColor: '#3b82f6'
              }}
            >
              <div className="text-center">
                <div 
                  className="font-druk-normal text-lg md:text-xl font-bold mb-1" 
                  style={{ color: '#3b82f6' }}
                >
                  Kostenlose Erstberatung
                </div>
                <div 
                  className="font-classic-grotesque text-xs md:text-sm" 
                  style={{ color: '#64748b' }}
                >
                  Unverbindlich und kompetent
                </div>
              </div>
            </div>
            
            {/* Service Areas - Mobile Responsive */}
            <div 
              className="border-2 border-dashed rounded-sm p-3 md:p-4 text-center" 
              style={{
                borderColor: '#059669',
                backgroundColor: '#ecfdf5'
              }}
            >
              <div 
                className="font-classic-grotesque text-xs md:text-sm font-medium mb-2" 
                style={{ color: '#064e3b' }}
              >
                Unsere Schwerpunkte:
              </div>
              <div 
                className="font-druk-web text-sm md:text-base font-bold mb-1" 
                style={{ color: '#059669' }}
              >
                Arbeitsrecht • Mietrecht • Familienrecht
              </div>
              <div 
                className="font-classic-grotesque text-xs" 
                style={{ color: '#064e3b' }}
              >
                und viele weitere Rechtsgebiete
              </div>
            </div>
            
            {/* CTA Button - Mobile Touch Friendly */}
            <div className="space-y-3">
              <button 
                onClick={handleCtaClick}
                className="w-full font-druk-normal text-white font-semibold text-sm md:text-base py-3 md:py-4 px-4 md:px-6 rounded-sm transition-all duration-200 hover:opacity-90 min-h-[44px]" 
                style={{ backgroundColor: '#1d4ed8' }}
              >
                KOSTENLOSE BERATUNG VEREINBAREN
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
            Hinweis: Die Erstberatung ist für neue Mandanten kostenlos. Weitere Leistungen werden nach der Rechtsanwaltsvergütungsverordnung (RVG) abgerechnet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;