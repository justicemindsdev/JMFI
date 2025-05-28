-- Supabase Schema for Grain Aha Moments

-- Table for storing recordings
CREATE TABLE recordings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grain_recording_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing moments
CREATE TABLE moments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recording_id UUID REFERENCES recordings(id) ON DELETE CASCADE,
  moment_id TEXT NOT NULL,
  title TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  stop_at TEXT NOT NULL,
  transcript TEXT,
  analysis TEXT,
  sentiment TEXT,
  category TEXT,
  tags TEXT[],
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(recording_id, moment_id)
);

-- Table for storing user interactions with moments
CREATE TABLE user_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  moment_id UUID REFERENCES moments(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL, -- e.g., 'view', 'like', 'share', 'comment'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing collections of moments
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction table for collections and moments
CREATE TABLE collection_moments (
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  moment_id UUID REFERENCES moments(id) ON DELETE CASCADE,
  position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (collection_id, moment_id)
);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update the updated_at column
CREATE TRIGGER update_recordings_updated_at
BEFORE UPDATE ON recordings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_moments_updated_at
BEFORE UPDATE ON moments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at
BEFORE UPDATE ON collections
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies for security

-- Recordings policies
ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public recordings are viewable by everyone"
ON recordings FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own recordings"
ON recordings FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own recordings"
ON recordings FOR UPDATE
USING (auth.uid() IN (
  SELECT user_id FROM collections
  WHERE id IN (
    SELECT collection_id FROM collection_moments
    WHERE aha_moment_id IN (
      SELECT id FROM aha_moments
      WHERE recording_id = recordings.id
    )
  )
));

-- Moments policies
ALTER TABLE moments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Moments are viewable by everyone"
ON moments FOR SELECT
USING (true);

CREATE POLICY "Users can insert moments for recordings they own"
ON moments FOR INSERT
WITH CHECK (auth.uid() IN (
  SELECT user_id FROM collections
  WHERE id IN (
    SELECT collection_id FROM collection_moments
    WHERE moment_id IN (
      SELECT id FROM moments
      WHERE recording_id = moments.recording_id
    )
  )
));

CREATE POLICY "Users can update their own moments"
ON moments FOR UPDATE
USING (auth.uid() IN (
  SELECT user_id FROM collections
  WHERE id IN (
    SELECT collection_id FROM collection_moments
    WHERE moment_id = moments.id
  )
));

-- Collections policies
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public collections are viewable by everyone"
ON collections FOR SELECT
USING (is_public OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own collections"
ON collections FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own collections"
ON collections FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own collections"
ON collections FOR DELETE
USING (auth.uid() = user_id);

-- Collection moments policies
ALTER TABLE collection_moments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Collection moments are viewable if collection is public or owned by user"
ON collection_moments FOR SELECT
USING (
  collection_id IN (
    SELECT id FROM collections
    WHERE is_public OR auth.uid() = user_id
  )
);

CREATE POLICY "Users can insert moments into their own collections"
ON collection_moments FOR INSERT
WITH CHECK (
  collection_id IN (
    SELECT id FROM collections
    WHERE auth.uid() = user_id
  )
);

CREATE POLICY "Users can update moments in their own collections"
ON collection_moments FOR UPDATE
USING (
  collection_id IN (
    SELECT id FROM collections
    WHERE auth.uid() = user_id
  )
);

CREATE POLICY "Users can delete moments from their own collections"
ON collection_moments FOR DELETE
USING (
  collection_id IN (
    SELECT id FROM collections
    WHERE auth.uid() = user_id
  )
);

-- Create a table for prompts
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a junction table for prompts and moments
CREATE TABLE prompt_moments (
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  moment_id UUID REFERENCES moments(id) ON DELETE CASCADE,
  relevance_score FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (prompt_id, moment_id)
);

-- Prompts policies
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own prompts"
ON prompts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prompts"
ON prompts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Prompt moments policies
ALTER TABLE prompt_moments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view prompt moments for their prompts"
ON prompt_moments FOR SELECT
USING (
  prompt_id IN (
    SELECT id FROM prompts
    WHERE auth.uid() = user_id
  )
);

CREATE POLICY "Users can insert prompt moments for their prompts"
ON prompt_moments FOR INSERT
WITH CHECK (
  prompt_id IN (
    SELECT id FROM prompts
    WHERE auth.uid() = user_id
  )
);

-- User interactions policies
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all interactions"
ON user_interactions FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own interactions"
ON user_interactions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions"
ON user_interactions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions"
ON user_interactions FOR DELETE
USING (auth.uid() = user_id);
