
import React from 'react';
import LeserfavoritenSlider from './LeserfavoritenSlider';
import MehrZumThemaSection from './MehrZumThemaSection';
import UnserePartnerSlider from './UnserePartnerSlider';

const PostArticleContent = () => {
  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        <LeserfavoritenSlider />
        <MehrZumThemaSection />
        <UnserePartnerSlider />
      </div>
    </div>
  );
};

export default PostArticleContent;
