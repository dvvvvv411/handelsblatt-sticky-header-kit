
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Edit, Trash2, Eye, FileText, TrendingUp } from 'lucide-react';

interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  author: string;
  published: boolean;
  created_at: string;
  bitloon_ad_enabled: boolean;
  redirect_clicks: number;
  actual_redirect_clicks?: number; // The actual calculated clicks from redirects table
}

interface ArticleListProps {
  refresh: boolean;
  onRefreshComplete: () => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ refresh, onRefreshComplete }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      // First fetch all articles
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('id, slug, category, title, author, published, created_at, bitloon_ad_enabled, redirect_clicks')
        .order('created_at', { ascending: false });

      if (articlesError) throw articlesError;

      // Then fetch the actual click counts from redirects table
      const { data: redirectsData, error: redirectsError } = await supabase
        .from('redirects')
        .select('article_id, click_count');

      if (redirectsError) throw redirectsError;

      // Calculate actual click counts per article
      const clickCountsByArticle = redirectsData?.reduce((acc, redirect) => {
        if (redirect.article_id) {
          acc[redirect.article_id] = (acc[redirect.article_id] || 0) + redirect.click_count;
        }
        return acc;
      }, {} as Record<string, number>) || {};

      // Combine the data
      const articlesWithActualCounts = articlesData?.map(article => ({
        ...article,
        actual_redirect_clicks: clickCountsByArticle[article.id] || 0
      })) || [];

      setArticles(articlesWithActualCounts);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchArticles();
      onRefreshComplete();
    }
  }, [refresh, onRefreshComplete]);

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Article ${!currentStatus ? 'published' : 'unpublished'} successfully`);
      fetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
      toast.error('Failed to update article');
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Article deleted successfully');
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article');
    }
  };

  const viewArticle = (slug: string) => {
    window.open(`/artikel/${slug}`, '_blank');
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <span className="text-gray-600">Loading articles...</span>
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
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Articles</CardTitle>
            <CardDescription className="text-gray-600">Manage your published articles</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {articles.length === 0 ? (
          <div className="text-center py-16 px-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500">Create your first article using the form above.</p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">Title</TableHead>
                  <TableHead className="font-semibold text-gray-700">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700">Author</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Bitloon Ad</TableHead>
                  <TableHead className="font-semibold text-gray-700">Clicks</TableHead>
                  <TableHead className="font-semibold text-gray-700">Created</TableHead>
                  <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id} className="hover:bg-blue-50/50 transition-colors">
                    <TableCell className="font-medium text-gray-900 max-w-xs">
                      <div className="truncate" title={article.title}>
                        {article.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {article.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{article.author}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={article.published ? 'default' : 'secondary'}
                        className={`cursor-pointer font-medium ${
                          article.published 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                        onClick={() => togglePublished(article.id, article.published)}
                      >
                        {article.published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={article.bitloon_ad_enabled ? 'default' : 'outline'}
                        className={article.bitloon_ad_enabled ? 'bg-blue-500 text-white' : ''}
                      >
                        {article.bitloon_ad_enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                          {article.actual_redirect_clicks || 0}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(article.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {article.published && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewArticle(article.slug)}
                            className="hover:bg-blue-100 hover:text-blue-600"
                            title="View article"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteArticle(article.id)}
                          className="hover:bg-red-100 hover:text-red-600"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

export default ArticleList;
