-- =============================================================================
-- Victoria Sugar Limited — Supabase Schema
-- Project: sebzismail Project (ffsddbbtgoxbqlrnvcrm)
-- =============================================================================
-- Run this entire file in the Supabase SQL Editor.
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE throughout.
-- =============================================================================


-- ─────────────────────────────────────────────────────────────────────────────
-- EXTENSIONS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- enables fast ILIKE / full-text search


-- ─────────────────────────────────────────────────────────────────────────────
-- UTILITY: auto-update updated_at on any table that has the column
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =============================================================================
-- TABLES
-- =============================================================================


-- ─────────────────────────────────────────────────────────────────────────────
-- NEWS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.news (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT        NOT NULL,
  body_html        TEXT        NOT NULL,
  cover_image_url  TEXT,
  excerpt          TEXT,                        -- short preview (auto-filled or manual)
  published_date   DATE        NOT NULL DEFAULT CURRENT_DATE,
  is_published     BOOLEAN     NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER news_set_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_news_published_date ON public.news (published_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_is_published    ON public.news (is_published);


-- ─────────────────────────────────────────────────────────────────────────────
-- GALLERY ALBUMS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.gallery_albums (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT        NOT NULL,
  description      TEXT,
  cover_image_url  TEXT,
  sort_order       INTEGER     NOT NULL DEFAULT 0,  -- manual ordering
  is_published     BOOLEAN     NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER gallery_albums_set_updated_at
  BEFORE UPDATE ON public.gallery_albums
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_gallery_albums_sort ON public.gallery_albums (sort_order ASC, created_at DESC);


-- ─────────────────────────────────────────────────────────────────────────────
-- GALLERY ITEMS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  album_id         UUID        NOT NULL REFERENCES public.gallery_albums (id) ON DELETE CASCADE,
  type             TEXT        NOT NULL CHECK (type IN ('image', 'video')),
  url              TEXT        NOT NULL,
  thumbnail_url    TEXT,                          -- poster frame for video; same as url for image
  title            TEXT,
  description      TEXT,
  file_name        TEXT,                          -- original filename
  file_size        BIGINT,                        -- bytes
  duration_seconds INTEGER,                       -- video duration
  sort_order       INTEGER     NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_items_album_id   ON public.gallery_items (album_id);
CREATE INDEX IF NOT EXISTS idx_gallery_items_type       ON public.gallery_items (type);
CREATE INDEX IF NOT EXISTS idx_gallery_items_created_at ON public.gallery_items (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_items_sort       ON public.gallery_items (album_id, sort_order ASC);


-- ─────────────────────────────────────────────────────────────────────────────
-- TENDERS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tenders (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT        NOT NULL,
  reference_number TEXT,
  description      TEXT,
  file_url         TEXT,                          -- PDF or document download
  deadline         DATE,
  is_active        BOOLEAN     NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER tenders_set_updated_at
  BEFORE UPDATE ON public.tenders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_tenders_is_active ON public.tenders (is_active);
CREATE INDEX IF NOT EXISTS idx_tenders_deadline  ON public.tenders (deadline DESC);


-- ─────────────────────────────────────────────────────────────────────────────
-- CAREERS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.careers (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT        NOT NULL,
  department       TEXT,
  location         TEXT        DEFAULT 'Masaka, Uganda',
  description      TEXT        NOT NULL,
  requirements     TEXT,
  how_to_apply     TEXT,
  deadline         DATE,
  is_active        BOOLEAN     NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER careers_set_updated_at
  BEFORE UPDATE ON public.careers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_careers_is_active ON public.careers (is_active);


-- ─────────────────────────────────────────────────────────────────────────────
-- PRESS RELEASES
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.press_releases (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT        NOT NULL,
  body_html        TEXT        NOT NULL,
  published_date   DATE        NOT NULL DEFAULT CURRENT_DATE,
  is_published     BOOLEAN     NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER press_releases_set_updated_at
  BEFORE UPDATE ON public.press_releases
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_press_releases_published_date ON public.press_releases (published_date DESC);


-- ─────────────────────────────────────────────────────────────────────────────
-- EVENTS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.events (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT        NOT NULL,
  description      TEXT,
  event_date       DATE        NOT NULL,
  event_end_date   DATE,                          -- for multi-day events
  location         TEXT,
  image_url        TEXT,
  is_active        BOOLEAN     NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER events_set_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_events_event_date ON public.events (event_date ASC);
CREATE INDEX IF NOT EXISTS idx_events_is_active  ON public.events (is_active);


-- ─────────────────────────────────────────────────────────────────────────────
-- DOWNLOADS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.downloads (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT        NOT NULL,
  category         TEXT,                          -- e.g. 'Annual Report', 'Brochure', 'Certificate'
  file_url         TEXT        NOT NULL,
  file_size        BIGINT,
  file_type        TEXT,                          -- e.g. 'PDF', 'XLSX'
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_downloads_category ON public.downloads (category);


-- ─────────────────────────────────────────────────────────────────────────────
-- INQUIRIES  (contact form + general inquiry form submissions)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.inquiries (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  phone            TEXT,
  subject          TEXT,
  message          TEXT        NOT NULL,
  inquiry_type     TEXT        DEFAULT 'general', -- 'general', 'bulk_order', 'export', 'outgrower', 'career'
  is_read          BOOLEAN     NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_is_read    ON public.inquiries (is_read);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries (created_at DESC);


-- ─────────────────────────────────────────────────────────────────────────────
-- NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  email            TEXT        UNIQUE NOT NULL,
  is_active        BOOLEAN     NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_is_active ON public.newsletter_subscribers (is_active);


-- ─────────────────────────────────────────────────────────────────────────────
-- SITE SETTINGS  (key/value store for admin-editable site content)
-- Lets the admin update contact info, social links, hero text etc.
-- without a code deploy.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
  key              TEXT        PRIMARY KEY,
  value            TEXT,
  description      TEXT,                          -- human-readable hint for admin UI
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER site_settings_set_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE public.news                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenders               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.press_releases        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings         ENABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────────────────────────────────────────
-- PUBLIC READ POLICIES  (anonymous visitors)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE POLICY "public_read_news"
  ON public.news FOR SELECT
  USING (is_published = true);

CREATE POLICY "public_read_gallery_albums"
  ON public.gallery_albums FOR SELECT
  USING (is_published = true);

CREATE POLICY "public_read_gallery_items"
  ON public.gallery_items FOR SELECT
  USING (true); -- album-level filter handled in query

CREATE POLICY "public_read_active_tenders"
  ON public.tenders FOR SELECT
  USING (is_active = true);

CREATE POLICY "public_read_active_careers"
  ON public.careers FOR SELECT
  USING (is_active = true);

CREATE POLICY "public_read_press_releases"
  ON public.press_releases FOR SELECT
  USING (is_published = true);

CREATE POLICY "public_read_active_events"
  ON public.events FOR SELECT
  USING (is_active = true);

CREATE POLICY "public_read_downloads"
  ON public.downloads FOR SELECT
  USING (true);

CREATE POLICY "public_read_site_settings"
  ON public.site_settings FOR SELECT
  USING (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- PUBLIC WRITE POLICIES  (visitors can submit forms)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE POLICY "public_insert_inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "public_insert_newsletter"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- ADMIN POLICIES  (authenticated = the single admin account)
-- Full access to everything
-- ─────────────────────────────────────────────────────────────────────────────
CREATE POLICY "admin_all_news"
  ON public.news FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_gallery_albums"
  ON public.gallery_albums FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_gallery_items"
  ON public.gallery_items FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_tenders"
  ON public.tenders FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_careers"
  ON public.careers FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_press_releases"
  ON public.press_releases FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_events"
  ON public.events FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_downloads"
  ON public.downloads FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_read_inquiries"
  ON public.inquiries FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_update_inquiries"
  ON public.inquiries FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_inquiries"
  ON public.inquiries FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_read_newsletter"
  ON public.newsletter_subscribers FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_update_newsletter"
  ON public.newsletter_subscribers FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_all_site_settings"
  ON public.site_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');


-- =============================================================================
-- SEED DATA
-- =============================================================================


-- ─────────────────────────────────────────────────────────────────────────────
-- SITE SETTINGS defaults
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.site_settings (key, value, description) VALUES
  ('company_name',        'Victoria Sugar Limited',          'Full legal company name'),
  ('company_tagline',     'Sweetening Uganda, Powering Africa', 'Hero section tagline'),
  ('company_address',     'P.O. Box 1, Kakira, Jinja, Uganda', 'Physical address'),
  ('company_phone',       '+256 781 989 621',                'Primary phone number'),
  ('company_email',       'info@victoriasugar.com',          'Primary contact email'),
  ('company_whatsapp',    '256781989621',                    'WhatsApp number (international, no +)'),
  ('facebook_url',        '',                                'Facebook page URL'),
  ('twitter_url',         '',                                'Twitter/X profile URL'),
  ('linkedin_url',        '',                                'LinkedIn page URL'),
  ('youtube_url',         '',                                'YouTube channel URL'),
  ('hero_video_url',      '',                                'Optional background video for hero section'),
  ('hero_image_url',      'https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg', 'Hero section background image'),
  ('stats_years',         '25+',                             'Years in operation (stats strip)'),
  ('stats_production',    '150,000+',                        'Tonnes produced annually (stats strip)'),
  ('stats_farmers',       '5,000+',                          'Outgrower farmers (stats strip)'),
  ('stats_employees',     '3,000+',                          'Number of employees (stats strip)'),
  ('stats_markets',       '10+',                             'Export markets (stats strip)')
ON CONFLICT (key) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────────────
-- SAMPLE GALLERY ALBUMS
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.gallery_albums (id, title, description, cover_image_url, sort_order) VALUES
  (
    'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa',
    'Estate Aerial Views',
    'Breathtaking drone footage and aerial photography capturing the full scale of the Victoria Sugar estate.',
    'https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg',
    1
  ),
  (
    'bbbbbbbb-0002-0002-0002-bbbbbbbbbbbb',
    'Operations & Production',
    'Behind the scenes of our world-class sugar production operations and processing facilities.',
    'https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg',
    2
  )
ON CONFLICT (id) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────────────
-- SAMPLE GALLERY ITEMS
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.gallery_items (album_id, type, url, thumbnail_url, title, sort_order) VALUES
  (
    'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa',
    'image',
    'https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg',
    'https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg',
    'Estate Overview — Morning',
    1
  ),
  (
    'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa',
    'image',
    'https://media.victoriasugar.ug/images/DJI_20251217122314_0861_D.JPG',
    'https://media.victoriasugar.ug/images/DJI_20251217122314_0861_D.JPG',
    'Estate Overview — Wide Angle',
    2
  ),
  (
    'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa',
    'video',
    'https://media.victoriasugar.ug/videos/VID-20260627-WA0019.mp4',
    'https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg',
    'Aerial Estate Flyover',
    3
  ),
  (
    'bbbbbbbb-0002-0002-0002-bbbbbbbbbbbb',
    'image',
    'https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg',
    'https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg',
    'Production Facility — Afternoon',
    1
  ),
  (
    'bbbbbbbb-0002-0002-0002-bbbbbbbbbbbb',
    'image',
    'https://media.victoriasugar.ug/images/DJI_20251217161734_0934_D.jpg',
    'https://media.victoriasugar.ug/images/DJI_20251217161734_0934_D.jpg',
    'Production Facility — Sunset',
    2
  ),
  (
    'bbbbbbbb-0002-0002-0002-bbbbbbbbbbbb',
    'video',
    'https://media.victoriasugar.ug/videos/VID-20260627-WA0107.mp4',
    'https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg',
    'Operations in Motion',
    3
  ),
  (
    'bbbbbbbb-0002-0002-0002-bbbbbbbbbbbb',
    'video',
    'https://media.victoriasugar.ug/videos/VID-20260627-WA0020.mp4',
    'https://media.victoriasugar.ug/images/DJI_20251217161734_0934_D.jpg',
    'Factory Walkthrough',
    4
  )
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────────────
-- SAMPLE NEWS
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.news (title, body_html, cover_image_url, excerpt, published_date) VALUES
  (
    'Victoria Sugar Expands Production Capacity by 30%',
    '<p>Victoria Sugar Limited is proud to announce a landmark expansion of our production facilities, increasing annual output capacity by 30%. This investment reinforces our commitment to meeting the growing demand for quality sugar across Uganda and the region.</p><p>The expansion includes modernised milling equipment, enhanced refining processes, and improved energy recovery systems that allow us to generate additional electricity from bagasse — a by-product of sugarcane processing.</p><p>Chief Executive Officer stated: <em>"This expansion positions Victoria Sugar as a cornerstone of Uganda''s agro-industrial growth story. We remain committed to quality, sustainability, and the communities we serve."</em></p>',
    'https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg',
    'A 30% increase in production capacity signals a major milestone for Victoria Sugar and the communities it supports.',
    '2026-06-01'
  ),
  (
    'Outgrower Programme Now Supports Over 5,000 Farmers',
    '<p>Victoria Sugar''s outgrower programme has reached a significant milestone, now actively supporting more than 5,000 smallholder farmers across the region. Each farmer receives technical training, subsidised inputs, and a guaranteed market for their sugarcane harvest.</p><p>The programme has contributed to measurable improvements in household incomes and food security across participating communities, with average yields increasing by 22% over the past three seasons.</p>',
    'https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg',
    'Our outgrower programme continues to transform livelihoods, now partnering with over 5,000 local farmers.',
    '2026-05-15'
  ),
  (
    'Victoria Sugar Receives National Quality Excellence Award',
    '<p>We are honoured to have received the National Quality Excellence Award at this year''s Uganda Manufacturing Association Annual Gala. The award recognises Victoria Sugar''s consistent adherence to international food safety standards and product quality benchmarks.</p><p>Our quality assurance team works tirelessly to ensure every batch of sugar, ethanol, and alcohol that leaves our facility meets the highest standards. This recognition belongs to every member of our workforce.</p>',
    'https://media.victoriasugar.ug/images/DJI_20251217122314_0861_D.JPG',
    'Victoria Sugar Limited has been awarded the National Quality Excellence Award at the UMA Annual Gala.',
    '2026-04-20'
  )
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────────────
-- SAMPLE TENDERS
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.tenders (title, reference_number, description, deadline) VALUES
  (
    'Supply of Sugarcane Harvesting Equipment',
    'VSL/TDR/2026/001',
    'Victoria Sugar Limited invites sealed bids from eligible suppliers for the supply and delivery of sugarcane harvesting equipment. Interested bidders may collect tender documents from the Procurement Office.',
    '2026-07-31'
  ),
  (
    'Construction of Staff Housing Units — Phase 3',
    'VSL/TDR/2026/002',
    'Bids are invited from registered contractors for the construction of 20 staff housing units at the Victoria Sugar estate. Bidders must be registered with the Uganda Registration Services Bureau.',
    '2026-08-15'
  )
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────────────
-- SAMPLE CAREERS
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.careers (title, department, description, requirements, how_to_apply, deadline) VALUES
  (
    'Electrical Engineer',
    'Engineering',
    'Victoria Sugar Limited seeks a qualified Electrical Engineer to oversee the maintenance and operation of electrical systems across the production facility, including power generation and distribution.',
    'Bachelor''s degree in Electrical Engineering. Minimum 3 years experience in an industrial setting. Experience with power generation systems is an advantage.',
    'Submit your CV and cover letter to careers@victoriasugar.com with the subject line "Electrical Engineer Application".',
    '2026-07-20'
  ),
  (
    'Agronomist — Outgrower Programme',
    'Agriculture',
    'We are looking for an experienced Agronomist to support our outgrower farming communities with technical guidance, soil management advice, and crop yield optimisation.',
    'Degree in Agriculture or Agronomy. At least 2 years of field experience. Strong communication skills and willingness to travel to farming communities.',
    'Submit applications to hr@victoriasugar.com',
    '2026-07-25'
  )
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────────────
-- SAMPLE EVENTS
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.events (title, description, event_date, location, image_url) VALUES
  (
    'Annual Outgrower Farmers'' Day',
    'Victoria Sugar hosts its annual Farmers'' Day — a celebration of the partnership between the company and our outgrower farming communities. The event features training sessions, input distribution, and recognition of top-performing farmers.',
    '2026-09-05',
    'Victoria Sugar Estate, Kakira',
    'https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg'
  ),
  (
    'Uganda Agro-Industry Trade Fair 2026',
    'Victoria Sugar will be exhibiting at the Uganda Agro-Industry Trade Fair in Kampala. Visit our stand to learn about our products, export opportunities, and the outgrower programme.',
    '2026-10-12',
    'Kololo Independence Grounds, Kampala',
    'https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg'
  )
ON CONFLICT DO NOTHING;
