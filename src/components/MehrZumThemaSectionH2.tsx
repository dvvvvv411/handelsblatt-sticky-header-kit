import React from 'react';
import { Bookmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const MehrZumThemaSectionH2 = () => {
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
      kicker: "Handelspolitik",
      isPremium: false,
      headline: "Verbraucher wollen US-Marken boykottieren – und kaufen sie trotzdem",
      url: "https://www.handelsblatt.com/unternehmen/handel-konsumgueter/handelspolitik-verbraucher-wollen-us-marken-boykottieren-und-kaufen-sie-trotzdem/100136297.html"
    },
    {
      id: 6,
      kicker: "Ranking",
      isPremium: false,
      headline: "Nur wenige Unternehmen aus Europa: Das sind die größten Rüstungskonzerne der Welt 2025",
      url: "https://www.handelsblatt.com/unternehmen/industrie/unternehmen-das-sind-die-zehn-groessten-ruestungskonzerne-der-welt-2025-01/100116218.html"
    },
    {
      id: 7,
      kicker: "Dax aktuell",
      isPremium: true,
      headline: "Großer Verfallstag an der Börse – Dax schließt fast 300 Punkte im Plus",
      url: "https://www.handelsblatt.com/finanzen/maerkte/marktberichte/dax-aktuell-grosser-verfallstag-an-der-boerse-dax-schliesst-deutlich-im-plus/100136229.html"
    },
    {
      id: 8,
      kicker: "Tourismus",
      isPremium: false,
      headline: "Mehr Reisende fliegen in die USA und weniger nach China",
      url: "https://www.handelsblatt.com/unternehmen/dienstleister/tourismus-touristenkrisen-in-usa-und-china-01/100136041.html"
    }
  ];

  const ArticleCard = ({ article }: { article: any }) => (
    <div className="bg-white p-4 hover:bg-gray-50 transition-colors relative">
      <button className="absolute top-3 right-3 p-1">
        <Bookmark size={10} className="text-gray-600" />
      </button>

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

      {article.category && (
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-600">{article.category}</span>
        </div>
      )}

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
      <Separator className="mb-8" />
      <h2 className="text-3xl font-druk-normal text-black mb-8">Mehr zum Thema</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-6 divide-x divide-gray-200">
        {topRowArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <Separator className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-gray-200">
        {bottomRowArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default MehrZumThemaSectionH2;