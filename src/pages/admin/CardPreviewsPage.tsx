import React from 'react';
import ArticlePaywall from '@/components/ArticlePaywall';
import ArticleBovensiepenPartners from '@/components/ArticleBovensiepenPartners';
import ArticleBraunInvestments from '@/components/ArticleBraunInvestments';

const CardPreviewsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">Card Previews</h1>
        <p className="text-slate-500 mt-1">Preview how the advertisement cards look on articles</p>
      </div>

      {/* Bitloon Card */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-500/30"></div>
          <h2 className="text-lg font-semibold text-slate-800">Bitloon Card</h2>
        </div>
        <div className="bg-white rounded-2xl border border-orange-100 p-4 lg:p-6 shadow-sm">
          <ArticlePaywall />
        </div>
      </div>

      {/* Bovensiepen & Partner Card */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/30"></div>
          <h2 className="text-lg font-semibold text-slate-800">Bovensiepen & Partner Card</h2>
        </div>
        <div className="bg-white rounded-2xl border border-blue-100 p-4 lg:p-6 shadow-sm">
          <ArticleBovensiepenPartners />
        </div>
      </div>

      {/* Braun Investments Card */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30"></div>
          <h2 className="text-lg font-semibold text-slate-800">Braun Investments Card</h2>
        </div>
        <div className="bg-white rounded-2xl border border-emerald-100 p-4 lg:p-6 shadow-sm">
          <ArticleBraunInvestments />
        </div>
      </div>
    </div>
  );
};

export default CardPreviewsPage;