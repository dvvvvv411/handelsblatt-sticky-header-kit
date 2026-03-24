
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { CheckCircle, Shield, Lock, Zap } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwörter stimmen nicht überein');
      setLoading(false);
      return;
    }

    try {
      const result = isLogin
        ? await signIn(email, password)
        : await signUp(email, password);

      if (result.error) {
        toast.error(result.error.message);
      } else if (isLogin) {
        toast.success('Erfolgreich angemeldet!');
      } else {
        toast.success('Account erstellt! Bitte bestätige deine E-Mail-Adresse.');
      }
    } catch {
      toast.error('Ein unerwarteter Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel - desktop only */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 relative flex-col justify-between p-12 overflow-hidden">
        {/* Decorative SVG elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated ring 1 */}
          <svg className="absolute -top-20 -right-20 w-80 h-80 opacity-10" viewBox="0 0 200 200" style={{ animation: 'spin 25s linear infinite' }}>
            <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="12 8" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="url(#grad1)" strokeWidth="0.5" strokeDasharray="6 12" />
            <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#a78bfa" /></linearGradient></defs>
          </svg>
          {/* Animated ring 2 */}
          <svg className="absolute bottom-10 -left-16 w-64 h-64 opacity-10" viewBox="0 0 200 200" style={{ animation: 'spin 35s linear infinite reverse' }}>
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#grad2)" strokeWidth="1" strokeDasharray="20 10" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="url(#grad2)" strokeWidth="0.5" strokeDasharray="4 16" />
            <defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
          </svg>
          {/* Dot grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
          {/* Floating orbs */}
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/6 w-36 h-36 bg-violet-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Edge accents */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />
        <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent">Fake-News.to</div>
        </div>

        {/* Main content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Erstelle überzeugende<br />Fake News für jedes Projekt.
            </h1>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Dein Portal für professionelle Fake-News-Artikel. Erstelle täuschend echte Nachrichtenartikel im Handelsblatt-Design – perfekt für Marketingkampagnen, Produktlaunches und virale Reichweite.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Artikel im Handelsblatt-Look erstellen',
              'Eigene Redirect-Links & Tracking',
              'CTA-Cards für maximale Conversions',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
                <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges + copyright */}
        <div className="relative z-10 space-y-6">
          <div className="flex gap-6">
            {[
              { icon: Shield, label: '100% Anonym' },
              { icon: Lock, label: 'Keine Spuren' },
              { icon: Zap, label: 'Sofort online' },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-500 text-xs">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-sm">© 2026 Fake-News.to</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/20 px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Tab switcher */}
          <div className="flex gap-6 mb-8 border-b border-slate-200">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`pb-3 text-sm font-medium transition-colors ${
                isLogin
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-400 hover:text-indigo-500'
              }`}
            >
              Anmelden
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`pb-3 text-sm font-medium transition-colors ${
                !isLogin
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-400 hover:text-indigo-500'
              }`}
            >
              Registrieren
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {isLogin ? 'Willkommen zurück' : 'Account erstellen'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {isLogin
                ? 'Melde dich an, um auf dein Panel zuzugreifen.'
                : 'Registriere dich mit deiner E-Mail-Adresse.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@beispiel.de"
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                required
              />
            </div>

            {/* Confirm password - register only */}
            <div
            className={`transition-all duration-300 overflow-hidden p-0.5 -m-0.5 ${
                !isLogin ? 'max-h-28 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Passwort bestätigen
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                required={!isLogin}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Laden...' : isLogin ? 'Anmelden' : 'Account erstellen'}
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs mt-8 lg:hidden">
            © 2026 Fake-News.to
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
