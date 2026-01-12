-- Create function to get accurate article visit statistics without row limits
CREATE OR REPLACE FUNCTION get_article_visit_stats(p_article_id UUID)
RETURNS TABLE (
  total_visits BIGINT,
  unique_visitors BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_visits,
    COUNT(DISTINCT visitor_id)::BIGINT as unique_visitors
  FROM article_visits
  WHERE article_id = p_article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get total website stats without row limits
CREATE OR REPLACE FUNCTION get_total_visit_stats()
RETURNS TABLE (
  total_visits BIGINT,
  unique_visitors BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_visits,
    COUNT(DISTINCT visitor_id)::BIGINT as unique_visitors
  FROM article_visits;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;