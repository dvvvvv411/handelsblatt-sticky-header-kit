import React from 'react';
import ArticleHeaderH2 from './ArticleHeaderH2';
import ArticleToolbarH2 from './ArticleToolbarH2';
import HeroImageH2 from './HeroImageH2';
import ArticleContentH2 from './ArticleContentH2';
import ArticlePaywallH2 from './ArticlePaywallH2';

const ArticleSectionH2 = () => {
  return (
    <div style={{ backgroundColor: '#f6f6f6' }}>
      <article>
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 xl:px-48 py-8 md:py-16 lg:py-32 bg-white">
          <ArticleHeaderH2 />
          <ArticleToolbarH2 />
          <HeroImageH2 />
          
          {/* Content - Full Width with Mobile Optimization */}
          <div className="mt-6 md:mt-8">
            <ArticleContentH2 />
            <ArticlePaywallH2 />
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleSectionH2;