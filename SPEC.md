# 人脈系統 M1 — 完整規格書

> **版本**：v1.0 草案  
> **日期**：2026-06-14  
> **作者**：達爾 CEO（Hermes Agent）  
> **目標**：老蔡自有人脈系統產品 M1（8 週 MVP → 公開上線）  
> **M1 範圍**：500-5000 註冊會員，3 層訂閱，AI 1:1 配對，活動票務

---

## 0. 一頁摘要 (TL;DR)

| 維度 | 結論 |
|------|------|
| **產品一句話** | 「台灣跨境商務人脈的 AI 配對社群」 — 補 LinkedIn/Alignable/脈脈都沒切的亞洲跨境真空帶 |
| **目標用戶** | 35-50 歲台灣/東南亞創業者、跨境電商負責人、自由工作者、創投/WFH 高階主管 |
| **核心 UX** | 填寫「想找什麼人」→ AI 配對 1:1 連線 → 付費會員可看誰瀏覽過自己 |
| **商業模式** | 三層訂閱（Free / Pro NT$299 / 企業 NT$899）+ 活動票務 10% 抽成 |
| **損益兩平** | **29 個 Pro 付費用戶**（NT$8,671/月）即可打平基礎月成本 |
| **技術路徑** | Next.js 16 + Supabase Pro + OpenAI Embeddings + Stripe |
| **M1 時程** | 8 週開發 → W9 上線，目標 W12 達 100 付費用戶 |
| **商業路徑** | 學 Lunchclub AI 配對 + 避開 LinkedIn spam + 切台灣跨境垂直 |

---

## 1. 產品定位

### 1.1 市場真空帶

| 對手 | 他們不做的事（我們的機會） |
|------|---------------------------|
| LinkedIn | 13 億用戶但 spam 邀請氾濫、配對不精準、對非白領不友善 |
| Alignable | 限北美、不懂亞洲跨境、不做 AI 配對 |
| 脈脈 | 中國職場為主、匿名爆料惹官司、繁中用戶被忽略 |
| Lunchclub | AI 配對好但全英文、無亞洲在地化、無活動模組 |
| Shapr | **已死**（2023 轉型 B2B 招募）證明 Tinder-like 模式失敗 |

**老蔡的真空帶 = 台灣/東南亞跨境商務人士，需要「精準 AI 配對 + 在地活動 + 中文母語 UX」**

### 1.2 三大差異化機會（從競品研究提取）

1. **台灣/亞洲跨境商務人脈平台**（LinkedIn、Alignable、脈脈都沒服務的真空帶）
2. **AI 配對 + 社群沈澱**（Lunchclub 的配對 + Alignable 的社群，沒人同時做）
3. **訂閱 + 成功抽成 + 活動三合一變現**（沒人走這條 hybrid 路線）

### 1.3 目標用戶 Persona（3 個核心）

| Persona | 描述 | 痛點 | 我們怎麼解 |
|---------|------|------|----------|
| **跨境新創 CEO** | 35-45 歲，台灣/新加坡/雅加達，募資/找客戶/找夥伴 | LinkedIn 太多 spam；東南亞當地人脈找不到 | AI 配對「能幫我募資的創投合夥人」+ 同地區過濾 |
| **跨境電商負責人** | 28-40 歲，找供應商/KOL/物流夥伴 | Facebook 社團太多雜訊 | 標籤搜尋 + 產業/地區過濾 + 活動（如招商說明會） |
| **自由工作者/顧問** | 25-50 歲，找案源/找同業交流 | Upwork 紅海、價格戰 | Pro 訂閱可看「誰瀏覽過我」+ 私訊不公開 |

---

## 2. 商業模式

### 2.1 三層訂閱（核心收入）

| 層級 | 月費（USD） | 月費（NTD） | 核心功能 | 目標轉換率 |
|------|-----------|------------|----------|------------|
| **Free** | $0 | $0 | 每月 5 次 AI 配對、基本搜尋、3 個標籤 | 80% |
| **Pro** ⭐ | **$9.99** | **NT$299** | 50 次 AI 配對、誰瀏覽過我、無限標籤、優先顯示 | 15% |
| **企業** | **$29.99** | **NT$899** | 無限配對、5 人團隊、活動發布、API、儀表板 | 5% |

### 2.2 活動票務抽成（次要收入）

- 主辦人發布活動（研討會、媒合會、分享會）→ 設定票價
- 平台抽 **10%**（Stripe 處理費另計）
- M1 目標：月 4 場付費活動 × 平均 20 票 × NT$500 = NT$40,000 GMV → 平台 NT$4,000/月

