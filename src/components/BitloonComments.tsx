
import React from 'react';

const BitloonComments = () => {
  const comments = [
    {
      id: 1,
      name: "Michael Weber",
      location: "Hamburg",
      date: "vor 2 Tagen",
      text: "Bin seit 3 Monaten dabei und habe bereits über 1.800€ Gewinn gemacht. Der Bot arbeitet wirklich rund um die Uhr für mich!"
    },
    {
      id: 2,
      name: "Sarah Müller", 
      location: "München",
      date: "vor 4 Tagen",
      text: "Als Anfängerin war ich skeptisch, aber die KI macht wirklich alles automatisch. Perfekt für Berufstätige wie mich."
    },
    {
      id: 3,
      name: "Thomas Klein",
      location: "Berlin",
      date: "vor 1 Woche", 
      text: "Der Code HANDELSBLATT50 hat super funktioniert. Kann Bitloon nur weiterempfehlen - seriös und transparent."
    },
    {
      id: 4,
      name: "Julia Schmidt",
      location: "Frankfurt",
      date: "vor 1 Woche",
      text: "Läuft seit 6 Wochen stabil. Die monatlichen Berichte sind sehr detailliert und verständlich."
    },
    {
      id: 5,
      name: "Andreas Becker",
      location: "Köln", 
      date: "vor 2 Wochen",
      text: "Endlich eine Plattform, die hält was sie verspricht. Die Transparenz bei den Trades ist vorbildlich."
    }
  ];

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

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
            {/* Comment Header */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
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
                <span 
                  className="font-classic-grotesque text-xs"
                  style={{ color: '#94a3b8' }}
                >
                  {comment.date}
                </span>
              </div>
            </div>

            {/* Comment Text */}
            <div className="pl-0">
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
