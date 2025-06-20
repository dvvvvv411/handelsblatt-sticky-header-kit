
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselApi, CarouselPrevious, CarouselNext } from './ui/carousel';
import { Star } from 'lucide-react';

const BitloonComments = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const comments = [
    {
      id: 1,
      name: "Michael W.",
      fullName: "Michael Weber",
      location: "Hamburg",
      date: "vor 2 Tagen",
      text: "Bin seit 3 Monaten dabei und habe bereits über 1.800€ Gewinn gemacht. Der Bot arbeitet wirklich rund um die Uhr für mich!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah M.", 
      fullName: "Sarah Müller",
      location: "München",
      date: "vor 4 Tagen",
      text: "Als Anfängerin war ich skeptisch, aber die KI macht wirklich alles automatisch. Perfekt für Berufstätige wie mich.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      id: 3,
      name: "Thomas K.",
      fullName: "Thomas Klein",
      location: "Berlin",
      date: "vor 1 Woche", 
      text: "Der Code HANDELSBLATT50 hat super funktioniert. Kann Bitloon nur weiterempfehlen - seriös und transparent.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      id: 4,
      name: "Julia S.",
      fullName: "Julia Schmidt",
      location: "Frankfurt",
      date: "vor 1 Woche",
      text: "Läuft seit 6 Wochen stabil. Die monatlichen Berichte sind sehr detailliert und verständlich.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 4
    },
    {
      id: 5,
      name: "Andreas B.",
      fullName: "Andreas Becker",
      location: "Köln", 
      date: "vor 2 Wochen",
      text: "Endlich eine Plattform, die hält was sie verspricht. Die Transparenz bei den Trades ist vorbildlich.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 5
    }
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="bg-white border-t-2 mt-8 pt-8" 
      style={{
        borderColor: '#1e293b'
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 
          className="font-druk-web text-sm tracking-wider mb-2"
          style={{
            color: '#1e293b',
            fontSize: '13px'
          }}
        >
          LESERSTIMMEN ZU BITLOON
        </h3>
        <div 
          className="w-12 h-0.5"
          style={{
            backgroundColor: '#1e293b'
          }}
        />
      </div>

      {/* Comments Carousel */}
      <div className="mb-8 relative">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselPrevious 
            className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            style={{ left: '-4rem' }}
          />
          
          <CarouselContent className="-ml-4">
            {comments.map((comment) => (
              <CarouselItem key={comment.id} className="pl-4 basis-auto">
                <div className="w-[350px] bg-white border border-gray-200 rounded-sm p-6 hover:shadow-sm transition-shadow">
                  {/* Comment Header */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.avatar} alt={comment.fullName} />
                          <AvatarFallback className="text-xs" style={{ backgroundColor: '#e2e8f0', color: '#64748b' }}>
                            {comment.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center space-x-2">
                          <span 
                            className="font-classic-grotesque text-sm font-medium"
                            style={{ color: '#1e293b' }}
                          >
                            {comment.name}
                          </span>
                          <span 
                            className="font-classic-grotesque text-xs"
                            style={{ color: '#64748b' }}
                          >
                            aus {comment.location}
                          </span>
                        </div>
                      </div>
                      <span 
                        className="font-classic-grotesque text-xs"
                        style={{ color: '#94a3b8' }}
                      >
                        {comment.date}
                      </span>
                    </div>
                    
                    {/* Star Rating - Left aligned with content */}
                    <div className="pl-11">
                      {renderStars(comment.rating)}
                    </div>
                  </div>

                  {/* Comment Text */}
                  <div className="pl-11">
                    <p 
                      className="font-classic-grotesque text-sm leading-relaxed"
                      style={{ 
                        color: '#374151',
                        lineHeight: '1.6'
                      }}
                    >
                      {comment.text}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselNext 
            className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            style={{ right: '-4rem' }}
          />
          
          {/* Modern Line Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                className={`h-0.5 transition-all duration-300 ${
                  index + 1 === current 
                    ? 'w-8 bg-gray-800' 
                    : 'w-4 bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Footer Summary */}
      <div 
        className="mt-8 pt-6 border-t" 
        style={{ borderColor: '#e2e8f0' }}
      >
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <span 
              className="font-classic-grotesque"
              style={{ color: '#64748b' }}
            >
              Über 1.200 Bewertungen
            </span>
            <span 
              className="font-classic-grotesque"
              style={{ color: '#64748b' }}
            >
              Durchschnitt: 4.8/5 Sterne
            </span>
          </div>
          <span 
            className="font-classic-grotesque text-xs"
            style={{ color: '#94a3b8' }}
          >
            Alle Kommentare werden vor Veröffentlichung geprüft
          </span>
        </div>
      </div>
    </div>
  );
};

export default BitloonComments;
