
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

// Get the base URL for short URLs
const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for server-side rendering
  return 'https://lovable.dev'; // This will be replaced with the actual domain
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

    const baseUrl = getBaseUrl();
    const shortUrl = `${baseUrl}/r/${data.short_code}`;
    console.log('Created short URL:', shortUrl);
    return shortUrl;
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

    // Increment click count in redirects table
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
      console.log('Updating article redirect clicks for article:', redirectData.article_id);
      
      // Use the RPC-style update to increment the counter
      const { error: articleUpdateError } = await supabase.rpc('increment_redirect_clicks', {
        article_id: redirectData.article_id
      });

      if (articleUpdateError) {
        console.error('Error updating article redirect clicks with RPC:', articleUpdateError);
        
        // Fallback: manually get current count and update
        const { data: article, error: fetchError } = await supabase
          .from('articles')
          .select('redirect_clicks')
          .eq('id', redirectData.article_id)
          .single();

        if (fetchError) {
          console.error('Error fetching article for click update:', fetchError);
        } else {
          const currentClicks = article?.redirect_clicks || 0;
          const { error: manualUpdateError } = await supabase
            .from('articles')
            .update({ redirect_clicks: currentClicks + 1 })
            .eq('id', redirectData.article_id);

          if (manualUpdateError) {
            console.error('Error manually updating article redirect clicks:', manualUpdateError);
          } else {
            console.log('Successfully updated article redirect clicks manually');
          }
        }
      } else {
        console.log('Successfully updated article redirect clicks with RPC');
      }
    }

    return redirectData.original_url;
  } catch (error) {
    console.error('Error in trackClickAndRedirect:', error);
    return null;
  }
};
