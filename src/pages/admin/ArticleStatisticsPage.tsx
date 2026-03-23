import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, Eye, Users, TrendingUp, Globe, Clock, Calendar, Copy, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HourlyVisitData {
  hour: number;
  visits: number;
}

interface RedirectData {
  id: string;
  short_code: string;
  original_url: string;
  click_count: number;
  created_at: string;
}

const ArticleStatisticsPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalVisits: 0, uniqueVisitors: 0, redirectClicks: 0, conversionRate: 0 });
  const [hourlyData, setHourlyData] = useState<HourlyVisitData[]>([]);
  const [redirects, setRedirects] = useState<RedirectData[]>([]);

  useEffect(() => {
    if (articleId) fetchAll();
  }, [articleId]);

  const fetchAll = async () => {
    try {
      const [articleRes, statsRes, visitsRes, redirectsRes] = await Promise.all([
        supabase.from('articles').select('id, title, slug, redirect_clicks, created_at, published, category, author').eq('id', articleId!).single(),
        supabase.rpc('get_article_visit_stats', { p_article_id: articleId! }),
        supabase.from('article_visits').select('visited_at').eq('article_id', articleId!)
          .gte('visited_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString())
          .order('visited_at', { ascending: true }),
        supabase.from('redirects').select('id, short_code, original_url, click_count, created_at')
          .eq('article_id', articleId!).order('click_count', { ascending: false }),
      ]);

      if (articleRes.error) throw articleRes.error;
      setArticle(articleRes.data);

      const totalVisits = Number(statsRes.data?.[0]?.total_visits) || 0;
      const uniqueVisitors = Number(statsRes.data?.[0]?.unique_visitors) || 0;
      const redirectClicks = articleRes.data?.redirect_clicks || 0;
      const conversionRate = totalVisits > 0 ? Math.round((redirectClicks / totalVisits) * 10000) / 100 : 0;
      setStats({ totalVisits, uniqueVisitors, redirectClicks, conversionRate });

      // Hourly data
      const hourlyStats: Record<number, number> = {};
      for (let i = 0; i < 24; i++) hourlyStats[i] = 0;
      visitsRes.data?.forEach(v => { hourlyStats[new Date(v.visited_at).getHours()]++; });
      setHourlyData(Object.entries(hourlyStats).map(([h, v]) => ({ hour: parseInt(h), visits: v })));

      setRedirects(redirectsRes.data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Fehler beim Laden der Statistiken');
    } finally {
      setLoading(false);
    }
  };

  const copyShortUrl = (shortCode: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/r/${shortCode}`);
    toast.success('URL kopiert!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Artikel nicht gefunden.</p>
        <Button variant="outline" onClick={() => navigate('/admin/statistics')} className="mt-4">Zurück</Button>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Visits', value: stats.totalVisits, icon: Eye, iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-400', borderColor: 'border-blue-100' },
    { label: 'Unique Visitors', value: stats.uniqueVisitors, icon: Users, iconBg: 'bg-gradient-to-br from-violet-500 to-purple-400', borderColor: 'border-violet-100' },
    { label: 'Redirect Clicks', value: stats.redirectClicks, icon: TrendingUp, iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-400', borderColor: 'border-emerald-100' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: Globe, iconBg: 'bg-gradient-to-br from-amber-500 to-orange-400', borderColor: 'border-amber-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/admin/statistics')} className="mt-1 rounded-xl">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" />/{article.slug}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(article.created_at).toLocaleDateString('de-DE')}</span>
            <span>{article.author}</span>
            <Badge variant="outline" className="text-xs">{article.category}</Badge>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className={`bg-white rounded-2xl border p-6 ${stat.borderColor}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${stat.iconBg}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hourly Visits */}
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-indigo-50/30 flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-500" />
          <h2 className="font-semibold text-slate-900">Stündliche Visits heute</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {hourlyData.map((hour) => (
              <div key={hour.hour} className="text-center">
                <div className="text-xs text-slate-500 mb-1">{hour.hour.toString().padStart(2, '0')}:00</div>
                <div className={`border rounded-lg px-2 py-1.5 ${hour.visits > 0 ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-sm font-semibold ${hour.visits > 0 ? 'text-indigo-700' : 'text-slate-400'}`}>
                    {hour.visits}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Redirect URLs */}
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-indigo-50/30 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <h2 className="font-semibold text-slate-900">Redirect URLs</h2>
        </div>

        {redirects.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">Keine Redirect-URLs für diesen Artikel.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Short Code</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Original URL</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Clicks</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Erstellt</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {redirects.map((r) => (
                  <tr key={r.id} className="hover:bg-indigo-50/20 transition-colors">
                    <td className="py-3 px-4">
                      <button onClick={() => copyShortUrl(r.short_code)} className="font-mono text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5">
                        {r.short_code}<Copy className="w-3 h-3 text-indigo-400" />
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-slate-500 truncate max-w-xs" title={r.original_url}>{r.original_url}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={r.click_count > 0 ? 'default' : 'secondary'} className={r.click_count > 0 ? 'bg-gradient-to-r from-indigo-500 to-violet-500 border-0 shadow-sm rounded-lg' : 'bg-slate-100 text-slate-500 rounded-lg'}>
                        {r.click_count}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />{new Date(r.created_at).toLocaleDateString('de-DE')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="icon" onClick={() => window.open(r.original_url, '_blank')} className="h-8 w-8 rounded-lg hover:bg-indigo-50">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleStatisticsPage;
