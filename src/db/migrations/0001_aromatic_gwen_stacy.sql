CREATE INDEX IF NOT EXISTS "search_index" ON "SolaceHealth"."advocates" USING gin ((
      setweight(to_tsvector('english', "first_name"), 'A') ||
      setweight(to_tsvector('english', "last_name"), 'A') ||
      setweight(to_tsvector('english', "city"), 'B') ||
      setweight(to_tsvector('english', "degree"), 'B') ||
      setweight(to_tsvector('english', "payload"), 'C') ||
      setweight(to_tsvector('english', "years_of_experience"::text), 'D') ||
      setweight(to_tsvector('english', "phone_number"::text), 'D')
    ));