### 2.3 損益兩平分析

| 規模 | MAU | 付費率 15% | 月收入 (NTD) | 月成本 (NTD) | 月損益 |
|------|-----|-----------|------------|--------------|--------|
| **起步** | 100 | 15 人 | $135 (NT$4,050) | $71 (NT$2,130) | +$64 |
| **損益兩平** | **200** | **29 人** | **$290 (NT$8,670)** | **$202 (NT$6,060)** | **≈0** |
| **成長** | 1,000 | 150 人 | $1,499 (NT$44,970) | $202 (NT$6,060) | +$1,297 |
| **規模** | 10,000 | 1,500 人 | $14,990 (NT$449,700) | $1,309 (NT$39,270) | +$13,681 |

---

## 3. 技術棧最終版

### 3.1 系統架構圖

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐  │
│  │  Desktop Web │    │  Mobile Web  │    │  Telegram Bot (可選 M2) │  │
│  │  (Next.js 16)│    │  (PWA)       │    │  (grammY)              │  │
│  └──────┬───────┘    └──────┬──────┘    └───────────┬─────────────┘  │
└─────────┼──────────────────┼───────────────────────┼────────────────┘
          │                  │                       │
          └──────────────────┼───────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   VERCEL EDGE   │
                    │  (CDN + SSR)    │
                    │  Plan B: surge.sh│
                    └────────┬────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                        API / BFF LAYER                               │
│  Next.js 16 App Router (API Routes + Server Actions)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐           │
│  │ Auth     │ │ User     │ │ Matching │ │ Payment       │           │
│  │ Handler  │ │ Profile  │ │ Engine   │ │ Webhook       │           │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └───────┬───────┘           │
└───────┼────────────┼────────────┼───────────────┼───────────────────┘
        │            │            │               │
┌───────▼────────────▼────────────▼───────────────▼───────────────────┐
│                        SERVICE LAYER                                 │
│  ┌───────────┐  ┌───────────┐  ┌──────────┐  ┌─────────────────┐  │
│  │ Supabase  │  │ OpenAI    │  │ Stripe   │  │ Resend          │  │
│  │ • Auth    │  │ • Embed   │  │ • Subscr │  │ • Email         │  │
│  │ • DB      │  │ • GPT-4o  │  │ • Webhook│  │ • Notification  │  │
│  │ • Storage │  │ • text-emb│  │          │  │                 │  │
│  │ • RLS     │  │   -3-sm   │  │          │  │                 │  │
│  │ • RT      │  │   (配對)  │  │          │  │                 │  │
│  └─────┬─────┘  └─────┬─────┘  └────┬─────┘  └────────┬────────┘  │
└────────┼──────────────┼────────────┼─────────────────┼───────────┘
         │              │             │                 │
┌────────▼──────────────▼─────────────▼─────────────────▼───────────┐
│                     MONITORING & OBSERVABILITY                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Sentry   │  │ Supabase │  │ Vercel   │  │ Stripe   │          │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘          │
└───────────────────────────────────────────────────────────────────┘
```

### 3.2 7 大技術決策（已驗證）

| 決策 | 選項 | 理由 |
|------|------|------|
| **前端** | Next.js 16 (App Router) | Vercel 原生 + RSC + 老蔡熟悉 |
| **後端+DB** | Supabase Pro $25/月 | 一站式 Auth+DB+Storage+Realtime+RLS |
| **認證** | Supabase Auth | 零邊際成本，RLS 直連 |
| **搜尋** | Postgres FTS + pgvector | 零成本 Hybrid Search |
| **人脈圖譜** | React Flow v12 | React 原生、60KB、SSR 友善 |
| **Embedding** | OpenAI text-embedding-3-small | $0.02/M tok，每次配對 $0.000001 |
| **金流** | Stripe 2.9%+$0.30 | 最成熟、訂閱 API 完整、Plan B: LemonSqueezy |

### 3.3 資料模型（核心表）

```sql
-- 用戶主表（含 RLS）
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  display_name text NOT NULL,
  headline text,                          -- 一句話自我介紹
  bio text,                                -- 200字自我描述
  avatar_url text,
  industry text,                           -- 產業
  location text,                           -- "台北, 台灣"
  skills text[],                           -- ["VC", "募資", "估值"]
  tags text[],                             -- ["創投", "天使投資", "Fintech"]
  intent text,                             -- "我想找能幫我募資的創投合夥人"
  embedding vector(512),                   -- pgvector embedding
  search_vector tsvector,                  -- Postgres FTS
  tier text DEFAULT 'free',                -- free/pro/enterprise
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 連線關係（人脈網）
CREATE TABLE connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES profiles(id),
  addressee_id uuid REFERENCES profiles(id),
  status text DEFAULT 'pending',           -- pending/accepted/rejected
  message text,
  created_at timestamptz DEFAULT now()
);

