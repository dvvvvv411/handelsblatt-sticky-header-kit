
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
        {/* Subtle geometric accent */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />
        <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <div>
          <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent">Panel</div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Verwalte deine<br />Artikel & Kampagnen.
          </h1>
          <p className="text-slate-400 text-lg max-w-md">
            Erstelle, veröffentliche und analysiere deine Inhalte – alles an einem Ort.
          </p>
        </div>

        <p className="text-slate-600 text-sm">© 2026 Panel</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Tab switcher */}
          <div className="flex gap-6 mb-8 border-b border-slate-200">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`pb-3 text-sm font-medium transition-colors ${
                isLogin
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Anmelden
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`pb-3 text-sm font-medium transition-colors ${
                !isLogin
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-400 hover:text-slate-600'
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
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-sm"
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
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-sm"
                required
              />
            </div>

            {/* Confirm password - register only */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                !isLogin ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
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
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-sm"
                required={!isLogin}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Laden...' : isLogin ? 'Anmelden' : 'Account erstellen'}
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs mt-8 lg:hidden">
            © 2026 Panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
