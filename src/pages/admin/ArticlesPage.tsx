import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  author: string;
  published: boolean;
  created_at: string;
  bitloon_ad_enabled: boolean;
  braun_investments_ad_enabled: boolean;
  bovensiepen_partners_ad_enabled: boolean;
  actual_redirect_clicks?: number;
}

const ArticlesPage: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('id, slug, category, title, author, published, created_at, bitloon_ad_enabled, braun_investments_ad_enabled, bovensiepen_partners_ad_enabled')
        .order('created_at', { ascending: false });

      if (articlesError) throw articlesError;

      const { data: redirectsData, error: redirectsError } = await supabase
        .from('redirects')
        .select('article_id, click_count');

      if (redirectsError) throw redirectsError;

      const clickCountsByArticle = redirectsData?.reduce((acc, redirect) => {
        if (redirect.article_id) {
          acc[redirect.article_id] = (acc[redirect.article_id] || 0) + redirect.click_count;
        }
        return acc;
      }, {} as Record<string, number>) || {};

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

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Article ${!currentStatus ? 'published' : 'unpublished'}`);
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
      
      toast.success('Article deleted');
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article');
    }
  };

  const getActiveAdBadge = (article: Article) => {
    if (article.bovensiepen_partners_ad_enabled) return { label: 'Bovensiepen', className: 'bg-blue-50 text-blue-700 border-blue-200' };
    if (article.bitloon_ad_enabled) return { label: 'Bitloon', className: 'bg-orange-50 text-orange-700 border-orange-200' };
    if (article.braun_investments_ad_enabled) return { label: 'Braun', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">Articles</h1>
          <p className="text-slate-500 mt-1">Manage your published articles</p>
        </div>
        <Button 
          onClick={() => navigate('/admin/articles/new')}
          className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white border-0 shadow-lg shadow-indigo-500/20 rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Edit className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No articles yet</h3>
            <p className="text-slate-500 mb-4">Create your first article to get started.</p>
            <Button 
              onClick={() => navigate('/admin/articles/new')}
              className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white border-0 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Article
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-indigo-50/30">
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Author</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ad</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Clicks</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {articles.map((article) => {
                  const activeAd = getActiveAdBadge(article);
                  return (
                    <tr key={article.id} className="hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-transparent transition-colors">
                      <td className="py-4 px-4">
                        <div className="max-w-xs truncate font-medium text-slate-900" title={article.title}>
                          {article.title}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="font-normal rounded-lg border-slate-200">
                          {article.category}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-slate-600">{article.author}</td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => togglePublished(article.id, article.published)}
                          className="cursor-pointer"
                        >
                          <Badge 
                            variant={article.published ? 'default' : 'secondary'}
                            className={article.published 
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 shadow-sm shadow-emerald-500/20 rounded-lg' 
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 rounded-lg'}
                          >
                            {article.published ? 'Published' : 'Draft'}
                          </Badge>
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        {activeAd ? (
                          <Badge variant="outline" className={`rounded-lg ${activeAd.className}`}>
                            {activeAd.label}
                          </Badge>
                        ) : (
                          <span className="text-slate-400 text-sm">None</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg text-sm">{article.actual_redirect_clicks || 0}</span>
                      </td>
                      <td className="py-4 px-4 text-slate-500 text-sm">
                        {new Date(article.created_at).toLocaleDateString('de-DE')}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-indigo-50">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem onClick={() => navigate(`/admin/articles/edit/${article.id}`)} className="rounded-lg">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            {article.published && (
                              <DropdownMenuItem onClick={() => window.open(`/artikel/${article.slug}`, '_blank')} className="rounded-lg">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => deleteArticle(article.id)}
                              className="text-red-600 focus:text-red-600 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;