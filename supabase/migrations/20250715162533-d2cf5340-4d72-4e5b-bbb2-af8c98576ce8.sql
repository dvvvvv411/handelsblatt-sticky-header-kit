-- Add lawyer card configuration to articles table
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS lawyer_ad_enabled boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS lawyer_ad_config jsonb DEFAULT '{}'::jsonb;