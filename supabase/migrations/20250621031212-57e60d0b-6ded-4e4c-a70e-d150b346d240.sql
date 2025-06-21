
-- Create table for tracking article visits
CREATE TABLE public.article_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL, -- Session-based ID for anonymous tracking
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX idx_article_visits_article_id ON public.article_visits(article_id);
CREATE INDEX idx_article_visits_visited_at ON public.article_visits(visited_at);
CREATE INDEX idx_article_visits_visitor_id ON public.article_visits(visitor_id);

-- Enable RLS (optional - for public tracking we might not need strict policies)
ALTER TABLE public.article_visits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting visit records (public access for tracking)
CREATE POLICY "Allow visit tracking" 
  ON public.article_visits 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading visit data for analytics (admin only)
CREATE POLICY "Allow reading visit data for admins" 
  ON public.article_visits 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
