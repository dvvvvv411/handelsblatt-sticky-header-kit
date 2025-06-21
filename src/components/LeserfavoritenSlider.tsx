import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Bookmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const LeserfavoritenSlider = () => {
  const articles = [
    {
      id: 1,
      image: "https://images.handelsblatt.com/0i--oLIkM6kd/cover/657/370/0/0/2/2/0.5/0.5/teaserbild.avif",
      kicker: "Immobilien",
      isPremium: true,
      headline: "Welche Sanierung lohnt sich für ihr Haus? Berechnen Sie es hier",
      url: "https://www.handelsblatt.com/finanzen/immobilien/immobilien-so-daemmen-und-sanieren-sie-ihr-haus-effizient-und-clever/100129904.html"
    },
    {
      id: 2,
      image: "https://images.handelsblatt.com/86q8LnGbMGSU/cover/657/370/1/1/0/0/0.5/0.5/marktkolumne-jakob-blume-5525.avif",
      kicker: "Märkte-Insight",
      isPremium: false,
      headline: "Anleger sollten sich für ein Horrorszenario in den USA wappnen",
      url: "https://www.handelsblatt.com/finanzen/anlagestrategie/kolumnen/geldanlage-sollten-sich-anleger-fuer-eine-stagflation-in-den-usa-wappnen-01/100126046.html"
    },
    {
      id: 3,
      image: "https://images.handelsblatt.com/PD3FKv4p7yNO/cover/657/370/0/0/0/0/0.5/0.5/we-titel-etf-depot.avif",
      kicker: "Geldanlage",
      isPremium: true,
      headline: "Richtig investieren: Neun ETF-Portfolios für jede Lebenslage",
      url: "https://www.handelsblatt.com/finanzen/anlagestrategie/trends/geldanlage-welche-etf-portfolios-passen-zu-ihrer-lebenslage-01/100110573.html"
    },
    {
      id: 4,
      image: "https://images.handelsblatt.com/O5L5BTrWaasu/cover/657/370/0/0/0/0/0.5/0.5/triton.avif",
      kicker: "Umstrittene Transaktionen",
      isPremium: false,
      headline: "Was verschwieg der Milliardenfonds Triton seinen Investoren?",
      url: "https://www.handelsblatt.com/unternehmen/umstrittene-transaktionen-was-verschwieg-der-milliardenfonds-triton-seinen-investoren/100125005.html"
    },
    {
      id: 5,
      image: "https://images.handelsblatt.com/ZvU4LNsCFlSO/cover/657/370/0/0/0/0/0.5/0.5/themen-etfs.avif",
      kicker: "Geldanlage",
      isPremium: false,
      headline: "Investieren in Raumfahrt, E-Sports oder Uran - Wie sehr lohnen Trend-ETFs?",
      url: "https://www.handelsblatt.com/finanzen/anlagestrategie/fonds-etf/etfs-so-schlagen-sich-themenfonds-im-vergleich-zum-msci-world/100134073.html"
    },
  ];

  return (
    <section className="w-full">
      {/* Header with separator */}
      <Separator className="mb-6" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-druk-normal text-black">Leserfavoriten</h2>
          <svg width="14" height="8" viewBox="0 0 14 8" className="text-gray-600">
            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {articles.map((article) => (
            <CarouselItem key={article.id} className="pl-4 basis-auto">
              <div className="w-[385px] bg-white hover:bg-gray-50 transition-colors overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[1.77778] overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.headline}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white rounded transition-colors">
                    <Bookmark size={10} className="text-gray-600" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Kicker with Premium Badge */}
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
                  </div>

                  {/* Headline */}
                  {article.url ? (
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <h3 className="font-bold text-xl leading-tight text-black hover:underline cursor-pointer line-clamp-3 font-guyot-headline">
                        {article.headline}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="font-bold text-xl leading-tight text-black line-clamp-3 font-guyot-headline">
                      {article.headline}
                    </h3>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default LeserfavoritenSlider;
