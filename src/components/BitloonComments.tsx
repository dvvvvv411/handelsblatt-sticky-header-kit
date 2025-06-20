
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const BitloonComments = () => {
  const comments = [
    {
      id: 1,
      name: "Michael Weber",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      fallback: "MW",
      date: "vor 2 Tagen",
      rating: 5,
      text: "Bin seit 3 Monaten dabei und habe bereits über 1.800€ Gewinn gemacht. Der Bot arbeitet wirklich rund um die Uhr für mich!"
    },
    {
      id: 2,
      name: "Sarah Müller",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      fallback: "SM",
      date: "vor 4 Tagen",
      rating: 5,
      text: "Als Anfängerin war ich skeptisch, aber die KI macht wirklich alles automatisch. Perfekt für Berufstätige wie mich."
    },
    {
      id: 3,
      name: "Thomas Klein",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      fallback: "TK",
      date: "vor 1 Woche",
      rating: 5,
      text: "Der Code HANDELSBLATT50 hat super funktioniert. Kann Bitloon nur weiterempfehlen - seriös und transparent."
    },
    {
      id: 4,
      name: "Julia Schmidt",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      fallback: "JS",
      date: "vor 1 Woche",
      rating: 4,
      text: "Läuft seit 6 Wochen stabil. Die monatlichen Berichte sind sehr detailliert und verständlich."
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="bg-white border-2 rounded-none shadow-sm mt-4" 
      style={{
        padding: '32px',
        borderColor: '#e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <span 
          className="text-xs font-druk-web tracking-wider px-3 py-1 rounded-sm" 
          style={{
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            fontSize: '11px'
          }}
        >
          NUTZERERFAHRUNGEN
        </span>
      </div>

      {/* Comments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {comments.map((comment) => (
          <div 
            key={comment.id}
            className="border rounded-sm p-4"
            style={{
              backgroundColor: '#fafafa',
              borderColor: '#e2e8f0'
            }}
          >
            {/* User Header */}
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar} alt={comment.name} />
                <AvatarFallback className="text-xs font-medium">
                  {comment.fallback}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 
                    className="font-classic-grotesque text-sm font-medium"
                    style={{ color: '#1e293b' }}
                  >
                    {comment.name}
                  </h4>
                  {renderStars(comment.rating)}
                </div>
                <div 
                  className="font-classic-grotesque text-xs"
                  style={{ color: '#64748b' }}
                >
                  {comment.date}
                </div>
              </div>
            </div>

            {/* Comment Text */}
            <p 
              className="font-classic-grotesque text-sm leading-relaxed"
              style={{ color: '#475569' }}
            >
              {comment.text}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div 
        className="mt-8 pt-6 border-t text-center" 
        style={{ borderColor: '#e2e8f0' }}
      >
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span 
              className="font-classic-grotesque"
              style={{ color: '#64748b' }}
            >
              4.8/5 Sterne
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span 
              className="font-classic-grotesque"
              style={{ color: '#64748b' }}
            >
              1.200+ Bewertungen
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitloonComments;
