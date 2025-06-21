
-- Add foreign key constraint to establish relationship between profiles and user_roles
-- Both tables reference auth.users, so we can join through that relationship
-- But let's also add an index to improve query performance

-- Add index on user_roles.user_id for better join performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);

-- Add index on profiles.id for better join performance  
CREATE INDEX IF NOT EXISTS idx_profiles_id ON public.profiles(id);
