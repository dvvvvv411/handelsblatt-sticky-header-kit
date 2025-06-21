
import { supabase } from '@/integrations/supabase/client';

// Generate a random short code (6 characters)
export const generateShortCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Create a short URL for a given original URL and article
export const createShortUrl = async (originalUrl: string, articleId: string): Promise<string | null> => {
  try {
    let shortCode = generateShortCode();
    let attempts = 0;
    const maxAttempts = 10;

    // Ensure unique short code
    while (attempts < maxAttempts) {
      const { data: existing } = await supabase
        .from('redirects')
        .select('id')
        .eq('short_code', shortCode)
        .single();

      if (!existing) break;
      
      shortCode = generateShortCode();
      attempts++;
    }

    if (attempts >= maxAttempts) {
      console.error('Failed to generate unique short code');
      return null;
    }

    const { data, error } = await supabase
      .from('redirects')
      .insert({
        short_code: shortCode,
        original_url: originalUrl,
        article_id: articleId
      })
      .select('short_code')
      .single();

    if (error) {
      console.error('Error creating short URL:', error);
      return null;
    }

    return `${window.location.origin}/r/${data.short_code}`;
  } catch (error) {
    console.error('Error in createShortUrl:', error);
    return null;
  }
};

// Get redirect data by short code
export const getRedirectData = async (shortCode: string) => {
  try {
    const { data, error } = await supabase
      .from('redirects')
      .select('*')
      .eq('short_code', shortCode)
      .single();

    if (error) {
      console.error('Error fetching redirect data:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getRedirectData:', error);
    return null;
  }
};

// Track click and redirect
export const trackClickAndRedirect = async (shortCode: string): Promise<string | null> => {
  try {
    // Get redirect data
    const redirectData = await getRedirectData(shortCode);
    if (!redirectData) return null;

    // Increment click count
    const { error: updateError } = await supabase
      .from('redirects')
      .update({ 
        click_count: redirectData.click_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('short_code', shortCode);

    if (updateError) {
      console.error('Error updating click count:', updateError);
    }

    // Update article redirect clicks count if article_id exists
    if (redirectData.article_id) {
      const { error: articleUpdateError } = await supabase.rpc('increment', {
        table_name: 'articles',
        row_id: redirectData.article_id,
        column_name: 'redirect_clicks'
      });

      if (articleUpdateError) {
        // Fallback: manual increment
        const { data: article } = await supabase
          .from('articles')
          .select('redirect_clicks')
          .eq('id', redirectData.article_id)
          .single();

        if (article) {
          await supabase
            .from('articles')
            .update({ redirect_clicks: (article.redirect_clicks || 0) + 1 })
            .eq('id', redirectData.article_id);
        }
      }
    }

    return redirectData.original_url;
  } catch (error) {
    console.error('Error in trackClickAndRedirect:', error);
    return null;
  }
};
