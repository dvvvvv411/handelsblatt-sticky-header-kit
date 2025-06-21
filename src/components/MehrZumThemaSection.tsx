import React from 'react';
import { Bookmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const MehrZumThemaSection = () => {
  const topRowArticles = [
    {
      id: 1,
      kicker: "Wochenend-Newsletter",
      isPremium: false,
      headline: "Nix beizutragen? Einfach gehen! Trump und die Meeting-Kultur – das Handelsblatt-Wochenende",
      url: "/wochenende/wochenend-newsletter-nix-beizutragen-einfach-gehen-trump-und-die-meeting-kultur-das-handelsblatt-wochenende/100135408.html"
    },
    {
      id: 2,
      kicker: "Israel-Iran-Konflikt",
      isPremium: false,
      headline: "So will Europa eine weitere Eskalation in Nahost verhindern – Die wichtigsten Fragen und Antworten",
      url: "/politik/international/israel-iran-krieg-so-will-europa-eine-weitere-eskalation-in-nahost-verhindern/100136072.html"
    },
    {
      id: 3,
      kicker: "Dow Jones, S&P 500, Nasdaq",
      isPremium: true,
      headline: "Anleger zurückhaltend angesichts des Israel/Iran-Kriegs",
      url: "/finanzen/maerkte/marktberichte/dow-jones-sp-500-nasdaq-anleger-zurueckhaltend-angesichts-des-israel-iran-kriegs/100136335.html"
    },
    {
      id: 4,
      kicker: "Öl", 
      isPremium: true,
      headline: "US-Ölförderung steigt nicht – Trump unzufrieden mit Energieminister: \"Ich wollte dich anrufen und dich richtig anschreien\"",
      url: "/finanzen/maerkte/devisen-rohstoffe/oel-us-produzenten-erhoehen-oelfoerderung-trotz-des-nahostkrieges-nicht/100135482.html"
    }
  ];

  const bottomRowArticles = [
    {
      id: 5,
      kicker: "Analyse",
      isPremium: true,
      headline: "Das sind die wichtigsten Thesen von Trumps Antrittsrede",
      url: "/politik/international/trump-amtsantritt-das-sind-die-wichtigsten-thesen-von-trumps-antrittsrede/100136307.html"
    },
    {
      id: 6,
      kicker: "Digital",
      isPremium: false,
      headline: "Warum Elon Musk seine Fans mit dem Nazi-Gruß schockiert",
      url: "/technik/it-internet/elon-musk-warum-elon-musk-seine-fans-mit-dem-nazi-gruss-schockiert/100136394.html"
    },
    {
      id: 7,
      kicker: "Immobilien",
      isPremium: true,
      headline: "Warum sich ein Hauskauf in Deutschland wieder lohnt – trotz hoher Zinsen",
      url: "/finanzen/immobilien/immobilienkauf-warum-sich-ein-hauskauf-in-deutschland-wieder-lohnt-trotz-hoher-zinsen/100134408.html"
    },
    {
      id: 8,
      kicker: "Energie",
      isPremium: false,
      headline: "Warum Robert Habeck bei der Energiewende scheiterte – eine Bilanz",
      url: "/politik/deutschland/energiewende-warum-robert-habeck-bei-der-energiewende-scheiterte-eine-bilanz/100136147.html"
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
