
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Eye, Users, TrendingUp, Calendar, Globe } from 'lucide-react';

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

const VisitAnalytics: React.FC = () => {
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
      // Fetch articles with their visit counts
      const { data: articles, error: articlesError } = await supabase
        .from('articles')
        .select(`
          id,
          title,
          slug,
          redirect_clicks,
          published,
          created_at
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (articlesError) throw articlesError;

      // For each article, get visit statistics
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

      // Calculate total statistics
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

  useEffect(() => {
    fetchVisitAnalytics();
  }, []);

  if (loading) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <span className="text-gray-600">Loading visit analytics...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Eye className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Visit Analytics</CardTitle>
            <CardDescription className="text-gray-600">Track article visits and conversion rates</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{totalStats.totalVisits}</div>
                <div className="text-blue-100 font-medium">Total Visits</div>
              </div>
              <Eye className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{totalStats.totalUniqueVisitors}</div>
                <div className="text-green-100 font-medium">Unique Visitors</div>
              </div>
              <Users className="w-8 h-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{totalStats.totalRedirectClicks}</div>
                <div className="text-purple-100 font-medium">Redirect Clicks</div>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{totalStats.averageConversionRate}%</div>
                <div className="text-orange-100 font-medium">Avg. Conversion</div>
              </div>
              <Globe className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>

        {visitData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No visit data yet</h3>
            <p className="text-gray-500">Visit data will appear here once articles start receiving traffic.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">Article</TableHead>
                  <TableHead className="font-semibold text-gray-700">Visits</TableHead>
                  <TableHead className="font-semibold text-gray-700">Unique Visitors</TableHead>
                  <TableHead className="font-semibold text-gray-700">Redirect Clicks</TableHead>
                  <TableHead className="font-semibold text-gray-700">Conversion Rate</TableHead>
                  <TableHead className="font-semibold text-gray-700">Published</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitData.map((article) => (
                  <TableRow key={article.id} className="hover:bg-blue-50/50 transition-colors">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm text-gray-900">{article.title}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Globe className="w-3 h-3 mr-1" />
                          /{article.slug}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <Badge variant="secondary">
                          {article.totalVisits}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <Badge variant="secondary">
                          {article.uniqueVisitors}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <Badge variant="secondary">
                          {article.redirectClicks}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={article.conversionRate > 0 ? 'default' : 'secondary'}
                        className={article.conversionRate > 0 ? 'bg-orange-500 text-white' : ''}
                      >
                        {article.conversionRate}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">{new Date(article.created_at).toLocaleDateString()}</span>
                      </div>
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

export default VisitAnalytics;
