
UPDATE articles
SET content = (
  SELECT jsonb_agg(
    jsonb_set(elem, '{title}', '""'::jsonb)
  )
  FROM jsonb_array_elements(content) AS elem
)
WHERE jsonb_array_length(content) > 0;
