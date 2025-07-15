
import React from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleToolbar from './ArticleToolbar';
import HeroImage from './HeroImage';
import ArticleContent from './ArticleContent';
import ArticlePaywall from './ArticlePaywall';
import LawyerCard from './LawyerCard';

const ArticleSection = () => {
  return (
    <div style={{ backgroundColor: '#f6f6f6' }}>
      <article>
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 xl:px-48 py-8 md:py-16 lg:py-32 bg-white">
          <ArticleHeader />
          <ArticleToolbar />
          <HeroImage />
          
          {/* Content - Full Width with Mobile Optimization */}
          <div className="mt-6 md:mt-8">
            <ArticleContent />
            <ArticlePaywall />
            <LawyerCard />
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleSection;
