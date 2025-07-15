-- Add lawyer card configuration fields to articles table
ALTER TABLE public.articles 
ADD COLUMN lawyer_ad_enabled boolean NOT NULL DEFAULT false,
ADD COLUMN lawyer_ad_config jsonb DEFAULT '{}'::jsonb;