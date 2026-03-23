import React from 'react';

const ArticleContentH2 = () => {
  return (
    <div 
      className="prose prose-lg max-w-none"
      style={{ 
        fontSize: '20px',
        lineHeight: '1.7',
        color: '#2d3748'
      }}
    >
      <p className="mb-4 md:mb-6 font-classic-grotesque text-lg md:text-xl leading-relaxed">
        Der Bitcoin-Kurs hat in den vergangenen Wochen eine bemerkenswerte Rally hingelegt 
        und erstmals die psychologisch wichtige Marke von 100.000 Dollar durchbrochen. 
        Diese Entwicklung markiert einen historischen Meilenstein für die weltweit größte 
        Kryptowährung.
      </p>

      <p className="mb-4 md:mb-6 font-classic-grotesque text-lg md:text-xl leading-relaxed">
        Experten führen den jüngsten Kursanstieg auf mehrere Faktoren zurück: Zum einen 
        haben institutionelle Investoren ihr Engagement in digitalen Währungen deutlich 
        ausgeweitet. Große Vermögensverwalter und Pensionsfonds betrachten Bitcoin 
        zunehmend als legitime Anlageklasse.
      </p>

      <p className="mb-4 md:mb-6 font-classic-grotesque text-lg md:text-xl leading-relaxed">
        Regulatorische Klarstellungen in wichtigen Märkten wie den USA 
        und der Europäischen Union haben für mehr Sicherheit gesorgt. Die Einführung von 
        Bitcoin-ETFs hat es Anlegern ermöglicht, einfacher in die Kryptowährung zu 
        investieren, ohne diese direkt kaufen zu müssen.
      </p>

      <p className="mb-4 md:mb-6 font-classic-grotesque text-lg md:text-xl leading-relaxed">
        "Wir sehen eine fundamentale Verschiebung in der Wahrnehmung von Bitcoin", 
        erklärt Dr. Michael Weber, Krypto-Analyst bei der Deutsche Bank. "Was einst 
        als spekulatives Instrument galt, wird nun als digitales Gold betrachtet."
      </p>

      <p className="mb-4 md:mb-6 font-classic-grotesque text-lg md:text-xl leading-relaxed">
        Für das kommende Jahr erwarten Analysten eine weitere Konsolidierung des 
        Kryptowährungsmarktes. Während volatile Phasen weiterhin zu erwarten sind, 
        könnte die zunehmende institutionelle Adoption für mehr Stabilität sorgen.
      </p>
    </div>
  );
};

export default ArticleContentH2;