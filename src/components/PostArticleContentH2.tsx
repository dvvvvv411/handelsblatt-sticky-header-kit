import React from 'react';
import LeserfavoritenSliderH2 from './LeserfavoritenSliderH2';
import MehrZumThemaSectionH2 from './MehrZumThemaSectionH2';
import UnserePartnerSliderH2 from './UnserePartnerSliderH2';

const PostArticleContentH2 = () => {
  return (
    <div style={{ backgroundColor: '#f6f6f6' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-16 bg-white space-y-8 md:space-y-12">
        <LeserfavoritenSliderH2 />
        <MehrZumThemaSectionH2 />
        <UnserePartnerSliderH2 />
      </div>
    </div>
  );
};

export default PostArticleContentH2;