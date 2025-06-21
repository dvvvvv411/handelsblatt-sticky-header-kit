import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ExternalLink, BarChart3, Link, TrendingUp, Globe, Calendar } from 'lucide-react';

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

const ClickAnalytics: React.FC = () => {
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
    toast.success('Short URL copied to clipboard!');
  };

  const openOriginalUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <span className="text-gray-600">Loading click analytics...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Click Analytics</CardTitle>
            <CardDescription className="text-gray-600">Track performance of shortened URLs</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Enhanced Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{clickData.length}</div>
                <div className="text-blue-100 font-medium">Total Short URLs</div>
              </div>
              <Link className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{totalClicks}</div>
                <div className="text-green-100 font-medium">Total Clicks</div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {clickData.length > 0 ? Math.round(totalClicks / clickData.length) : 0}
                </div>
                <div className="text-purple-100 font-medium">Avg. Clicks per URL</div>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>

        {clickData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No analytics data yet</h3>
            <p className="text-gray-500">URLs will appear here when Bitloon ads are displayed on articles.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">Short Code</TableHead>
                  <TableHead className="font-semibold text-gray-700">Article</TableHead>
                  <TableHead className="font-semibold text-gray-700">Clicks</TableHead>
                  <TableHead className="font-semibold text-gray-700">Original URL</TableHead>
                  <TableHead className="font-semibold text-gray-700">Created</TableHead>
                  <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clickData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-blue-50/50 transition-colors">
                    <TableCell className="font-mono">
                      <button
                        onClick={() => copyShortUrl(item.short_code)}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                        title="Click to copy short URL"
                      >
                        {item.short_code}
                      </button>
                    </TableCell>
                    <TableCell>
                      {item.article ? (
                        <div className="space-y-1">
                          <div className="font-medium text-sm text-gray-900">{item.article.title}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Globe className="w-3 h-3 mr-1" />
                            /{item.article.slug}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">No article linked</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        <Badge 
                          variant={item.click_count > 0 ? 'default' : 'secondary'}
                          className={item.click_count > 0 ? 'bg-orange-500 text-white' : ''}
                        >
                          {item.click_count} clicks
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate text-sm text-gray-600" title={item.original_url}>
                        {item.original_url}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openOriginalUrl(item.original_url)}
                        className="hover:bg-blue-100 hover:text-blue-600"
                        title="Open original URL"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClickAnalytics;
