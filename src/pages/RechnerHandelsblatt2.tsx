import React from 'react';
import HandelsblattHeaderH2 from '../components/HandelsblattHeaderH2';
import ArticleSectionH2 from '../components/ArticleSectionH2';
import PostArticleContentH2 from '../components/PostArticleContentH2';
import HandelsblattFooterH2 from '../components/HandelsblattFooterH2';

const RechnerHandelsblatt2 = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f6f6f6' }}>
      <HandelsblattHeaderH2 />
      <ArticleSectionH2 />
      <PostArticleContentH2 />
      <HandelsblattFooterH2 />
    </div>
  );
};

export default RechnerHandelsblatt2;