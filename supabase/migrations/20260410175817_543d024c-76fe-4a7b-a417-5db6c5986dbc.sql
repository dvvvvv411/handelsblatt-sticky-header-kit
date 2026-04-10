ALTER TABLE public.profiles 
  ADD COLUMN ai_usage_count integer NOT NULL DEFAULT 0,
  ADD COLUMN ai_assistant_enabled boolean NOT NULL DEFAULT true;