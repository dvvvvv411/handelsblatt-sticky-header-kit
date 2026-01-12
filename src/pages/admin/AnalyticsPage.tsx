import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ExternalLink, BarChart3, Link, TrendingUp, Globe, Calendar, Copy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ClickData {
  id: string;
  short_code: string;
  original_url: string;
  click_count: number;
  created_at: string;
  updated_at: string;
  article?: {
    title: string;
    slug: string;
    redirect_clicks: number;
  };
}

const AnalyticsPage: React.FC = () => {
  const [clickData, setClickData] = useState<ClickData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);

  const fetchClickData = async () => {
    try {
      const { data: redirects, error } = await supabase
        .from('redirects')
        .select(`
          id,
          short_code,
          original_url,
          click_count,
          created_at,
          updated_at,
          articles (
            title,
            slug,
            redirect_clicks
          )
        `)
        .order('click_count', { ascending: false });

      if (error) throw error;

      const processedData = redirects?.map(redirect => ({
        ...redirect,
        article: redirect.articles ? {
          title: redirect.articles.title,
          slug: redirect.articles.slug,
          redirect_clicks: redirect.articles.redirect_clicks
        } : undefined
      })) || [];

      setClickData(processedData);
      
      const total = processedData.reduce((sum, item) => sum + item.click_count, 0);
      setTotalClicks(total);
    } catch (error) {
      console.error('Error fetching click data:', error);
      toast.error('Failed to fetch click analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClickData();
  }, []);

  const copyShortUrl = (shortCode: string) => {
    const shortUrl = `${window.location.origin}/r/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    toast.success('Short URL copied!');
  };

  const openOriginalUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const statCards = [
    { label: 'Total URLs', value: clickData.length, icon: Link },
    { label: 'Total Clicks', value: totalClicks, icon: TrendingUp },
    { label: 'Avg. Clicks/URL', value: clickData.length > 0 ? Math.round(totalClicks / clickData.length) : 0, icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Click Analytics</h1>
        <p className="text-slate-500 mt-1">Track performance of shortened URLs</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      {/* URLs Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">Tracked URLs</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">Loading analytics...</p>
          </div>
        ) : clickData.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No analytics data yet</h3>
            <p className="text-slate-500">URLs will appear here when ads are displayed on articles.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Short Code</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Article</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Clicks</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Original URL</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clickData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <button
                        onClick={() => copyShortUrl(item.short_code)}
                        className="font-mono text-sm bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors flex items-center gap-1.5"
                      >
                        {item.short_code}
                        <Copy className="w-3 h-3 text-slate-500" />
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      {item.article ? (
                        <div>
                          <p className="text-sm font-medium text-slate-900 truncate max-w-xs">{item.article.title}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Globe className="w-3 h-3" />
                            /{item.article.slug}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm italic">No article linked</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={item.click_count > 0 ? 'default' : 'secondary'} className={item.click_count > 0 ? 'bg-slate-900' : ''}>
                        {item.click_count} clicks
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-slate-500 truncate max-w-xs" title={item.original_url}>
                        {item.original_url}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.created_at).toLocaleDateString('de-DE')}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openOriginalUrl(item.original_url)}
                        className="h-8 w-8"
                        title="Open original URL"
                      >
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

export default AnalyticsPage;
