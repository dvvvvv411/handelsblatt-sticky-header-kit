
-- Create the redirects table for URL shortening
CREATE TABLE public.redirects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  short_code TEXT NOT NULL UNIQUE,
  original_url TEXT NOT NULL,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  click_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for faster lookups
CREATE INDEX idx_redirects_short_code ON public.redirects(short_code);
CREATE INDEX idx_redirects_article_id ON public.redirects(article_id);

-- Add click tracking column to articles table
ALTER TABLE public.articles 
ADD COLUMN redirect_clicks INTEGER DEFAULT 0;

-- Enable RLS on redirects table
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;

-- Create policies for redirects table
CREATE POLICY "Allow public read access to redirects" 
  ON public.redirects 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to insert redirects" 
  ON public.redirects 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update redirects" 
  ON public.redirects 
  FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_redirects_updated_at
  BEFORE UPDATE ON public.redirects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
