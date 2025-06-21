
import React from 'react';
import { Bookmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const MehrZumThemaSection = () => {
  const topRowArticles = [
    {
      id: 1,
      kicker: "Börse",
      isPremium: true,
      headline: "Die größten Kursgewinner und -verlierer von heute",
      url: "https://www.handelsblatt.com/finanzen/maerkte/aktien/dax-mdax-tecdax-die-groessten-kursgewinner-und-verlierer-von-heute/29581500.html"
    },
    {
      id: 2,
      kicker: "Kommentar",
      isPremium: true,
      headline: "Trumps Amtsantritt: Warum Europa mit einer Rezession rechnen muss",
      url: "https://www.handelsblatt.com/meinung/kommentare/kommentar-trumps-amtsantritt-warum-europa-mit-einer-rezession-rechnen-muss/100136036.html"
    },
    {
      id: 3,
      kicker: "Analyse",
      isPremium: true,
      headline: "Warum sich Anleger auf eine neue Ära einstellen müssen",
      url: "https://www.handelsblatt.com/finanzen/maerkte/aktien/us-wahl-warum-sich-anleger-auf-eine-neue-aera-einstellen-muessen/100127850.html"
    },
    {
      id: 4,
      kicker: "Börse", 
      isPremium: false,
      headline: "So viel Geld haben die reichsten Menschen der Welt verdient",
      url: "https://www.handelsblatt.com/finanzen/maerkte/aktien/billionaere-so-viel-geld-haben-die-reichsten-menschen-der-welt-verdient/100135773.html"
    }
  ];

  const bottomRowArticles = [
    {
      id: 5,
      kicker: "Finanzen",
      isPremium: true,
      headline: "Kryptowährungen: Regulierung nimmt Fahrt auf"
    },
    {
      id: 6,
      kicker: "Energie",
      isPremium: false,
      headline: "Erneuerbare Energien: Rekordinvestitionen erwartet"
    },
    {
      id: 7,
      kicker: "Immobilien",
      isPremium: true,
      headline: "Wohnungsmarkt: Preise steigen weiter"
    },
    {
      id: 8,
      kicker: "Automobil",
      isPremium: false,
      headline: "Elektromobilität: Deutsche Hersteller unter Druck"
    }
  ];

  const ArticleCard = ({ article }: { article: any }) => (
    <div className="bg-white p-4 hover:bg-gray-50 transition-colors relative">
      {/* Bookmark */}
      <button className="absolute top-3 right-3 p-1">
        <Bookmark size={10} className="text-gray-600" />
      </button>

      {/* Kicker with Premium Badge and Live Blog */}
      <div className="flex items-center gap-2 mb-3">
        {article.isPremium && (
          <img 
            src="https://resources.handelsblatt.com/hb-frontend/images/h-plus/h-plus.svg" 
            width="23" 
            height="19" 
            alt="H+" 
          />
        )}
        <span className="text-sm font-medium text-gray-700">{article.kicker}</span>
        {article.isLiveBlog && (
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            Live-Blog
          </span>
        )}
      </div>

      {/* Category */}
      {article.category && (
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-600">{article.category}</span>
        </div>
      )}

      {/* Headline */}
      {article.url ? (
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <h3 className="font-bold text-lg leading-tight text-black hover:underline cursor-pointer font-guyot-headline">
            {article.headline}
          </h3>
        </a>
      ) : (
        <h3 className="font-bold text-lg leading-tight text-black font-guyot-headline">
          {article.headline}
        </h3>
      )}
    </div>
  );

  return (
    <section className="w-full">
      {/* Header with separator */}
      <Separator className="mb-8" />
      <h2 className="text-3xl font-druk-normal text-black mb-8">Mehr zum Thema</h2>

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-6 divide-x divide-gray-200">
        {topRowArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Divider between rows */}
      <Separator className="mb-6" />

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-gray-200">
        {bottomRowArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default MehrZumThemaSection;
