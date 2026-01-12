import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Eye, Users, TrendingUp, Globe, Clock, ChevronDown, ChevronRight } from 'lucide-react';
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

interface HourlyVisitData {
  hour: number;
  visits: number;
}

const VisitsPage: React.FC = () => {
  const [visitData, setVisitData] = useState<ArticleVisitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStats, setTotalStats] = useState({
    totalVisits: 0,
    totalUniqueVisitors: 0,
    totalRedirectClicks: 0,
    averageConversionRate: 0
  });
  const [hourlyData, setHourlyData] = useState<Record<string, HourlyVisitData[]>>({});
  const [loadingHourly, setLoadingHourly] = useState<Record<string, boolean>>({});
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const fetchVisitAnalytics = async () => {
    try {
      const { data: articles, error: articlesError } = await supabase
        .from('articles')
        .select('id, title, slug, redirect_clicks, published, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (articlesError) throw articlesError;

      const articlesWithVisits = await Promise.all(
        (articles || []).map(async (article) => {
          const { data: visits, error: visitsError } = await supabase
            .from('article_visits')
            .select('visitor_id')
            .eq('article_id', article.id);

          if (visitsError) {
            console.error('Error fetching visits for article:', article.id, visitsError);
            return {
              id: article.id,
              title: article.title,
              slug: article.slug,
              totalVisits: 0,
              uniqueVisitors: 0,
              redirectClicks: article.redirect_clicks || 0,
              conversionRate: 0,
              published: article.published,
              created_at: article.created_at
            };
          }

          const totalVisits = visits?.length || 0;
          const uniqueVisitors = new Set(visits?.map(v => v.visitor_id)).size || 0;
          const redirectClicks = article.redirect_clicks || 0;
          const conversionRate = totalVisits > 0 ? (redirectClicks / totalVisits) * 100 : 0;

          return {
            id: article.id,
            title: article.title,
            slug: article.slug,
            totalVisits,
            uniqueVisitors,
            redirectClicks,
            conversionRate: Math.round(conversionRate * 100) / 100,
            published: article.published,
            created_at: article.created_at
          };
        })
      );

      setVisitData(articlesWithVisits);

      const totalVisits = articlesWithVisits.reduce((sum, article) => sum + article.totalVisits, 0);
      const totalUniqueVisitors = articlesWithVisits.reduce((sum, article) => sum + article.uniqueVisitors, 0);
      const totalRedirectClicks = articlesWithVisits.reduce((sum, article) => sum + article.redirectClicks, 0);
      const averageConversionRate = articlesWithVisits.length > 0 
        ? articlesWithVisits.reduce((sum, article) => sum + article.conversionRate, 0) / articlesWithVisits.length
        : 0;

      setTotalStats({
        totalVisits,
        totalUniqueVisitors,
        totalRedirectClicks,
        averageConversionRate: Math.round(averageConversionRate * 100) / 100
      });

    } catch (error) {
      console.error('Error fetching visit analytics:', error);
      toast.error('Failed to fetch visit analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchHourlyVisits = async (articleId: string) => {
    if (hourlyData[articleId]) return;

    setLoadingHourly(prev => ({ ...prev, [articleId]: true }));

    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      const { data: visits, error } = await supabase
        .from('article_visits')
        .select('visited_at')
        .eq('article_id', articleId)
        .gte('visited_at', startOfDay.toISOString())
        .order('visited_at', { ascending: true });

      if (error) throw error;

      const hourlyStats: Record<number, number> = {};
      
      for (let i = 0; i < 24; i++) {
        hourlyStats[i] = 0;
      }

      visits?.forEach(visit => {
        const hour = new Date(visit.visited_at).getHours();
        hourlyStats[hour]++;
      });

      const hourlyArray: HourlyVisitData[] = Object.entries(hourlyStats).map(([hour, visits]) => ({
        hour: parseInt(hour),
        visits
      }));

      setHourlyData(prev => ({ ...prev, [articleId]: hourlyArray }));
    } catch (error) {
      console.error('Error fetching hourly visits:', error);
      toast.error('Failed to fetch hourly visit data');
    } finally {
      setLoadingHourly(prev => ({ ...prev, [articleId]: false }));
    }
  };

  const toggleArticleExpansion = (articleId: string) => {
    if (expandedArticle === articleId) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(articleId);
      fetchHourlyVisits(articleId);
    }
  };

  useEffect(() => {
    fetchVisitAnalytics();
  }, []);

  const statCards = [
    { label: 'Total Visits', value: totalStats.totalVisits, icon: Eye },
    { label: 'Unique Visitors', value: totalStats.totalUniqueVisitors, icon: Users },
    { label: 'Redirect Clicks', value: totalStats.totalRedirectClicks, icon: TrendingUp },
    { label: 'Avg. Conversion', value: `${totalStats.averageConversionRate}%`, icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Visit Analytics</h1>
        <p className="text-slate-500 mt-1">Track article visits and conversion rates</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                {loading ? (
                  <div className="h-8 w-16 bg-slate-100 rounded animate-pulse mt-2"></div>
                ) : (
                  <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                )}
              </div>
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-slate-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">Articles Performance</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">Loading visit data...</p>
          </div>
        ) : visitData.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No visit data yet</h3>
            <p className="text-slate-500">Visit data will appear once articles start receiving traffic.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {visitData.map((article) => (
              <div key={article.id}>
                <button
                  onClick={() => toggleArticleExpansion(article.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{article.title}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                      <Globe className="w-3 h-3" />
                      /{article.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-700">{article.totalVisits}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-700">{article.uniqueVisitors}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-700">{article.redirectClicks}</span>
                      </div>
                      <Badge variant="outline" className="font-medium">
                        {article.conversionRate}%
                      </Badge>
                    </div>
                    {expandedArticle === article.id ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Hourly View */}
                {expandedArticle === article.id && (
                  <div className="px-4 pb-4 bg-slate-50 border-t border-slate-100">
                    <div className="flex items-center gap-2 py-3">
                      <Clock className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">Hourly Visits Today</span>
                    </div>
                    
                    {loadingHourly[article.id] ? (
                      <div className="flex items-center justify-center py-6">
                        <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin mr-2"></div>
                        <span className="text-sm text-slate-500">Loading...</span>
                      </div>
                    ) : hourlyData[article.id] ? (
                      <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                        {hourlyData[article.id].map((hour) => (
                          <div key={hour.hour} className="text-center">
                            <div className="text-xs text-slate-500 mb-1">
                              {hour.hour.toString().padStart(2, '0')}:00
                            </div>
                            <div className="bg-white border border-slate-200 rounded px-2 py-1">
                              <span className="text-sm font-semibold text-slate-900">
                                {hour.visits}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitsPage;
