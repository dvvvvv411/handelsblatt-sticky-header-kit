
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const UnserePartnerSlider = () => {
  const partnerContent = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=240&h=135&fit=crop",
      kicker: "OTTO",
      headline: "Exklusive Rabatte und Gutscheine für Premium-Produkte"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=240&h=135&fit=crop",
      kicker: "remind.me",
      headline: "Strom- und Gaspreistief jetzt nutzen - Kostenloser Vergleich"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=240&h=135&fit=crop",
      kicker: "Homeday",
      headline: "Immobilienbewertung kostenlos und unverbindlich"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=240&h=135&fit=crop",
      kicker: "STELLENMARKT",
      headline: "Traumjob finden bei Deutschlands führenden Arbeitgebern"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=240&h=135&fit=crop",
      kicker: "Finanzierung",
      headline: "Günstige Kredite für Ihre Pläne - Jetzt vergleichen"
    },
  ];

  return (
    <section className="w-full">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Unsere Partner</h2>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {partnerContent.map((item) => (
            <CarouselItem key={item.id} className="pl-4 basis-auto">
              <div className="w-[240px] bg-gray-50 border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* Anzeige Badge */}
                <div className="bg-gray-100 px-3 py-1">
                  <span className="text-xs font-bold text-gray-700">Anzeige</span>
                </div>

                {/* Image */}
                <div className="relative aspect-[1.77778] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.headline}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Kicker */}
                  <div className="mb-2">
                    <span className="text-sm font-bold text-blue-600">{item.kicker}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-bold text-sm leading-tight text-gray-900 hover:underline cursor-pointer">
                    {item.headline}
                  </h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="flex justify-center gap-4 mt-6">
          <CarouselPrevious className="static translate-y-0 w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400" />
          <CarouselNext className="static translate-y-0 w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400" />
        </div>
      </Carousel>
    </section>
  );
};

export default UnserePartnerSlider;
