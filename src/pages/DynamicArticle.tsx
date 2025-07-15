
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import HandelsblattHeader from '@/components/HandelsblattHeader';
import HandelsblattFooter from '@/components/HandelsblattFooter';
import ArticlePaywall from '@/components/ArticlePaywall';
import ArticleLawyerCard from '@/components/ArticleLawyerCard';
import PostArticleContent from '@/components/PostArticleContent';
import ArticleLoadingSkeleton from '@/components/ArticleLoadingSkeleton';
import { trackArticleVisit } from '@/utils/visitTracker';

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
  bitloon_ad_config?: { url?: string };
  lawyer_ad_enabled: boolean;
  lawyer_ad_config?: { url?: string };
  created_at: string;
  use_current_date: boolean;
  publication_date: string | null;
}

const DynamicArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchArticleOptimized(slug);
    }
  }, [slug]);

  // Track article visit when article is loaded
  useEffect(() => {
    if (article && article.id) {
      // Track the visit immediately when article loads
      trackArticleVisit(article.id);
    }
  }, [article]);

  const isValidContentSection = (item: any): item is ContentSection => {
    return item && typeof item === 'object' && typeof item.title === 'string' && typeof item.text === 'string';
  };

  const convertJsonToContentSections = (jsonContent: any): ContentSection[] => {
    if (!Array.isArray(jsonContent)) {
      return [];
    }
    
    return jsonContent.filter(isValidContentSection);
  };

  const preloadImage = (url: string) => {
    if (url) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = url;
    }
  };

  const fetchArticleOptimized = async (articleSlug: string) => {
    try {
      console.log('Fetching article:', articleSlug);
      const startTime = performance.now();
      
      // Optimized query - only select needed fields including new date fields
      const { data, error } = await supabase
        .from('articles')
        .select(`
          id,
          slug,
          category,
          title,
          subtitle,
          author,
          hero_image_url,
          hero_image_caption,
          content,
          bitloon_ad_enabled,
          bitloon_ad_config,
          lawyer_ad_enabled,
          lawyer_ad_config,
          created_at,
          use_current_date,
          publication_date
        `)
        .eq('slug', articleSlug)
        .eq('published', true)
        .single();

      const queryTime = performance.now() - startTime;
      console.log(`Database query took ${queryTime.toFixed(2)}ms`);

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
        content: convertJsonToContentSections(data.content),
        bitloon_ad_config: data.bitloon_ad_config as { url?: string } || {},
        lawyer_ad_config: data.lawyer_ad_config as { url?: string } || {}
      };

      setArticle(articleData);
      
      // Preload hero image if it exists
      if (articleData.hero_image_url) {
        preloadImage(articleData.hero_image_url);
      }
      
      console.log(`Article loaded in ${(performance.now() - startTime).toFixed(2)}ms`);
    } catch (error) {
      console.error('Error fetching article:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const getDisplayDate = () => {
    if (!article) return '';
    
    if (article.use_current_date) {
      const today = new Date();
      return today.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } else if (article.publication_date) {
      const date = new Date(article.publication_date);
      return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } else {
      // Fallback to created_at date
      const date = new Date(article.created_at);
      return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
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
                <div>{getDisplayDate()}</div>
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
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="eager"
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
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

              {/* Lawyer Ad with article ID for tracking */}
              {article.lawyer_ad_enabled && (
                <ArticleLawyerCard 
                  articleId={article.id}
                  lawyerUrl={article.lawyer_ad_config?.url || 'https://rechtsanwalt-mueller.de?ref=handelsblatt'}
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
