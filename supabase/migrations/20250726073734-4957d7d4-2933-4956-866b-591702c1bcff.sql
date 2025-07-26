-- Add braun_investments_ad_enabled field to articles table
ALTER TABLE public.articles 
ADD COLUMN braun_investments_ad_enabled boolean NOT NULL DEFAULT false;

-- Add braun_investments_ad_config field to articles table  
ALTER TABLE public.articles 
ADD COLUMN braun_investments_ad_config jsonb DEFAULT '{}'::jsonb;