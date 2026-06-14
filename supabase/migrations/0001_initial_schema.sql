-- ============================================
-- Connections M1 — 初始 Schema
-- 建立日期：2026-06-14
-- 在 Supabase SQL Editor 執行
-- ============================================

-- 啟用擴展
CREATE EXTENSION IF NOT EXISTS vector;        -- pgvector
CREATE EXTENSION IF NOT EXISTS pg_trgm;       -- trigram fuzzy search
-- CREATE EXTENSION IF NOT EXISTS zhparser;   -- 中文分詞 (如需)

-- ============================================
-- 1. profiles — 用戶主表
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name        text NOT NULL,
  headline            text,
  bio                 text,
  avatar_url          text,
  industry            text,
  location            text,
  skills              text[] DEFAULT '{}',
  tags                text[] DEFAULT '{}',
  intent              text,
  embedding           vector(512),
  search_vector       tsvector,
  tier                text NOT NULL DEFAULT 'free'
                          CHECK (tier IN ('free', 'pro', 'enterprise')),
  stripe_customer_id  text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- 觸發器：自動更新 updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 觸發器：自動生成 search_vector
CREATE OR REPLACE FUNCTION public.update_profile_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
      setweight(to_tsvector('simple', coalesce(NEW.display_name, '')), 'A')
   || setweight(to_tsvector('simple', coalesce(NEW.headline, '')), 'B')
   || setweight(to_tsvector('simple', coalesce(NEW.bio, '')), 'C')
   || setweight(to_tsvector('simple', array_to_string(NEW.skills, ' ')), 'B')
   || setweight(to_tsvector('simple', array_to_string(NEW.tags, ' ')), 'B')
   || setweight(to_tsvector('simple', coalesce(NEW.industry, '')), 'C')
   || setweight(to_tsvector('simple', coalesce(NEW.intent, '')), 'A');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_profiles_search_vector ON public.profiles;
CREATE TRIGGER trg_profiles_search_vector
  BEFORE INSERT OR UPDATE OF display_name, headline, bio, skills, tags, industry, intent
  ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_profile_search_vector();

-- 新用戶自動建立 profile（從 auth.users metadata 抓 display_name）
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 索引
CREATE INDEX IF NOT EXISTS profiles_embedding_idx
  ON public.profiles USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS profiles_search_idx
  ON public.profiles USING gin (search_vector);
CREATE INDEX IF NOT EXISTS profiles_tier_idx ON public.profiles(tier);
CREATE INDEX IF NOT EXISTS profiles_tags_idx ON public.profiles USING gin (tags);
CREATE INDEX IF NOT EXISTS profiles_skills_idx ON public.profiles USING gin (skills);

-- ============================================
-- 2. connections — 人脈連線關係
-- ============================================
CREATE TABLE IF NOT EXISTS public.connections (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  addressee_id  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status        text NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  message       text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  responded_at  timestamptz,
  -- 防止同一對用戶重複
  UNIQUE(requester_id, addressee_id),
  -- 防止自我連線
  CHECK (requester_id <> addressee_id)
);

CREATE INDEX IF NOT EXISTS connections_requester_idx ON public.connections(requester_id);
CREATE INDEX IF NOT EXISTS connections_addressee_idx ON public.connections(addressee_id);
CREATE INDEX IF NOT EXISTS connections_status_idx ON public.connections(status);

