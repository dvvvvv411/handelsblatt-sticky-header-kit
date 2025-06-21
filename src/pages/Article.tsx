
import React from 'react';
import HandelsblattHeader from '../components/HandelsblattHeader';
import ArticleSection from '../components/ArticleSection';
import PostArticleContent from '../components/PostArticleContent';
import HandelsblattFooter from '../components/HandelsblattFooter';

const Article = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f6f6f6' }}>
      <HandelsblattHeader />
      <ArticleSection />
      <PostArticleContent />
      <HandelsblattFooter />
    </div>
  );
};

export default Article;
