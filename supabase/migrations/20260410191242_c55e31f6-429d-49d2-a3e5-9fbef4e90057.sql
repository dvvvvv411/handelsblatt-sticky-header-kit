CREATE POLICY "Anyone can view custom cards"
ON public.custom_cards FOR SELECT TO public
USING (true);