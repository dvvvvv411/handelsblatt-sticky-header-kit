import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users, FileText, Eye, CreditCard, BarChart3, Edit, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

interface ArticleWithVisits {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
  visit_count: number;
}

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, isKunde } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    publishedArticles: 0,
    totalVisits: 0
  });
  const [articles, setArticles] = useState<ArticleWithVisits[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Users count - only for admins
      let userCount = 0;
      if (isAdmin) {
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        userCount = count || 0;
      }

      let articlesQuery = supabase
        .from('articles')
        .select('id, title, slug, published, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      // RLS handles filtering, but explicit filter for kunde
      if (isKunde && !isAdmin && user) {
        articlesQuery = articlesQuery.eq('created_by', user.id);
      }

      const { data: articleData } = await articlesQuery;

      let visitsQuery = supabase
        .from('article_visits')
        .select('*', { count: 'exact', head: true });

      const { count: totalVisits } = await visitsQuery;

      const totalArticles = articleData?.length || 0;
      const publishedArticles = articleData?.filter(a => a.published).length || 0;

      setStats({
        totalUsers: userCount,
        totalArticles,
        publishedArticles,
        totalVisits: totalVisits || 0
      });

      // Fetch visit counts per article
      if (articleData && articleData.length > 0) {
        const articlesWithVisits: ArticleWithVisits[] = await Promise.all(
          articleData.map(async (article) => {
            const { count } = await supabase
              .from('article_visits')
              .select('*', { count: 'exact', head: true })
              .eq('article_id', article.id);
            return { ...article, visit_count: count || 0 };
          })
        );
        setArticles(articlesWithVisits);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    ...(isAdmin ? [{
      label: 'Nutzer gesamt', value: stats.totalUsers, icon: Users, 
      onClick: () => navigate('/admin/users'),
      borderColor: 'border-blue-100', iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-400',
    }] : []),
    { 
      label: 'Artikel gesamt', value: stats.totalArticles, icon: FileText, 
      onClick: () => navigate('/admin/articles'),
      borderColor: 'border-violet-100', iconBg: 'bg-gradient-to-br from-violet-500 to-purple-400',
    },
    { 
      label: 'Veröffentlicht', value: stats.publishedArticles, icon: FileText, 
      onClick: () => navigate('/admin/articles'),
      borderColor: 'border-emerald-100', iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-400',
    },
    { 
      label: 'Besuche gesamt', value: stats.totalVisits, icon: Eye, 
      onClick: () => navigate('/admin/statistics'),
      borderColor: 'border-amber-100', iconBg: 'bg-gradient-to-br from-amber-500 to-orange-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-slate-500 mt-1">Willkommen zurück. Hier ist eine Übersicht deiner Plattform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <button
            key={index}
            onClick={stat.onClick}
            className={cn(
              "bg-white rounded-2xl border p-6 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group",
              stat.borderColor
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                {loading ? (
                  <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse mt-2"></div>
                ) : (
                  <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                )}
              </div>
              <div className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300",
                stat.iconBg
              )}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/admin/articles/new')}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/60 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-200 text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-900">New Article</p>
              <p className="text-sm text-slate-500">Create a new article</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/admin/statistics')}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/60 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-200 text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Statistiken</p>
              <p className="text-sm text-slate-500">Analyse & Visits</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/admin/card-previews')}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/60 hover:border-cyan-200 hover:bg-cyan-50/50 transition-all duration-200 text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-900">CTA-Cards</p>
              <p className="text-sm text-slate-500">Cards verwalten</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Letzte Artikel</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/articles')} className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
            Alle anzeigen
          </Button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-50 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <p className="text-slate-500 text-sm py-8 text-center">Noch keine Artikel vorhanden.</p>
        ) : (
          <div className="space-y-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-200 group"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-slate-900 truncate">{article.title}</p>
                    <Badge className={article.published 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50" 
                      : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"
                    } variant="outline">
                      {article.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>/{article.slug}</span>
                    <span>{format(new Date(article.created_at), 'dd.MM.yyyy')}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {article.visit_count}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/admin/statistics/${article.id}`)}
                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  >
                    <TrendingUp className="w-4 h-4 mr-1" /> Stats
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default AdminDashboard;
