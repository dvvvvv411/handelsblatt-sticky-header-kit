
import React from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleToolbar from './ArticleToolbar';
import HeroImage from './HeroImage';
import ArticleContent from './ArticleContent';
import ArticleSidebar from './ArticleSidebar';
import ArticlePaywall from './ArticlePaywall';

const ArticleSection = () => {
  return (
    <article className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <ArticleHeader />
        <ArticleToolbar />
        <HeroImage />
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-8">
          {/* Main Content */}
          <div className="min-w-0">
            <ArticleContent />
            <ArticlePaywall />
          </div>
          
          {/* Sidebar */}
          <div className="hidden lg:block">
            <ArticleSidebar />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleSection;
