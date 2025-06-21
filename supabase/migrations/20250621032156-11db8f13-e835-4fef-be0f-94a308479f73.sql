
-- First, let's identify and remove duplicate redirects, keeping only the most recent one for each article
WITH ranked_redirects AS (
  SELECT id, article_id, 
         ROW_NUMBER() OVER (PARTITION BY article_id ORDER BY created_at DESC, click_count DESC) as rn
  FROM public.redirects 
  WHERE article_id IS NOT NULL
),
duplicates_to_delete AS (
  SELECT id 
  FROM ranked_redirects 
  WHERE rn > 1
)
DELETE FROM public.redirects 
WHERE id IN (SELECT id FROM duplicates_to_delete);

-- Now create the unique index to ensure one redirect per article
CREATE UNIQUE INDEX IF NOT EXISTS unique_article_redirect_idx 
ON public.redirects(article_id) 
WHERE article_id IS NOT NULL;

-- Create index for better performance when looking up existing redirects by article
CREATE INDEX IF NOT EXISTS idx_redirects_article_lookup 
ON public.redirects(article_id) 
WHERE article_id IS NOT NULL;
