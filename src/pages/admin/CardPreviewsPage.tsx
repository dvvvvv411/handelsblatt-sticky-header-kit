import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArticlePaywall from '@/components/ArticlePaywall';
import ArticleBovensiepenPartners from '@/components/ArticleBovensiepenPartners';
import ArticleBraunInvestments from '@/components/ArticleBraunInvestments';
import CustomCardPreview from '@/components/CustomCardPreview';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface CustomCard {
  id: string;
  name: string;
  sponsor_label: string;
  logo_url: string | null;
  headline: string;
  description: string;
  trust_indicator_1: string;
  trust_indicator_2: string;
  metric_value: string;
  metric_label: string;
  service_title: string;
  service_line_1: string;
  service_line_2: string;
  cta_button_text: string;
  accent_color: string;
  disclaimer_text: string;
  created_at: string;
}

const CardPreviewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isKunde } = useAuth();
  const [customCards, setCustomCards] = useState<CustomCard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    let query = supabase.from('custom_cards').select('*').order('created_at', { ascending: false });
    if (isKunde && !isAdmin && user) {
      query = query.eq('created_by', user.id);
    }
    const { data, error } = await (query as any);
    if (!error && data) setCustomCards(data);
    setLoading(false);
  };

  useEffect(() => { fetchCards(); }, []);

  const deleteCard = async (id: string, name: string) => {
    if (!confirm(`"${name}" wirklich löschen?`)) return;
    const { error } = await supabase.from('custom_cards').delete().eq('id', id) as any;
    if (error) { toast.error('Fehler beim Löschen'); return; }
    toast.success('Card gelöscht');
    setCustomCards(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Card Previews</h1>
          <p className="text-slate-400 mt-1 text-sm">Vorschau aller Werbe-Cards</p>
        </div>
        <Button
          onClick={() => navigate('/admin/card-previews/create')}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white"
        >
          <Plus className="h-4 w-4 mr-2" /> Neue Card
        </Button>
      </div>

      {/* Built-in Cards */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-white">Standard-Cards</h2>
        
        {[
          { label: 'Bitloon Card', color: 'orange', component: <ArticlePaywall /> },
          { label: 'Bovensiepen & Partner Card', color: 'blue', component: <ArticleBovensiepenPartners /> },
          { label: 'Braun Investments Card', color: 'emerald', component: <ArticleBraunInvestments /> },
        ].map(({ label, color, component }) => (
          <div key={label} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-br from-${color}-400 to-${color}-500 shadow-lg shadow-${color}-500/30`}></div>
              <h3 className="text-sm font-semibold text-slate-300">{label}</h3>
            </div>
            <div className="bg-white rounded-xl border border-slate-700/30 p-4 lg:p-6 shadow-sm">
              {component}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Cards */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-white">Benutzerdefinierte Cards</h2>
        
        {loading ? (
          <p className="text-slate-500 text-sm">Laden...</p>
        ) : customCards.length === 0 ? (
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 text-center">
            <p className="text-slate-400 text-sm">Noch keine benutzerdefinierten Cards erstellt.</p>
            <Button
              onClick={() => navigate('/admin/card-previews/create')}
              variant="ghost"
              className="mt-3 text-indigo-400 hover:text-indigo-300"
            >
              <Plus className="h-4 w-4 mr-1" /> Erste Card erstellen
            </Button>
          </div>
        ) : (
          customCards.map(card => (
            <div key={card.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: card.accent_color }}></div>
                  <h3 className="text-sm font-semibold text-slate-300">{card.name}</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteCard(card.id, card.name)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-white rounded-xl border border-slate-700/30 p-4 lg:p-6 shadow-sm">
                <CustomCardPreview
                  sponsorLabel={card.sponsor_label}
                  logoUrl={card.logo_url || undefined}
                  headline={card.headline}
                  description={card.description}
                  trustIndicator1={card.trust_indicator_1}
                  trustIndicator2={card.trust_indicator_2}
                  metricValue={card.metric_value}
                  metricLabel={card.metric_label}
                  serviceTitle={card.service_title}
                  serviceLine1={card.service_line_1}
                  serviceLine2={card.service_line_2}
                  ctaButtonText={card.cta_button_text}
                  accentColor={card.accent_color}
                  disclaimerText={card.disclaimer_text}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardPreviewsPage;
