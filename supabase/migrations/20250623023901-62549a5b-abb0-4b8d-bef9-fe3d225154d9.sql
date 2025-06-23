
-- Add publication_date and use_current_date fields to the articles table
ALTER TABLE public.articles 
ADD COLUMN publication_date DATE,
ADD COLUMN use_current_date BOOLEAN NOT NULL DEFAULT true;

-- Add index for publication_date for better query performance
CREATE INDEX idx_articles_publication_date ON public.articles(publication_date);
