# Connections — 台灣/亞洲跨境商務人脈 AI 配對平台

> **M1 狀態**：Sprint 0 開發中（環境 + 設計系統 + Landing + 註冊 UI 完成）
> **預計上線**：8 週後
> **完整 SPEC**：[`../docs/人脈系統-M1/SPEC.md`](../docs/人脈系統-M1/SPEC.md)

## 為什麼做這個？

LinkedIn 太多 spam 邀請、Lunchclub 不在地化、Alignable 不服務亞洲、脈脈的繁中用戶被忽略。  
**Connections 切「台灣/亞洲跨境商務」這個真空帶** — 給跨境創業者、創投、電商負責人、自由工作者一個精準 AI 人脈配對平台。

## 技術棧

| 層 | 選擇 | 理由 |
|------|------|------|
| 前端 | Next.js 16 (App Router) | RSC + 老蔡熟悉 + Vercel 原生 |
| 後端 + DB | Supabase Pro | 一站式 Auth + DB + Storage + Realtime + RLS |
| AI 配對 | OpenAI text-embedding-3-small (512 dim) | $0.02/M tok，配對成本幾乎為零 |
| 金流 | Stripe | 訂閱 API 完整 + Webhook 穩定 |
| 圖譜視覺化（M2） | React Flow v12 | React 原生 + SSR 友善 |
| 樣式 | Tailwind v4 + shadcn/ui 風格 | 老蔡喜歡豐富視覺，客製 design tokens |

## 商業模式

- **Free**：每月 5 次 AI 配對、3 個標籤
- **Pro NT$299/月**：50 次配對、誰瀏覽過我、無限標籤
- **企業 NT$899/月**：無限配對、5 人團隊、活動發布
- **活動票務抽成**：10%

**損益兩平**：29 個 Pro 付費用戶（NT$8,670/月）

## 開發狀態

| Sprint | 週次 | 狀態 |
|--------|------|------|
| **S0** | W0 | 🚧 進行中：環境 + 設計系統 + Landing + 註冊 UI |
| S1 | W1-W2 | 📋 會員系統 + 個人檔案 |
| S2 | W3-W4 | 📋 AI 配對 + 搜尋 |
| S3 | W5-W6 | 📋 互動 + 私訊 |
| S4 | W7-W8 | 📋 活動 + 訂閱 + 上線 |

## 開始

### 環境需求
- Node.js 20+ (已驗證 25.8.2)
- npm 11+ 或 pnpm
- Supabase 帳號（[申請](https://supabase.com)）
- OpenAI API key（[申請](https://platform.openai.com/api-keys)）
- Stripe 帳號（[申請](https://dashboard.stripe.com/register)）

### 安裝

```bash
cd apps/web
cp .env.example .env.local
# 編輯 .env.local 填入你的 key
npm install
npm run dev
```

開啟 http://localhost:3000

### 環境變數說明

| 變數 | 用途 | 必填 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 專案 URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role（後端使用） | ✅ |
| `OPENAI_API_KEY` | AI 配對 embedding | ✅ |
| `STRIPE_SECRET_KEY` | 訂閱金流 | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook 驗證 | ✅ |
| `RESEND_API_KEY` | Email 通知 | M1 之後 |
| `NEXT_PUBLIC_APP_URL` | 應用網址（OAuth callback 用） | ✅ |

### 初始化 Supabase

1. 建立 Supabase 專案
2. 開 SQL Editor
3. 執行 `supabase/migrations/0001_initial_schema.sql`
4. 在 Authentication → Providers 啟用 Google OAuth
5. 把 URL 和 Key 填到 `.env.local`

### 部署到 Vercel

```bash
# 安裝 Vercel CLI（如未裝）
npm i -g vercel

# 登入
vercel login

# 連結專案
cd ../..  # 回 repo root
vercel link

# 設定環境變數
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... (其他 key)

# 部署
vercel --prod
```

## 專案結構

```
人脈系統-M1/
├── SPEC.md                       # 完整規格書
├── apps/
│   └── web/                      # Next.js 16 主應用
│       ├── app/
│       │   ├── page.tsx          # Landing
│       │   ├── login/            # 登入
│       │   ├── signup/           # 註冊
│       │   ├── profile/          # 個人檔案
│       │   ├── dashboard/        # 儀表板
│       │   └── auth/callback/    # OAuth callback
│       ├── components/
│       │   └── ui/               # Button, Input, Card, Badge
│       ├── lib/
│       │   ├── supabase/         # client, server, middleware
│       │   ├── auth/             # auth server actions
│       │   ├── profile/          # profile server actions
│       │   └── utils.ts          # cn, formatDate, scoreToTier
│       ├── middleware.ts         # Supabase session refresh
│       └── package.json
├── packages/                     # 共享程式碼（reserved for M2）
├── supabase/
│   └── migrations/
│       └── 0001_initial_schema.sql  # 完整 DB schema
├── infra/                        # 部署配置（reserved）
└── scripts/                      # 工具腳本（reserved）
```

## License

Proprietary — 老蔡自有產品，未授權前請勿 fork / 商用

## 聯絡

達爾 CEO <達爾@neuxa>  
老蔡 <老蔡@sky770825>
