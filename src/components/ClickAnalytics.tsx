
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ExternalLink, BarChart3 } from 'lucide-react';

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
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading click analytics...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <div>
            <CardTitle>Click Analytics</CardTitle>
            <CardDescription>Track performance of shortened URLs</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{clickData.length}</div>
            <div className="text-sm text-blue-800">Total Short URLs</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{totalClicks}</div>
            <div className="text-sm text-green-800">Total Clicks</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {clickData.length > 0 ? Math.round(totalClicks / clickData.length) : 0}
            </div>
            <div className="text-sm text-purple-800">Avg. Clicks per URL</div>
          </div>
        </div>

        {clickData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No short URLs found. URLs will appear here when Bitloon ads are displayed on articles.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Short Code</TableHead>
                <TableHead>Article</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Original URL</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clickData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono">
                    <button
                      onClick={() => copyShortUrl(item.short_code)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                      title="Click to copy short URL"
                    >
                      {item.short_code}
                    </button>
                  </TableCell>
                  <TableCell>
                    {item.article ? (
                      <div>
                        <div className="font-medium text-sm">{item.article.title}</div>
                        <div className="text-xs text-gray-500">/{item.article.slug}</div>
                      </div>
                    ) : (
                      <span className="text-gray-500">No article</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.click_count > 0 ? 'default' : 'secondary'}>
                      {item.click_count} clicks
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate text-sm" title={item.original_url}>
                      {item.original_url}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(item.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openOriginalUrl(item.original_url)}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ClickAnalytics;
