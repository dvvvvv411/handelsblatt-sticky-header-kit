CREATE OR REPLACE FUNCTION public.increment_ai_usage(_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles
  SET ai_usage_count = ai_usage_count + 1
  WHERE id = _user_id;
END;
$$;