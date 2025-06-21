
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import HandelsblattHeader from '@/components/HandelsblattHeader';
import HandelsblattFooter from '@/components/HandelsblattFooter';
import ArticlePaywall from '@/components/ArticlePaywall';
import PostArticleContent from '@/components/PostArticleContent';
import ArticleLoadingSkeleton from '@/components/ArticleLoadingSkeleton';

interface ContentSection {
  title: string;
  text: string;
}

interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  hero_image_url: string;
  hero_image_caption: string;
  content: ContentSection[];
  bitloon_ad_enabled: boolean;
  bitloon_ad_config: any;
  created_at: string;
}

const DynamicArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const isValidContentSection = (item: any): item is ContentSection => {
    return item && typeof item === 'object' && typeof item.title === 'string' && typeof item.text === 'string';
  };

  const convertJsonToContentSections = (jsonContent: any): ContentSection[] => {
    if (!Array.isArray(jsonContent)) {
      return [];
    }
    
    return jsonContent.filter(isValidContentSection);
  };

  const fetchArticle = async (articleSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', articleSlug)
        .eq('published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setNotFound(true);
        } else {
          throw error;
        }
        return;
      }

      // Convert Json content back to ContentSection[] with proper type safety
      const articleData: Article = {
        ...data,
        content: convertJsonToContentSections(data.content)
      };

      setArticle(articleData);
    } catch (error) {
      console.error('Error fetching article:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDate = () => {
    if (!article) return '';
    const date = new Date(article.created_at);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Show loading skeleton while loading
  if (loading) {
    return <ArticleLoadingSkeleton />;
  }

  if (notFound || !article) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f6f6f6' }}>
      <HandelsblattHeader />
      
      <div style={{ backgroundColor: '#f6f6f6' }}>
        <article>
          <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 xl:px-48 py-8 md:py-16 lg:py-32 bg-white">
            
            {/* Article Header */}
            <header className="mb-6">
              {/* Category Tag */}
              <div className="mb-4">
                <div className="flex items-center">
                  <img src="https://resources.handelsblatt.com/hb-frontend/images/h-plus/h-plus.svg" width="28" height="23" alt="H+" className="mr-2" />
                  <span className="text-sm md:text-base font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="mb-4 text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight" style={{
                color: '#000000',
                lineHeight: '1.3',
                fontFamily: '"Guyot Headline", Georgia, "Times New Roman", serif',
                fontWeight: '700'
              }}>
                {article.title}
              </h1>

              {/* Subtitle */}
              {article.subtitle && (
                <p className="mb-4 text-lg sm:text-xl md:text-xl lg:text-2xl leading-relaxed" style={{
                  color: '#4a5568',
                  lineHeight: '1.5',
                  fontFamily: '"ClassicGrotesquePro", Arial, sans-serif'
                }}>
                  {article.subtitle}
                </p>
              )}

              {/* Author/Date */}
              <div className="text-sm md:text-base space-y-1" style={{
                color: '#4a5568',
                fontWeight: '500'
              }}>
                <div>{article.author}</div>
                <div>{getCurrentDate()}</div>
              </div>

              {/* Audio Button */}
              <div className="mt-4 flex items-center">
                <button 
                  className="flex items-center justify-center min-w-[44px] min-h-[44px] mr-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors" 
                  disabled
                  aria-label="Artikel anhören"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" className="text-gray-500">
                    <path fill="currentColor" d="M12 21.04V10.96c0-.74.836-1.2 1.502-.828l9.003 5.04a.94.94 0 0 1 0 1.656l-9.003 5.04c-.666.373-1.502-.088-1.502-.828Z" />
                  </svg>
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="text-sm md:text-base text-gray-600 font-bold">Artikel anhören</span>
                  <span className="text-xs sm:text-sm text-gray-500">nicht verfügbar</span>
                </div>
              </div>
            </header>

            {/* Hero Image */}
            {article.hero_image_url && (
              <div className="mb-4 md:mb-6 -mx-4 md:-mx-8 lg:-mx-16">
                <div 
                  className="relative mx-auto overflow-hidden"
                  style={{ 
                    maxWidth: '900px',
                    aspectRatio: '16/10',
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <img
                    src={article.hero_image_url}
                    alt={article.hero_image_caption || article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {article.hero_image_caption && (
                  <p 
                    className="mt-2 md:mt-3 text-xs md:text-sm italic text-center mx-4 md:mx-8 lg:mx-16 leading-relaxed"
                    style={{ color: '#718096' }}
                  >
                    {article.hero_image_caption}
                  </p>
                )}
              </div>
            )}
            
            {/* Content */}
            <div className="mt-6 md:mt-8">
              <div 
                className="prose prose-lg max-w-none"
                style={{ 
                  fontSize: '20px',
                  lineHeight: '1.7',
                  color: '#2d3748'
                }}
              >
                {article.content.map((section, index) => (
                  <div key={index}>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 mt-6 font-druk-normal leading-tight" style={{ color: '#1a202c' }}>
                      {section.title}
                    </h2>
                    <p className="mb-4 md:mb-6 font-classic-grotesque text-lg md:text-xl leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Bitloon Ad with article ID for tracking */}
              {article.bitloon_ad_enabled && (
                <ArticlePaywall 
                  articleId={article.id}
                  bitloonUrl={article.bitloon_ad_config?.url || 'https://bitloon.com?ref=handelsblatt'}
                />
              )}
            </div>
          </div>
        </article>
      </div>
      
      <PostArticleContent />
      <HandelsblattFooter />
    </div>
  );
};

export default DynamicArticle;
