
import React from 'react';
import HandelsblattHeader from '../components/HandelsblattHeader';
import ArticleSection from '../components/ArticleSection';
import PostArticleContent from '../components/PostArticleContent';
import HandelsblattFooter from '../components/HandelsblattFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HandelsblattHeader />
      <ArticleSection />
      <PostArticleContent />
      <HandelsblattFooter />
    </div>
  );
};

export default Index;
