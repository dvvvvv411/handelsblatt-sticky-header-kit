
-- Update handle_new_user to assign 'kunde' role by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name'
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'kunde');
  
  RETURN NEW;
END;
$$;

-- RLS for articles: kunde can CRUD own articles
CREATE POLICY "Kunden can view own articles"
ON public.articles FOR SELECT TO authenticated
USING (created_by = auth.uid() AND public.has_role(auth.uid(), 'kunde'));

CREATE POLICY "Kunden can create articles"
ON public.articles FOR INSERT TO authenticated
WITH CHECK (created_by = auth.uid() AND public.has_role(auth.uid(), 'kunde'));

CREATE POLICY "Kunden can update own articles"
ON public.articles FOR UPDATE TO authenticated
USING (created_by = auth.uid() AND public.has_role(auth.uid(), 'kunde'));

CREATE POLICY "Kunden can delete own articles"
ON public.articles FOR DELETE TO authenticated
USING (created_by = auth.uid() AND public.has_role(auth.uid(), 'kunde'));

-- RLS for custom_cards: kunde can CRUD own cards
CREATE POLICY "Kunden can view own cards"
ON public.custom_cards FOR SELECT TO authenticated
USING (created_by = auth.uid() AND public.has_role(auth.uid(), 'kunde'));

CREATE POLICY "Kunden can create cards"
ON public.custom_cards FOR INSERT TO authenticated
WITH CHECK (created_by = auth.uid() AND public.has_role(auth.uid(), 'kunde'));

CREATE POLICY "Kunden can update own cards"
ON public.custom_cards FOR UPDATE TO authenticated
USING (created_by = auth.uid() AND public.has_role(auth.uid(), 'kunde'));

CREATE POLICY "Kunden can delete own cards"
ON public.custom_cards FOR DELETE TO authenticated
USING (created_by = auth.uid() AND public.has_role(auth.uid(), 'kunde'));

-- RLS for article_visits: kunde can see visits for own articles
CREATE POLICY "Kunden can view own article visits"
ON public.article_visits FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'kunde') AND
  article_id IN (SELECT id FROM public.articles WHERE created_by = auth.uid())
);

-- RLS for user_roles: users can read their own role
CREATE POLICY "Users can view own role"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());
