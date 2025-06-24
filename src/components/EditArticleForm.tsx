
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ArticleForm from './ArticleForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  published: boolean;
  use_current_date: boolean;
  publication_date?: string;
}

interface EditArticleFormProps {
  articleId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditArticleForm: React.FC<EditArticleFormProps> = ({ 
  articleId, 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (articleId && isOpen) {
      fetchArticle();
    }
  }, [articleId, isOpen]);

  const fetchArticle = async () => {
    if (!articleId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      toast.error('Failed to fetch article');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setArticle(null);
    onClose();
  };

  const handleSuccess = () => {
    setArticle(null);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Artikel bearbeiten</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : article ? (
          <ArticleForm 
            onSuccess={handleSuccess}
            editingArticle={article}
            isEditing={true}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default EditArticleForm;
