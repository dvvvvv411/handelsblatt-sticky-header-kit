import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArticleForm from '@/components/ArticleForm';

interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle?: string;
  author: string;
  hero_image_url?: string;
  hero_image_caption?: string;
  content: Array<{ title: string; text: string }>;
  bitloon_ad_enabled: boolean;
  bitloon_ad_config?: { url?: string };
  braun_investments_ad_enabled: boolean;
  braun_investments_ad_config?: { url?: string };
  bovensiepen_partners_ad_enabled: boolean;
  bovensiepen_partners_ad_config?: { url?: string };
  published: boolean;
  use_current_date: boolean;
  publication_date?: string;
}

const EditArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      const typedArticle: Article = {
        ...data,
        content: Array.isArray(data.content) ? data.content as Array<{ title: string; text: string }> : [],
        bitloon_ad_config: data.bitloon_ad_config as { url?: string } || {},
        braun_investments_ad_config: data.braun_investments_ad_config as { url?: string } || {},
        bovensiepen_partners_ad_config: data.bovensiepen_partners_ad_config as { url?: string } || {}
      };
      
      setArticle(typedArticle);
    } catch (error) {
      console.error('Error fetching article:', error);
      toast.error('Failed to fetch article');
      navigate('/admin/articles');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    toast.success('Article updated successfully');
    navigate('/admin/articles');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-3 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-600">Loading article...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium text-slate-900 mb-2">Article not found</h2>
        <p className="text-slate-500 mb-4">The article you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/admin/articles')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/admin/articles')}
          className="shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Article</h1>
          <p className="text-slate-500 mt-1 truncate max-w-lg">{article.title}</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8">
        <ArticleForm 
          onSuccess={handleSuccess}
          editingArticle={article}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default EditArticlePage;
