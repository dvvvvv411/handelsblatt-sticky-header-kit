
import React from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleToolbar from './ArticleToolbar';
import HeroImage from './HeroImage';
import ArticleContent from './ArticleContent';
import ArticlePaywall from './ArticlePaywall';
import BitloonComments from './BitloonComments';

const ArticleSection = () => {
  return (
    <div style={{ backgroundColor: '#f6f6f6' }}>
      <article>
        <div className="max-w-6xl mx-auto px-48 py-32 bg-white">
          <ArticleHeader />
          <ArticleToolbar />
          <HeroImage />
          
          {/* Content - Full Width */}
          <div className="mt-8">
            <ArticleContent />
            <ArticlePaywall />
            <BitloonComments />
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleSection;
