
import React from 'react';
import HandelsblattHeader from '../components/HandelsblattHeader';
import ArticleSection from '../components/ArticleSection';
import PostArticleContent from '../components/PostArticleContent';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HandelsblattHeader />
      <ArticleSection />
      <PostArticleContent />
    </div>
  );
};

export default Index;