-- 私訊
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id),
  receiver_id uuid REFERENCES profiles(id),
  content text NOT NULL,
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 配對記錄
CREATE TABLE match_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  intent text,
  matched_user_id uuid REFERENCES profiles(id),
  score float,
  action text,                             -- viewed/connected/skipped
  created_at timestamptz DEFAULT now()
);

-- 活動
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid REFERENCES profiles(id),
  title text NOT NULL,
  description text,
  location text,
  start_time timestamptz,
  end_time timestamptz,
  capacity int,
  price_cents int DEFAULT 0,
  cover_url text,
  created_at timestamptz DEFAULT now()
);

-- 訂閱
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  stripe_subscription_id text UNIQUE,
  tier text,                                -- pro/enterprise
  status text,                              -- active/canceled/past_due
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 索引
CREATE INDEX profiles_embedding_idx ON profiles USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX profiles_search_idx ON profiles USING gin (search_vector);
CREATE INDEX connections_requester_idx ON connections(requester_id);
CREATE INDEX connections_addressee_idx ON connections(addressee_id);
```

### 3.4 AI 配對演算法

```
SCORE = 0.50 × cosine_similarity(intent_embedding, profile_embedding)
      + 0.30 × jaccard_tag_overlap(intended_tags, profile_tags)
      + 0.20 × location_bonus(intent_location, profile_location)
