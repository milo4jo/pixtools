-- =============================================
-- Migration: Add app_id to existing OGPix tables
-- Run this in Supabase SQL Editor
-- =============================================

-- Step 1: Add apps table
CREATE TABLE IF NOT EXISTS apps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial apps
INSERT INTO apps (id, name, description) VALUES
  ('ogpix', 'OGPix', 'OG Image Generator API'),
  ('favpix', 'FavPix', 'Favicon Generator'),
  ('qrpix', 'QRPix', 'QR Code Generator')
ON CONFLICT (id) DO NOTHING;

-- Step 2: Add app_id column to api_keys
ALTER TABLE api_keys 
ADD COLUMN IF NOT EXISTS app_id TEXT REFERENCES apps(id) DEFAULT 'ogpix';

-- Update existing keys to have app_id = 'ogpix'
UPDATE api_keys SET app_id = 'ogpix' WHERE app_id IS NULL;

-- Make app_id NOT NULL after backfill
ALTER TABLE api_keys ALTER COLUMN app_id SET NOT NULL;

-- Step 3: Add app_id column to user_plans
ALTER TABLE user_plans 
ADD COLUMN IF NOT EXISTS app_id TEXT REFERENCES apps(id) DEFAULT 'ogpix';

-- Update existing plans to have app_id = 'ogpix'
UPDATE user_plans SET app_id = 'ogpix' WHERE app_id IS NULL;

-- Make app_id NOT NULL after backfill
ALTER TABLE user_plans ALTER COLUMN app_id SET NOT NULL;

-- Step 4: Update unique constraint on user_plans
-- Drop old constraint if exists, add new one with app_id
ALTER TABLE user_plans DROP CONSTRAINT IF EXISTS user_plans_user_id_key;
ALTER TABLE user_plans ADD CONSTRAINT user_plans_user_app_unique UNIQUE(user_id, app_id);

-- Step 5: Create indexes for app_id queries
CREATE INDEX IF NOT EXISTS idx_api_keys_app_id ON api_keys(app_id);
CREATE INDEX IF NOT EXISTS idx_user_plans_app_id ON user_plans(app_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_app ON api_keys(user_id, app_id);

-- Step 6: Update can_generate function to include app_id
CREATE OR REPLACE FUNCTION can_generate(p_api_key TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  v_api_key_id UUID;
  v_user_id UUID;
  v_app_id TEXT;
  v_limit INTEGER;
  v_usage INTEGER;
BEGIN
  -- Get API key, user, and app
  SELECT ak.id, ak.user_id, ak.app_id INTO v_api_key_id, v_user_id, v_app_id
  FROM api_keys ak
  WHERE ak.key = p_api_key AND ak.is_active = TRUE;
  
  IF v_api_key_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Get user's limit for this specific app
  SELECT COALESCE(up.monthly_limit, 500) INTO v_limit
  FROM user_plans up
  WHERE up.user_id = v_user_id AND up.app_id = v_app_id;
  
  IF v_limit IS NULL THEN
    v_limit := 500; -- Default free limit
  END IF;
  
  -- Get current usage
  v_usage := get_monthly_usage(v_api_key_id);
  
  RETURN v_usage < v_limit;
END;
$$ LANGUAGE plpgsql;

-- Step 7: RLS for apps table
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on apps" ON apps
  FOR ALL USING (true);

-- =============================================
-- Verification queries (run after migration)
-- =============================================
-- SELECT * FROM apps;
-- SELECT id, user_id, app_id, key FROM api_keys LIMIT 5;
-- SELECT id, user_id, app_id, plan FROM user_plans LIMIT 5;
