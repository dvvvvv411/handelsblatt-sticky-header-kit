import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Bookmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const LeserfavoritenSlider = () => {
  const articles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=225&fit=crop",
      kicker: "Technologie",
      isPremium: true,
      headline: "KI-Revolution: Wie künstliche Intelligenz unsere Arbeitswelt verändert",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=225&fit=crop",
      kicker: "Finanzen",
      isPremium: false,
      headline: "Zinswende: Was Sparer und Anleger jetzt wissen müssen",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225&fit=crop",
      kicker: "Wirtschaft",
      isPremium: true,
      headline: "Energiekrise: Deutsche Unternehmen suchen neue Wege",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
      kicker: "Politik",
      isPremium: false,
      headline: "EU-Gipfel: Neue Beschlüsse zur Klimapolitik erwartet",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=225&fit=crop",
      kicker: "Märkte",
      isPremium: true,
      headline: "Börsenausblick 2025: Diese Aktien stehen im Fokus",
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
                  <h3 className="font-bold text-xl leading-tight text-black hover:underline cursor-pointer line-clamp-3 font-guyot-headline">
                    {article.headline}
                  </h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="static translate-y-0 w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400" />
        <CarouselNext className="static translate-y-0 w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400" />
      </Carousel>
    </section>
  );
};

export default LeserfavoritenSlider;
