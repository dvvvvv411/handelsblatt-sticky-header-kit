
import React from 'react';
import LeserfavoritenSlider from './LeserfavoritenSlider';
import MehrZumThemaSection from './MehrZumThemaSection';
import UnserePartnerSlider from './UnserePartnerSlider';

const PostArticleContent = () => {
  return (
    <div style={{ backgroundColor: '#f6f6f6' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-16 bg-white space-y-8 md:space-y-12">
        <LeserfavoritenSlider />
        <MehrZumThemaSection />
        <UnserePartnerSlider />
      </div>
    </div>
  );
};

export default PostArticleContent;