-- ============================================
-- 3. messages — 私訊
-- ============================================
CREATE TABLE IF NOT EXISTS public.messages (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id    uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content      text NOT NULL CHECK (length(content) > 0 AND length(content) <= 2000),
  read_at      timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS messages_conversation_idx
  ON public.messages(sender_id, receiver_id, created_at DESC);
CREATE INDEX IF NOT EXISTS messages_unread_idx
  ON public.messages(receiver_id) WHERE read_at IS NULL;

-- ============================================
-- 4. match_logs — 配對記錄
-- ============================================
CREATE TABLE IF NOT EXISTS public.match_logs (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  matched_user_id   uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  intent            text,
  score             float,
  action            text CHECK (action IN ('viewed', 'connected', 'skipped', 'dismissed')),
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS match_logs_user_idx ON public.match_logs(user_id, created_at DESC);

-- ============================================
-- 5. events — 活動
-- ============================================
CREATE TABLE IF NOT EXISTS public.events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id       uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title         text NOT NULL,
  description   text,
  location      text,
  start_time    timestamptz NOT NULL,
  end_time      timestamptz,
  capacity      int,
  price_cents   int NOT NULL DEFAULT 0,
  cover_url     text,
  is_published  boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS events_start_time_idx ON public.events(start_time);
CREATE INDEX IF NOT EXISTS events_host_idx ON public.events(host_id);

-- 活動報名
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id        uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status          text NOT NULL DEFAULT 'registered'
                    CHECK (status IN ('registered', 'cancelled', 'attended')),
  paid_cents      int NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- ============================================
-- 6. subscriptions — 訂閱
-- ============================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_subscription_id   text UNIQUE,
  tier                     text NOT NULL CHECK (tier IN ('pro', 'enterprise')),
  status                   text NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start     timestamptz,
  current_period_end       timestamptz,
  cancel_at_period_end     boolean NOT NULL DEFAULT false,
  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS subscriptions_user_idx ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON public.subscriptions(status);

-- ============================================
-- RLS — Row Level Security
-- ============================================

-- profiles: 所有人可看，僅本人可改
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
CREATE POLICY "profiles_select_all" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- connections: 雙方都可看/操作
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "connections_select_involved" ON public.connections;
CREATE POLICY "connections_select_involved" ON public.connections
  FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

DROP POLICY IF EXISTS "connections_insert_own" ON public.connections;
CREATE POLICY "connections_insert_own" ON public.connections
  FOR INSERT WITH CHECK (auth.uid() = requester_id);

DROP POLICY IF EXISTS "connections_update_addressee" ON public.connections;
CREATE POLICY "connections_update_addressee" ON public.connections
  FOR UPDATE USING (auth.uid() = addressee_id OR auth.uid() = requester_id);

-- messages: 雙方可看/發送
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "messages_select_involved" ON public.messages;
CREATE POLICY "messages_select_involved" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "messages_insert_own" ON public.messages;
CREATE POLICY "messages_insert_own" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "messages_update_receiver" ON public.messages;
CREATE POLICY "messages_update_receiver" ON public.messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- match_logs: 僅本人可看自己的
ALTER TABLE public.match_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "match_logs_select_own" ON public.match_logs;
CREATE POLICY "match_logs_select_own" ON public.match_logs
  FOR SELECT USING (auth.uid() = user_id);

-- events: 已發布的公開看，自己主辦的可改
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "events_select_published_or_own" ON public.events;
CREATE POLICY "events_select_published_or_own" ON public.events
  FOR SELECT USING (is_published = true OR auth.uid() = host_id);

DROP POLICY IF EXISTS "events_insert_own" ON public.events;
CREATE POLICY "events_insert_own" ON public.events
  FOR INSERT WITH CHECK (auth.uid() = host_id);

DROP POLICY IF EXISTS "events_update_own" ON public.events;
CREATE POLICY "events_update_own" ON public.events
  FOR UPDATE USING (auth.uid() = host_id);

-- subscriptions: 僅本人可看
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subscriptions_select_own" ON public.subscriptions;
CREATE POLICY "subscriptions_select_own" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 7. match_profiles — AI 配對 SQL function
-- ============================================
CREATE OR REPLACE FUNCTION public.match_profiles(
  query_embedding vector(512),
  match_threshold float DEFAULT 0.55,
  match_count int DEFAULT 100,
  exclude_id uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  display_name text,
  headline text,
  bio text,
  skills text[],
  industry text,
  location text,
  tags text[],
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.display_name,
    p.headline,
    p.bio,
    p.skills,
    p.industry,
    p.location,
    p.tags,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM public.profiles p
  WHERE p.id != exclude_id
    AND p.embedding IS NOT NULL
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================
-- 完成
-- ============================================
COMMENT ON TABLE public.profiles IS 'M1 用戶主表';
COMMENT ON TABLE public.connections IS 'M1 人脈連線';
COMMENT ON TABLE public.messages IS 'M1 私訊';
COMMENT ON TABLE public.match_logs IS 'M1 AI 配對記錄';
COMMENT ON TABLE public.events IS 'M1 活動';
COMMENT ON TABLE public.subscriptions IS 'M1 Stripe 訂閱';
