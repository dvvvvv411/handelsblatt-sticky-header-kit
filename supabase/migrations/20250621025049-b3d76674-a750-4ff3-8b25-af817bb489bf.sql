
-- Update RLS policies for redirects table to allow unauthenticated users to create short URLs
-- This is necessary because the ArticlePaywall component runs on the public-facing articles
-- where users may not be authenticated

-- Drop the existing restrictive policy for inserts
DROP POLICY IF EXISTS "Allow authenticated users to insert redirects" ON public.redirects;

-- Create a new policy that allows anyone to insert redirects
-- This is safe because we're only storing non-sensitive redirect information
CREATE POLICY "Allow anyone to insert redirects" 
  ON public.redirects 
  FOR INSERT 
  WITH CHECK (true);

-- Also update the update policy to allow unauthenticated users to increment click counts
DROP POLICY IF EXISTS "Allow authenticated users to update redirects" ON public.redirects;

CREATE POLICY "Allow anyone to update redirects" 
  ON public.redirects 
  FOR UPDATE 
  USING (true);
