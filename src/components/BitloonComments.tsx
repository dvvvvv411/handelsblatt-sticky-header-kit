
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

const BitloonComments = () => {
  const [commentText, setCommentText] = useState('');
  const { toast } = useToast();

  const comments = [
    {
      id: 1,
      name: "Michael W.",
      fullName: "Michael Weber",
      location: "Hamburg",
      date: "vor 2 Tagen",
      text: "Bin seit 3 Monaten dabei und habe bereits über 1.800€ Gewinn gemacht. Der Bot arbeitet wirklich rund um die Uhr für mich!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah M.", 
      fullName: "Sarah Müller",
      location: "München",
      date: "vor 4 Tagen",
      text: "Als Anfängerin war ich skeptisch, aber die KI macht wirklich alles automatisch. Perfekt für Berufstätige wie mich.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Thomas K.",
      fullName: "Thomas Klein",
      location: "Berlin",
      date: "vor 1 Woche", 
      text: "Der Code HANDELSBLATT50 hat super funktioniert. Kann Bitloon nur weiterempfehlen - seriös und transparent.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Julia S.",
      fullName: "Julia Schmidt",
      location: "Frankfurt",
      date: "vor 1 Woche",
      text: "Läuft seit 6 Wochen stabil. Die monatlichen Berichte sind sehr detailliert und verständlich.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Andreas B.",
      fullName: "Andreas Becker",
      location: "Köln", 
      date: "vor 2 Wochen",
      text: "Endlich eine Plattform, die hält was sie verspricht. Die Transparenz bei den Trades ist vorbildlich.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Anmeldung erforderlich",
      description: "Sie müssen angemeldet sein, um einen Kommentar zu schreiben.",
      variant: "destructive",
    });
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

      {/* Comment Form */}
      <div 
        className="mb-8 p-4 border rounded-sm"
        style={{
          backgroundColor: '#f8fafc',
          borderColor: '#e2e8f0'
        }}
      >
        <h4 
          className="font-classic-grotesque text-sm font-medium mb-3"
          style={{ color: '#1e293b' }}
        >
          Kommentar schreiben
        </h4>
        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Teilen Sie Ihre Erfahrungen mit Bitloon..."
            className="resize-none"
            rows={3}
          />
          <div className="flex justify-end">
            <Button 
              type="submit"
              size="sm"
              style={{
                backgroundColor: '#1e293b',
                color: 'white'
              }}
              className="hover:opacity-90"
            >
              Kommentar veröffentlichen
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
            {/* Comment Header */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
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
                "{comment.text}"
              </p>
            </div>
          </div>
        ))}
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