```

- **Embedding 維度**：512（節省儲存）
- **更新策略**：用戶更新檔案時自動 re-embed
- **配對成本**：每次 ~$0.000001（幾乎為零）
- **Top-K**：先取 100 候選 → 重新加權排序 → 取前 20

完整 SQL function `match_profiles` 見 `~/Documents/人脈系統-技術架構.md` 第 332-373 行。

---

## 4. 功能模組（16 User Story）

### Epic A：會員系統（Sprint 1）
- **A1**：使用者可用 Email 或 Google OAuth 註冊登入
- **A2**：使用者可編輯個人檔案（頭像/標題/自介/技能/產業/地區/標籤）
- **A3**：使用者可設定「意圖 prompt」表達想找什麼人
- **A4**：使用者可看到自己的「人脈圖譜」（誰認識誰）

### Epic B：人脈搜尋與配對（Sprint 2）
- **B1**：使用者可用關鍵字/標籤搜尋會員（Postgres FTS）
- **B2**：使用者可填寫意圖 → 系統回傳 Top 20 AI 配對結果
- **B3**：系統在用戶上線時推送「本週新配對」通知
- **B4**：付費會員可看「誰瀏覽過我」（Pro 限定功能）

### Epic C：互動與關係沈澱（Sprint 3）
- **C1**：使用者可向配對對象發送「連線請求」（附訊息）
- **C2**：使用者可對已連線會員發送私訊
- **C3**：使用者可請朋友「介紹」自己給第三人（Introduction Request）
- **C4**：使用者可為連線關係加註（共同專案/共同朋友/標籤）

### Epic D：活動系統（Sprint 4）
- **D1**：企業帳號可發布活動（標題/說明/時間/地點/容量/票價）
- **D2**：使用者可報名活動（Stripe 處理費用，平台抽 10%）
- **D3**：使用者可看到自己報名的活動 + 過去參與記錄
- **D4**：主辦人可看到報名名單 + 發送活動通知

---

## 5. Sprint 規劃（8 週）

| Sprint | 週次 | 主題 | 交付 | User Story |
|--------|------|------|------|------------|
| **S0** | W0 | 環境 + 設計系統 | Repo 建置、Tailwind、shadcn/ui、登入頁、About | — |
| **S1** | W1-W2 | 會員系統 | Email/Google 註冊、Profile CRUD、標籤/技能/意圖 | A1, A2, A3, A4 |
| **S2** | W3-W4 | 搜尋 + AI 配對 | FTS 搜尋、OpenAI Embedding、match_profiles SQL、配對 UI | B1, B2, B3, B4 |
| **S3** | W5-W6 | 互動 + 私訊 | 連線請求、私訊、介紹請求、Realtime | C1, C2, C3, C4 |
| **S4** | W7-W8 | 活動 + 訂閱 + 上線 | Stripe Subscription、活動票務、Seed Data、上線 | D1, D2, D3, D4, E1, E2 |

### 5.1 Sprint 0 細項（W0，立即啟動）

**目標**：1 週內把 repo + 部署 + 設計系統 + Landing Page + 註冊流程都串起來

| Day | 任務 | 交付物 |
|-----|------|--------|
| **D1 (今)** | Repo init + 套件安裝 + Supabase 建專案 + Vercel 連接 | GitHub repo + Vercel preview deploy |
| **D2** | Tailwind v4 + shadcn/ui + 設計 tokens（色票/字型/間距）+ Logo | 設計系統文檔 + 基礎元件庫 |
| **D3** | Landing Page（Hero + 3 大特色 + 註冊 CTA） | index.html / app/page.tsx |
| **D4** | Supabase Auth 整合（Email + Google OAuth）+ 登入/註冊頁 | /login, /signup, /auth/callback |
| **D5** | 個人檔案 CRUD 雛形（display_name, headline, avatar） | /profile, /profile/edit |
| **D6** | Seed Data：10 個假帳號 + 標籤 + 地區 + 意圖 | Supabase seed script |
| **D7** | Sprint 0 demo 截圖 + 4 層驗證 | 公開 demo URL |

---

## 6. 風險 Top 5

| # | 風險 | 機率 | 影響 | 緩解 | 預警指標 |
|---|------|------|------|------|----------|
| **R1** | **Vercel/Supabase 被牆** | 中 | 高 | surge.sh 純靜態 fallback + 自建 Postgres VPS | 部署失敗率 >5% |
| **R2** | **AI 配對品質差** | 高 | 高 | 規則式 fallback + 用戶反饋 + 持續調權重 | 配對→連線率 <5% |
| **R3** | **Stripe 台灣審核不通過** | 中 | 高 | 預先申請 + LemonSqueezy Plan B + PayPal | Stripe 帳號狀態 |
| **R4** | **冷啟動無用戶** | 高 | 中 | 種子 50 人內測 + 跨境社團合作 + 老蔡個人朋友圈 | 註冊轉換 <2% |
| **R5** | **個資隱私爭議** | 中 | 高 | 嚴格 RLS + 隱私聲明 + 用戶資料匯出/刪除 | 隱私投訴 >0 |

---

## 7. 成本精算（3 規模）

| 項目 | 100 MAU | 1,000 MAU | 10,000 MAU |
|------|---------|-----------|------------|
| Vercel Pro | $20 | $20 | $20 |
| Supabase Pro | $25 | $25 | $25 |
| 額外 DB / 頻寬 | $0 | $10 | $50 |
| OpenAI Embedding | <$1 | $1 | $5 |
| Resend (Email) | $0 (free tier) | $20 | $80 |
| Sentry | $0 (free tier) | $26 | $80 |
| Stripe fee (2.9%+$0.30) | $5 | $50 | $500 |
| Domain + Misc | $20 | $50 | $549 |
| **月總成本** | **$71** | **$202** | **$1,309** |
| 月收入（15% 付費轉換） | $150 | $1,499 | $14,990 |
| **月損益** | **+$79** | **+$1,297** | **+$13,681** |

---

## 8. 驗收標準（Definition of Done）

每個 Sprint 完成必須通過：

- [ ] L1：所有檔案存在（`ls` / 對照 git diff）
- [ ] L2：所有 API 端點回 200（`curl` smoke test）
- [ ] L3：所有 user story 通過 Playwright E2E
- [ ] L4：截圖 / 螢幕錄影證明功能運作
- [ ] L5：Sentry 無 error（24h 觀察期）
- [ ] L6：Lighthouse score > 80（Performance + Accessibility + SEO）

---

## 9. 立即行動（Next 24h）

1. **Hour 0-1**：老蔡看完這個 SPEC.md
2. **Hour 1-2**：達爾建 GitHub repo + Supabase project + Vercel project
3. **Hour 2-8**：Sprint 0 D1-D3（環境 + 設計系統 + Landing）
4. **Hour 8-24**：Sprint 0 D4-D7（註冊 + Profile + Seed + Demo）
5. **Day 7**：Sprint 0 Demo 截圖給老蔡看，決定是否進 Sprint 1

---

## 附錄

- **完整技術細節**：`~/Documents/人脈系統-技術架構.md` (31.6KB)
- **競品分析**：`~/Documents/人脈系統-競品調研.md` (26KB)
- **開源候選**：`~/Documents/人脈系統-開源調研.md` (19KB)
- **AI 配對完整 SQL**：見技術架構報告 §3.4
- **專案目錄結構**（12 目錄）：見 Sprint 0 派工 prompt
