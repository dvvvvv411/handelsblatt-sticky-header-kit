import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Eye, Users, TrendingUp, Globe, Calendar, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ArticleVisitData {
  id: string;
  title: string;
  slug: string;
  totalVisits: number;
  uniqueVisitors: number;
  redirectClicks: number;
  conversionRate: number;
  published: boolean;
  created_at: string;
}

const StatisticsPage: React.FC = () => {
  const navigate = useNavigate();
  const [visitData, setVisitData] = useState<ArticleVisitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStats, setTotalStats] = useState({
    totalVisits: 0,
    totalUniqueVisitors: 0,
    totalRedirectClicks: 0,
    averageConversionRate: 0
  });

  const fetchVisitAnalytics = async () => {
    try {
      const { data: articles, error: articlesError } = await supabase
        .from('articles')
        .select('id, title, slug, redirect_clicks, published, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (articlesError) throw articlesError;

      const { data: totalStatsData, error: totalStatsError } = await supabase
        .rpc('get_total_visit_stats');

      if (totalStatsError) console.error('Error fetching total stats:', totalStatsError);

      const articlesWithVisits = await Promise.all(
        (articles || []).map(async (article) => {
          const { data: stats, error: statsError } = await supabase
            .rpc('get_article_visit_stats', { p_article_id: article.id });

          if (statsError) {
            console.error('Error fetching stats for article:', article.id, statsError);
            return {
              id: article.id, title: article.title, slug: article.slug,
              totalVisits: 0, uniqueVisitors: 0, redirectClicks: article.redirect_clicks || 0,
              conversionRate: 0, published: article.published, created_at: article.created_at
            };
          }

          const totalVisits = Number(stats?.[0]?.total_visits) || 0;
          const uniqueVisitors = Number(stats?.[0]?.unique_visitors) || 0;
          const redirectClicks = article.redirect_clicks || 0;
          const conversionRate = totalVisits > 0 ? (redirectClicks / totalVisits) * 100 : 0;

          return {
            id: article.id, title: article.title, slug: article.slug,
            totalVisits, uniqueVisitors, redirectClicks,
            conversionRate: Math.round(conversionRate * 100) / 100,
            published: article.published, created_at: article.created_at
          };
        })
      );

      // Sort by visits descending
      articlesWithVisits.sort((a, b) => b.totalVisits - a.totalVisits);
      setVisitData(articlesWithVisits);

      const totalVisits = Number(totalStatsData?.[0]?.total_visits) || 0;
      const totalUniqueVisitors = Number(totalStatsData?.[0]?.unique_visitors) || 0;
      const totalRedirectClicks = articlesWithVisits.reduce((sum, a) => sum + a.redirectClicks, 0);
      const averageConversionRate = articlesWithVisits.length > 0
        ? articlesWithVisits.reduce((sum, a) => sum + a.conversionRate, 0) / articlesWithVisits.length
        : 0;

      setTotalStats({
        totalVisits, totalUniqueVisitors, totalRedirectClicks,
        averageConversionRate: Math.round(averageConversionRate * 100) / 100
      });
    } catch (error) {
      console.error('Error fetching visit analytics:', error);
      toast.error('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVisitAnalytics(); }, []);

  const statCards = [
    { label: 'Total Visits', value: totalStats.totalVisits, icon: Eye, iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-400', borderColor: 'border-blue-100' },
    { label: 'Unique Visitors', value: totalStats.totalUniqueVisitors, icon: Users, iconBg: 'bg-gradient-to-br from-violet-500 to-purple-400', borderColor: 'border-violet-100' },
    { label: 'Redirect Clicks', value: totalStats.totalRedirectClicks, icon: TrendingUp, iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-400', borderColor: 'border-emerald-100' },
    { label: 'Avg. Conversion', value: `${totalStats.averageConversionRate}%`, icon: Globe, iconBg: 'bg-gradient-to-br from-amber-500 to-orange-400', borderColor: 'border-amber-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">Statistiken</h1>
        <p className="text-slate-500 mt-1">Übersicht aller Artikel-Statistiken und Conversions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className={`bg-white rounded-2xl border p-6 ${stat.borderColor}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                {loading ? (
                  <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse mt-2"></div>
                ) : (
                  <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                )}
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${stat.iconBg}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-indigo-50/30">
          <h2 className="font-semibold text-slate-900">Artikel Performance</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">Lade Statistiken...</p>
          </div>
        ) : visitData.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Noch keine Daten</h3>
            <p className="text-slate-500">Statistiken erscheinen sobald Artikel Traffic erhalten.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-indigo-50/30">
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Artikel</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Erstellt</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Visits</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Unique</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Clicks</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {visitData.map((article) => (
                  <tr
                    key={article.id}
                    onClick={() => navigate(`/admin/statistics/${article.id}`)}
                    className="hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-transparent transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <p className="font-medium text-slate-900 truncate max-w-xs">{article.title}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Globe className="w-3 h-3" />/{article.slug}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.created_at).toLocaleDateString('de-DE')}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <Eye className="w-4 h-4 text-blue-400" />{article.totalVisits}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <Users className="w-4 h-4 text-violet-400" />{article.uniqueVisitors}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />{article.redirectClicks}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge
                        variant="outline"
                        className={`font-medium rounded-lg ${
                          article.conversionRate > 0
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}
                      >
                        {article.conversionRate}%
                      </Badge>
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

export default StatisticsPage;
