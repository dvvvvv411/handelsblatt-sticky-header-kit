
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const UnserePartnerSlider = () => {
  const partnerContent = [
    {
      id: 1,
      image: "https://images.handelsblatt.com/HTxfdyuT9WgV/cover/380/214/0/0/0/0/0.5/0.5/handelsblatt_otto.avif",
      kicker: "OTTO",
      headline: "Exklusive Rabatte und Gutscheine für Premium-Produkte"
    },
    {
      id: 2,
      image: "https://images.handelsblatt.com/HwKWf9coR7St/cover/380/214/0/0/0/1/0.5/0.5/remindme-partner-banner.avif",
      kicker: "remind.me",
      headline: "Strom- und Gaspreistief jetzt nutzen - Kostenloser Vergleich"
    },
    {
      id: 3,
      image: "https://images.handelsblatt.com/k9Necl9LoX9E/cover/380/214/1/0/0/0/0.5/0.5/bild-29032928.avif",
      kicker: "Homeday",
      headline: "Immobilienbewertung kostenlos und unverbindlich"
    },
    {
      id: 4,
      image: "https://images.handelsblatt.com/ROUXB3ehXdux/cover/380/214/0/0/0/0/0.5/0.5/jobfinder.avif",
      kicker: "STELLENMARKT",
      headline: "Traumjob finden bei Deutschlands führenden Arbeitgebern"
    },
    {
      id: 5,
      image: "https://images.handelsblatt.com/xw1RHCdAnMAq/cover/380/214/0/0/0/0/0.5/0.5/expertentesten.avif",
      kicker: "Finanzierung",
      headline: "Günstige Kredite für Ihre Pläne - Jetzt vergleichen"
    },
  ];

  return (
    <section className="w-full">
      {/* Header */}
      <h2 className="text-3xl font-druk-normal text-black mb-6">Unsere Partner</h2>

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
              <div className="w-[240px] bg-white hover:bg-gray-50 transition-colors overflow-hidden">
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
                    <span className="text-base font-bold text-black">{item.kicker}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-bold text-base leading-tight text-black hover:underline cursor-pointer font-guyot-headline">
                    {item.headline}
                  </h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default UnserePartnerSlider;
