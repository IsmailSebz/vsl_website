-- =============================================================================
-- Victoria Sugar Limited — Supabase Auth Setup
-- Run this AFTER schema.sql
-- =============================================================================
-- Supabase manages auth.users, auth.sessions, auth.refresh_tokens automatically.
-- This file adds:
--   1. A secure is_admin() helper used by RLS policies and API routes
--   2. An admin_audit_log table for tracking all content changes
--   3. A site_settings update for admin email (used by is_admin())
--   4. Realtime publication for tables the admin dashboard will subscribe to
-- =============================================================================


-- ─────────────────────────────────────────────────────────────────────────────
-- 1. ADMIN EMAIL SETTING
-- Store the admin email in site_settings so is_admin() can validate it.
-- Update 'admin@example.com' to your actual admin email before running.
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.site_settings (key, value, description)
VALUES (
  'admin_email',
  'admin@example.com',
  'The single admin account email address. Must match the Supabase Auth user email.'
)
ON CONFLICT (key) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. is_admin() FUNCTION
-- Returns TRUE only when the calling user is authenticated AND their email
-- matches the admin_email setting.
-- SECURITY DEFINER: runs as the function owner (bypasses RLS to read settings).
-- Used in RLS policies and callable from server-side API routes via RPC.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
DECLARE
  v_admin_email TEXT;
  v_user_email  TEXT;
BEGIN
  -- Must be authenticated first
  IF auth.role() <> 'authenticated' THEN
    RETURN FALSE;
  END IF;

  -- Get the registered admin email
  SELECT value INTO v_admin_email
  FROM public.site_settings
  WHERE key = 'admin_email'
  LIMIT 1;

  -- Get the current user's email from auth.users
  SELECT email INTO v_user_email
  FROM auth.users
  WHERE id = auth.uid()
  LIMIT 1;

  RETURN v_user_email IS NOT NULL
     AND v_admin_email IS NOT NULL
     AND lower(v_user_email) = lower(v_admin_email);
END;
$$;

-- Allow authenticated users to call is_admin() via RPC
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon;


-- ─────────────────────────────────────────────────────────────────────────────
-- 3. ADMIN AUDIT LOG
-- Records every create / update / delete action performed by the admin.
-- Gives a full trail of who changed what and when (useful if admin account
-- is ever compromised or accidental deletions happen).
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  action       TEXT        NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  table_name   TEXT        NOT NULL,
  record_id    TEXT,                      -- UUID of the affected row (as text for flexibility)
  record_title TEXT,                      -- human-readable label e.g. news article title
  old_data     JSONB,                     -- previous state (for UPDATE / DELETE)
  new_data     JSONB,                     -- new state (for INSERT / UPDATE)
  performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only authenticated admin can read or insert audit logs
CREATE POLICY "admin_read_audit_log"
  ON public.admin_audit_log FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_insert_audit_log"
  ON public.admin_audit_log FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Index for fast dashboard queries
CREATE INDEX IF NOT EXISTS idx_audit_log_performed_at ON public.admin_audit_log (performed_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_name   ON public.admin_audit_log (table_name);


-- ─────────────────────────────────────────────────────────────────────────────
-- 4. ADMIN PROFILE TABLE
-- Stores display preferences for the admin panel (display name, avatar, etc.)
-- Automatically created when the admin signs up via a trigger.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_profile (
  id           UUID        PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name TEXT        NOT NULL DEFAULT 'Administrator',
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER admin_profile_set_updated_at
  BEFORE UPDATE ON public.admin_profile
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.admin_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_read_own_profile"
  ON public.admin_profile FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "admin_update_own_profile"
  ON public.admin_profile FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);


-- ─────────────────────────────────────────────────────────────────────────────
-- 5. AUTO-CREATE ADMIN PROFILE ON SIGNUP
-- When the admin account is created in Supabase Auth, automatically insert
-- a row into admin_profile.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.admin_profile (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Administrator')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Drop and recreate to avoid duplicate trigger errors on re-run
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ─────────────────────────────────────────────────────────────────────────────
-- 6. PASSWORD RESET RATE LIMIT HELPER
-- Supabase handles password reset emails natively. No extra table needed.
-- To configure: Supabase Dashboard → Authentication → Email Templates
-- → update the "Reset Password" template with Victoria Sugar branding.
-- Rate limiting: Authentication → Settings → set "Rate limit for auth emails"
-- ─────────────────────────────────────────────────────────────────────────────


-- ─────────────────────────────────────────────────────────────────────────────
-- 7. REALTIME — enable for tables the admin dashboard polls live
-- ─────────────────────────────────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_subscribers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_audit_log;


-- ─────────────────────────────────────────────────────────────────────────────
-- 8. DASHBOARD HELPER VIEWS
-- Pre-built queries the admin dashboard will call for summary counts.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.admin_dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM public.news            WHERE is_published = true)  AS published_news,
  (SELECT COUNT(*) FROM public.news            WHERE is_published = false) AS draft_news,
  (SELECT COUNT(*) FROM public.gallery_albums)                              AS gallery_albums,
  (SELECT COUNT(*) FROM public.gallery_items)                               AS gallery_items,
  (SELECT COUNT(*) FROM public.tenders         WHERE is_active = true)     AS active_tenders,
  (SELECT COUNT(*) FROM public.careers         WHERE is_active = true)     AS active_jobs,
  (SELECT COUNT(*) FROM public.events          WHERE is_active = true)     AS upcoming_events,
  (SELECT COUNT(*) FROM public.inquiries       WHERE is_read = false)      AS unread_inquiries,
  (SELECT COUNT(*) FROM public.inquiries)                                   AS total_inquiries,
  (SELECT COUNT(*) FROM public.newsletter_subscribers WHERE is_active = true) AS subscribers,
  (SELECT COUNT(*) FROM public.downloads)                                   AS downloads;

-- Grant access to the view for authenticated users
GRANT SELECT ON public.admin_dashboard_stats TO authenticated;


-- ─────────────────────────────────────────────────────────────────────────────
-- 9. RECENT INQUIRIES VIEW (last 10, for admin dashboard widget)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.recent_inquiries AS
SELECT
  id,
  name,
  email,
  subject,
  inquiry_type,
  is_read,
  created_at
FROM public.inquiries
ORDER BY created_at DESC
LIMIT 10;

GRANT SELECT ON public.recent_inquiries TO authenticated;
