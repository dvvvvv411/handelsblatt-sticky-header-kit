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
      onClick: () => navigate('/admin/users'),
      gradient: 'from-blue-500 to-cyan-400',
      bgLight: 'bg-blue-50',
      borderColor: 'border-blue-100',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-400',
    },
    { 
      label: 'Total Articles', 
      value: stats.totalArticles, 
      icon: FileText, 
      onClick: () => navigate('/admin/articles'),
      gradient: 'from-violet-500 to-purple-400',
      bgLight: 'bg-violet-50',
      borderColor: 'border-violet-100',
      iconBg: 'bg-gradient-to-br from-violet-500 to-purple-400',
    },
    { 
      label: 'Published', 
      value: stats.publishedArticles, 
      icon: FileText, 
      onClick: () => navigate('/admin/articles'),
      gradient: 'from-emerald-500 to-teal-400',
      bgLight: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-400',
    },
    { 
      label: 'Total Visits', 
      value: stats.totalVisits, 
      icon: Eye, 
      onClick: () => navigate('/admin/visits'),
      gradient: 'from-amber-500 to-orange-400',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-100',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back. Here's an overview of your platform.</p>
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
            onClick={() => navigate('/admin/visits')}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/60 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-900">View Visits</p>
              <p className="text-sm text-slate-500">Analyze traffic</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/admin/analytics')}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/60 hover:border-violet-200 hover:bg-violet-50/50 transition-all duration-200 text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-300">
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

// Helper
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default AdminDashboard;