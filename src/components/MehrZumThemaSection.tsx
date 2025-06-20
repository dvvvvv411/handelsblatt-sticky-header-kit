
import React from 'react';
import { Bookmark } from 'lucide-react';

const MehrZumThemaSection = () => {
  const topRowArticles = [
    {
      id: 1,
      kicker: "Politik",
      isPremium: true,
      headline: "Donald Trump kündigt neue Handelspolitik an",
      category: "Donald Trump"
    },
    {
      id: 2,
      kicker: "International",
      isPremium: false,
      headline: "USA unter Trump: Erste Maßnahmen im Überblick",
      category: "+++ USA unter Trump +++",
      isLiveBlog: true
    },
    {
      id: 3,
      kicker: "Wirtschaft",
      isPremium: true,
      headline: "Die wertvollsten Unternehmen der Welt",
      category: "Ranking"
    },
    {
      id: 4,
      kicker: "Technologie", 
      isPremium: false,
      headline: "Digitalisierung verändert den Mittelstand"
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
    <div className="small-layout bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
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
          <span className="text-sm font-medium text-blue-600">{article.category}</span>
        </div>
      )}

      {/* Headline */}
      <h3 className="font-bold text-base leading-tight text-gray-900 hover:underline cursor-pointer font-guyot-headline">
        {article.headline}
      </h3>
    </div>
  );

  return (
    <section className="w-full">
      {/* Header */}
      <h2 className="text-2xl font-druk-web text-gray-900 mb-8">Mehr zum Thema</h2>

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topRowArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bottomRowArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default MehrZumThemaSection;
