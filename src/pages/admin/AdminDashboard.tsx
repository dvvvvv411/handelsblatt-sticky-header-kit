import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users, FileText, Eye, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    publishedArticles: 0,
    totalVisits: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { data: articles } = await supabase
        .from('articles')
        .select('published');

      const { count: totalVisits } = await supabase
        .from('article_visits')
        .select('*', { count: 'exact', head: true });

      const totalArticles = articles?.length || 0;
      const publishedArticles = articles?.filter(a => a.published).length || 0;

      setStats({
        totalUsers: userCount || 0,
        totalArticles,
        publishedArticles,
        totalVisits: totalVisits || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      label: 'Total Users', 
      value: stats.totalUsers, 
      icon: Users, 
      onClick: () => navigate('/admin/users')
    },
    { 
      label: 'Total Articles', 
      value: stats.totalArticles, 
      icon: FileText, 
      onClick: () => navigate('/admin/articles')
    },
    { 
      label: 'Published', 
      value: stats.publishedArticles, 
      icon: FileText, 
      onClick: () => navigate('/admin/articles')
    },
    { 
      label: 'Total Visits', 
      value: stats.totalVisits, 
      icon: Eye, 
      onClick: () => navigate('/admin/visits')
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back. Here's an overview of your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <button
            key={index}
            onClick={stat.onClick}
            className="bg-white rounded-xl border border-slate-200 p-6 text-left hover:border-slate-300 hover:shadow-sm transition-all group"
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
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                <stat.icon className="w-5 h-5 text-slate-600" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/admin/articles/new')}
            className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-900">New Article</p>
              <p className="text-sm text-slate-500">Create a new article</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/admin/visits')}
            className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-900">View Visits</p>
              <p className="text-sm text-slate-500">Analyze traffic</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/admin/analytics')}
            className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Analytics</p>
              <p className="text-sm text-slate-500">Track performance</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
