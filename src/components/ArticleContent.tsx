
import React from 'react';

const ArticleContent = () => {
  return (
    <div 
      className="prose prose-lg max-w-none"
      style={{ 
        fontSize: '24px',
        lineHeight: '1.6',
        color: '#2d3748'
      }}
    >
      <p className="mb-4 font-classic-grotesque">
        Der Bitcoin-Kurs hat in den vergangenen Wochen eine bemerkenswerte Rally hingelegt 
        und erstmals die psychologisch wichtige Marke von 100.000 Dollar durchbrochen. 
        Diese Entwicklung markiert einen historischen Meilenstein für die weltweit größte 
        Kryptowährung.
      </p>

      <p className="mb-4 font-classic-grotesque">
        Experten führen den jüngsten Kursanstieg auf mehrere Faktoren zurück: Zum einen 
        haben institutionelle Investoren ihr Engagement in digitalen Währungen deutlich 
        ausgeweitet. Große Vermögensverwalter und Pensionsfonds betrachten Bitcoin 
        zunehmend als legitime Anlageklasse.
      </p>

      <h2 className="text-xl font-semibold mb-3 mt-6 font-druk-normal" style={{ color: '#1a202c', fontSize: '30px' }}>
        Regulatorische Klarstellungen schaffen Vertrauen
      </h2>

      <p className="mb-4 font-classic-grotesque">
        Zum anderen haben regulatorische Klarstellungen in wichtigen Märkten wie den USA 
        und der Europäischen Union für mehr Sicherheit gesorgt. Die Einführung von 
        Bitcoin-ETFs hat es Anlegern ermöglicht, einfacher in die Kryptowährung zu 
        investieren, ohne diese direkt kaufen zu müssen.
      </p>

      <p className="mb-4 font-classic-grotesque">
        "Wir sehen eine fundamentale Verschiebung in der Wahrnehmung von Bitcoin", 
        erklärt Dr. Michael Weber, Krypto-Analyst bei der Deutsche Bank. "Was einst 
        als spekulatives Instrument galt, wird nun als digitales Gold betrachtet."
      </p>

      <h2 className="text-xl font-semibold mb-3 mt-6 font-druk-normal" style={{ color: '#1a202c', fontSize: '30px' }}>
        Ausblick für 2025
      </h2>

      <p className="mb-4 font-classic-grotesque">
        Für das kommende Jahr erwarten Analysten eine weitere Konsolidierung des 
        Kryptowährungsmarktes. Während volatile Phasen weiterhin zu erwarten sind, 
        könnte die zunehmende institutionelle Adoption für mehr Stabilität sorgen.
      </p>
    </div>
  );
};

export default ArticleContent;
