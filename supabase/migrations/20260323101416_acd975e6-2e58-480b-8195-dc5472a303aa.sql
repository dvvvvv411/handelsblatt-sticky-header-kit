
-- Create article-images storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

-- Allow authenticated users to upload to article-images
CREATE POLICY "Authenticated users can upload article images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'article-images');

-- Allow public read access to article-images
CREATE POLICY "Public can read article images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'article-images');

-- Add cta_card_type column to articles
ALTER TABLE public.articles ADD COLUMN cta_card_type text DEFAULT NULL;
