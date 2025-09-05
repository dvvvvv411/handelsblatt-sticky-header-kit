-- Add Bovensiepen & Partner Card configuration columns to articles table
ALTER TABLE public.articles 
ADD COLUMN bovensiepen_partners_ad_enabled boolean NOT NULL DEFAULT false,
ADD COLUMN bovensiepen_partners_ad_config jsonb DEFAULT '{}'::jsonb;