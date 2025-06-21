
-- Create articles table for CMS
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  author TEXT NOT NULL,
  hero_image_url TEXT,
  hero_image_caption TEXT,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  bitloon_ad_enabled BOOLEAN NOT NULL DEFAULT true,
  bitloon_ad_config JSONB DEFAULT '{}'::jsonb,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users NOT NULL
);

-- Create index on slug for fast lookups
CREATE INDEX idx_articles_slug ON public.articles(slug);

-- Create index on published status for filtering
CREATE INDEX idx_articles_published ON public.articles(published);

-- Create index on created_by for user filtering
CREATE INDEX idx_articles_created_by ON public.articles(created_by);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published articles
CREATE POLICY "Anyone can view published articles" 
  ON public.articles 
  FOR SELECT 
  USING (published = true);

-- Policy: Admins can view all articles
CREATE POLICY "Admins can view all articles" 
  ON public.articles 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Admins can create articles
CREATE POLICY "Admins can create articles" 
  ON public.articles 
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy: Admins can update articles
CREATE POLICY "Admins can update articles" 
  ON public.articles 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Admins can delete articles
CREATE POLICY "Admins can delete articles" 
  ON public.articles 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_articles_updated_at 
  BEFORE UPDATE ON public.articles 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
