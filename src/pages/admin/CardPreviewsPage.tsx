import React from 'react';
import ArticlePaywall from '@/components/ArticlePaywall';
import ArticleBovensiepenPartners from '@/components/ArticleBovensiepenPartners';
import ArticleBraunInvestments from '@/components/ArticleBraunInvestments';

const CardPreviewsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Card Previews</h1>
        <p className="text-slate-500 mt-1">Preview how the advertisement cards look on articles</p>
      </div>

      {/* Bitloon Card */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <h2 className="text-lg font-semibold text-slate-800">Bitloon Card</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 lg:p-6">
          <ArticlePaywall />
        </div>
      </div>

      {/* Bovensiepen & Partner Card */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <h2 className="text-lg font-semibold text-slate-800">Bovensiepen & Partner Card</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 lg:p-6">
          <ArticleBovensiepenPartners />
        </div>
      </div>

      {/* Braun Investments Card */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <h2 className="text-lg font-semibold text-slate-800">Braun Investments Card</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 lg:p-6">
          <ArticleBraunInvestments />
        </div>
      </div>
    </div>
  );
};

export default CardPreviewsPage;
