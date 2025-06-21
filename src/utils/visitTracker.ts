
import { supabase } from '@/integrations/supabase/client';

// Generate a session-based visitor ID
export const getVisitorId = (): string => {
  const storageKey = 'visitor_id';
  let visitorId = localStorage.getItem(storageKey);
  
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(storageKey, visitorId);
  }
  
  return visitorId;
};

// Track article visit - optimized to be non-blocking
export const trackArticleVisit = async (articleId: string): Promise<void> => {
  // Don't await this - let it run in background
  Promise.resolve().then(async () => {
    try {
      const visitorId = getVisitorId();
      
      // Get additional tracking data
      const referrer = document.referrer || null;
      const userAgent = navigator.userAgent || null;
      
      // Insert visit record
      const { error } = await supabase
        .from('article_visits')
        .insert({
          article_id: articleId,
          visitor_id: visitorId,
          referrer,
          user_agent: userAgent
        });

      if (error) {
        console.error('Error tracking article visit:', error);
      } else {
        console.log('Article visit tracked successfully for article:', articleId);
      }
    } catch (error) {
      console.error('Failed to track article visit:', error);
    }
  }).catch(error => {
    console.error('Background visit tracking failed:', error);
  });
};

// Get visit statistics for an article
export const getArticleVisitStats = async (articleId: string) => {
  try {
    const { data, error } = await supabase
      .from('article_visits')
      .select('*')
      .eq('article_id', articleId);

    if (error) throw error;

    return {
      totalVisits: data?.length || 0,
      uniqueVisitors: new Set(data?.map(visit => visit.visitor_id)).size || 0,
      data: data || []
    };
  } catch (error) {
    console.error('Error fetching visit stats:', error);
    return { totalVisits: 0, uniqueVisitors: 0, data: [] };
  }
};
