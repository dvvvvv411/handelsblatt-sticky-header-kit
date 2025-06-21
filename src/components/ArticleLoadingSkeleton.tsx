
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import HandelsblattHeader from '@/components/HandelsblattHeader';
import HandelsblattFooter from '@/components/HandelsblattFooter';

const ArticleLoadingSkeleton = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f6f6f6' }}>
      <HandelsblattHeader />
      
      <div style={{ backgroundColor: '#f6f6f6' }}>
        <article>
          <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 xl:px-48 py-8 md:py-16 lg:py-32 bg-white">
            
            {/* Loading Animation */}
            <div className="mb-8 text-center animate-fade-in">
              <div className="flex items-center justify-center space-x-1 text-gray-600">
                <span 
                  className="text-lg md:text-xl font-classic-grotesque"
                  style={{ fontWeight: '500' }}
                >
                  Artikel wird geladen
                </span>
                <div className="flex space-x-1">
                  <span className="animate-pulse animation-delay-0">.</span>
                  <span className="animate-pulse animation-delay-200">.</span>
                  <span className="animate-pulse animation-delay-400">.</span>
                </div>
              </div>
            </div>
            
            {/* Article Header Skeleton */}
            <header className="mb-6">
              {/* Category Tag Skeleton */}
              <div className="mb-4">
                <div className="flex items-center">
                  <Skeleton className="w-7 h-6 mr-2" />
                  <Skeleton className="w-16 h-4" />
                </div>
              </div>

              {/* Title Skeleton */}
              <div className="mb-4 space-y-2">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-4/5 h-12" />
              </div>

              {/* Subtitle Skeleton */}
              <div className="mb-4 space-y-2">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-3/4 h-6" />
              </div>

              {/* Author/Date Skeleton */}
              <div className="mb-4 space-y-1">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-24 h-4" />
              </div>

              {/* Audio Button Skeleton */}
              <div className="mt-4 flex items-center">
                <Skeleton className="w-11 h-11 rounded-full mr-3" />
                <div className="space-y-1">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-20 h-3" />
                </div>
              </div>
            </header>

            {/* Hero Image Skeleton */}
            <div className="mb-4 md:mb-6 -mx-4 md:-mx-8 lg:-mx-16">
              <div 
                className="relative mx-auto overflow-hidden"
                style={{ 
                  maxWidth: '900px',
                  aspectRatio: '16/10',
                  borderRadius: '4px'
                }}
              >
                <Skeleton className="w-full h-full" />
              </div>
              <div className="mt-2 md:mt-3 mx-4 md:mx-8 lg:mx-16">
                <Skeleton className="w-3/4 h-3" />
              </div>
            </div>
            
            {/* Content Skeleton - Optimized for faster rendering */}
            <div className="mt-6 md:mt-8 space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-2/3 h-8 mb-4" />
                  <div className="space-y-3">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-4/5 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
      
      <HandelsblattFooter />
    </div>
  );
};

export default ArticleLoadingSkeleton;
