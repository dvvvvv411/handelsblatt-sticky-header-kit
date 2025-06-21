
-- Create RPC function to increment redirect clicks for an article
CREATE OR REPLACE FUNCTION public.increment_redirect_clicks(article_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.articles 
  SET redirect_clicks = COALESCE(redirect_clicks, 0) + 1,
      updated_at = now()
  WHERE id = article_id;
END;
$$;
