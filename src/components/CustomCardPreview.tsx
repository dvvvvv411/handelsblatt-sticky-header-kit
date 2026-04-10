import React from 'react';

interface CustomCardPreviewProps {
  sponsorLabel: string;
  logoUrl?: string;
  logoScale?: number;
  headline: string;
  description: string;
  trustIndicator1: string;
  trustIndicator2: string;
  metricValue: string;
  metricLabel: string;
  serviceTitle: string;
  serviceLine1: string;
  serviceLine2: string;
  ctaButtonText: string;
  accentColor: string;
  disclaimerText: string;
}

const CustomCardPreview: React.FC<CustomCardPreviewProps> = ({
  sponsorLabel,
  logoUrl,
  logoScale = 1,
  headline,
  description,
  trustIndicator1,
  trustIndicator2,
  metricValue,
  metricLabel,
  serviceTitle,
  serviceLine1,
  serviceLine2,
  ctaButtonText,
  accentColor,
  disclaimerText,
}) => {
  return (
    <div className="relative my-6 md:my-8">
      <div
        className="relative z-20 bg-white border-2 rounded-none shadow-sm p-4 md:p-6 lg:p-8"
        style={{ borderColor: '#e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
      >
        {/* Sponsor Label */}
        <div className="mb-4 md:mb-6 text-center">
          <span
            className="text-xs font-druk-web tracking-wider px-3 py-1 rounded-sm"
            style={{ backgroundColor: '#f1f5f9', color: '#64748b', fontSize: '11px' }}
          >
            {sponsorLabel}
          </span>
        </div>

        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 lg:space-y-0 items-center">
          {/* Content Section */}
          <div className="space-y-4 md:space-y-6 text-center">
            {logoUrl && (
              <div className="flex justify-center">
                <img src={logoUrl} alt="Logo" className="h-8 md:h-10 lg:h-12 w-auto object-contain" style={{ transform: `scale(${logoScale})` }} />
              </div>
            )}

            <h3
              className="font-druk-web text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight"
              style={{ color: '#1e293b' }}
            >
              {headline}
            </h3>

            <p className="font-classic-grotesque text-sm md:text-base leading-relaxed" style={{ color: '#475569' }}>
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-classic-grotesque" style={{ color: '#64748b' }}>{trustIndicator1}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-classic-grotesque" style={{ color: '#64748b' }}>{trustIndicator2}</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 md:space-y-6 text-center">
            <div
              className="border rounded-sm p-4 md:p-6"
              style={{ background: `linear-gradient(135deg, #f8fafc 0%, ${accentColor}15 100%)`, borderColor: accentColor }}
            >
              <div className="text-center">
                <div className="font-druk-normal text-2xl md:text-3xl font-bold mb-1" style={{ color: accentColor }}>
                  {metricValue}
                </div>
                <div className="font-classic-grotesque text-xs md:text-sm" style={{ color: '#64748b' }}>
                  {metricLabel}
                </div>
              </div>
            </div>

            <div
              className="border-2 border-dashed rounded-sm p-3 md:p-4 text-center"
              style={{ borderColor: accentColor, backgroundColor: `${accentColor}10` }}
            >
              <div className="font-druk-web text-lg md:text-xl font-bold mb-2" style={{ color: accentColor }}>
                {serviceTitle}
              </div>
              <div className="font-classic-grotesque text-sm md:text-base font-medium mb-1" style={{ color: '#1e293b' }}>
                {serviceLine1}
              </div>
              <div className="font-classic-grotesque text-xs" style={{ color: '#475569' }}>
                {serviceLine2}
              </div>
            </div>

            <button
              className="w-full font-druk-normal text-white font-semibold text-sm md:text-base py-3 md:py-4 px-4 md:px-6 rounded-sm min-h-[44px]"
              style={{ backgroundColor: accentColor }}
            >
              {ctaButtonText}
            </button>
          </div>
        </div>

        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t text-center" style={{ borderColor: '#e2e8f0' }}>
          <p className="font-classic-grotesque text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
            {disclaimerText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomCardPreview;
