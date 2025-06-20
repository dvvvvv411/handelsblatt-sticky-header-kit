
import React from 'react';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Music,
  Headphones,
  Podcast,
  Disc3
} from 'lucide-react';

const HandelsblattFooter = () => {
  const column1Links = [
    { title: "Feedback geben", href: "#" },
    { title: "Kontakt Hilfe", href: "#" },
    { title: "Abo kündigen", href: "#" },
    { title: "Nutzungsrechte erwerben", href: "#" }
  ];

  const column2Links = [
    { title: "AGB", href: "#" },
    { title: "Impressum", href: "#" },
    { title: "Online-Archiv", href: "#" },
    { title: "Datenschutzerklärung", href: "#" },
    { title: "Datenschutzeinstellungen", href: "#" }
  ];

  const column3Links = [
    { title: "Utiq verwalten", href: "#" },
    { title: "Holtzbrinck-Schule für Journalismus", href: "#" },
    { title: "Veranstaltungen", href: "#" },
    { title: "Brutto-Netto-Rechner", href: "#" },
    { title: "Geschäftskonto-Vergleich", href: "#" }
  ];

  const column4Links = [
    { title: "Morning Briefing", href: "#" },
    { title: "WirtschaftsWoche", href: "#" },
    { title: "karriere.de", href: "#" },
    { title: "Handelsblatt-Shop", href: "#" },
    { title: "Absatzwirtschaft", href: "#" },
    { title: "iq digital", href: "#" },
    { title: "Research Institute", href: "#" },
    { title: "Organisations-Entwicklung", href: "#" },
    { title: "Finanzvergleiche", href: "#" },
    { title: "GBI-Genios", href: "#" },
    { title: "Produktvergleich", href: "#" },
    { title: "Creditreform", href: "#" },
    { title: "Pressemonitor", href: "#" },
    { title: "Firmenprofile", href: "#" }
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/handelsblatt", title: "X" },
    { icon: Facebook, href: "https://www.facebook.com/handelsblatt", title: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/handelsblatt/", title: "Instagram" },
    { icon: Linkedin, href: "https://de.linkedin.com/company/handelsblatt/", title: "LinkedIn" },
    { icon: Music, href: "#", title: "Xing" },
    { icon: Headphones, href: "https://open.spotify.com/user/qq5bxb2mnzcelsqy3intlhyfh", title: "Spotify" },
    { icon: Podcast, href: "https://podcasts.apple.com/de/channel/handelsblatt/id6442466124", title: "Apple Music" },
    { icon: Disc3, href: "https://www.deezer.com/de/show/1642872", title: "Deezer" }
  ];

  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12" style={{ backgroundColor: '#333333' }}>
        {/* Menu Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Services */}
          <nav>
            <h3 className="text-lg font-bold text-white mb-6 font-guyot-headline">Services</h3>
            <ul className="space-y-3">
              {column1Links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-white hover:text-gray-300 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 2 - Legal */}
          <nav>
            <h3 className="text-lg font-bold text-white mb-6 font-guyot-headline">Legal</h3>
            <ul className="space-y-3">
              {column2Links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-white hover:text-gray-300 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 - Tools */}
          <nav>
            <h3 className="text-lg font-bold text-white mb-6 font-guyot-headline">Tools</h3>
            <ul className="space-y-3">
              {column3Links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-white hover:text-gray-300 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 - Partners */}
          <nav>
            <h3 className="text-lg font-bold text-white mb-6 font-guyot-headline">Partners</h3>
            <ul className="space-y-3">
              {column4Links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-white hover:text-gray-300 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Social Media */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  title={social.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-600 hover:bg-gray-500 rounded-full transition-colors"
                >
                  <IconComponent size={20} className="text-white" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Logo */}
        <div className="mb-8">
          <a href="https://www.handelsblatt.com/" className="inline-block">
            <div className="text-2xl font-bold text-white">
              Handelsblatt
            </div>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-white">
          <p>
            © 2025 Handelsblatt GmbH - ein Unternehmen der{' '}
            <a 
              href="https://handelsblattgroup.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              Handelsblatt Media Group GmbH & Co. KG
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HandelsblattFooter;
