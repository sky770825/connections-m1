// Dev-only mock data — 給 Sprint 0 / 1 純前端測試用
// 等 Supabase key 進來後改用真實 DB

export interface MockProfile {
  id: string;
  displayName: string;
  headline: string;
  bio: string;
  industry: string;
  location: string;
  skills: string[];
  tags: string[];
  intent: string;
  avatarColor: string; // tailwind gradient
  tier: 'free' | 'pro' | 'enterprise';
}

export const MOCK_PROFILES: MockProfile[] = [
  {
    id: 'mock-1',
    displayName: '林筱婷',
    headline: '跨境電商創業者，東南亞市場專家',
    bio: '8 年東南亞市場經驗，曾在新加坡、雅加達、馬尼拉設立團隊。專注美妝保養品跨境電商，目前月營收 USD 500K。',
    industry: '跨境電商',
    location: '台北, 台灣',
    skills: ['東南亞市場', '品牌行銷', '跨境物流', 'KOL 媒合'],
    tags: ['東南亞', '電商', '美妝', 'B2C', '新興市場'],
    intent: '想找熟悉東南亞 KOL 網紅行銷的代理商，以及 A 輪投資人',
    avatarColor: 'from-pink-500 to-rose-700',
    tier: 'pro',
  },
  {
    id: 'mock-2',
    displayName: '陳志豪',
    headline: '創投合�人 | 早期階段 Tech & Fintech',
    bio: '專注台灣/東南亞早期階段（pre-seed to Series A）科技與金融科技投資。過去 5 年投資 30+ 新創，3 個獨角獸。',
    industry: '創投',
    location: '台北, 台灣',
    skills: ['創投', '募資', '估值', 'M&A', '策略諮詢'],
    tags: ['創投', 'VC', 'Fintech', '早期投資', '天使'],
    intent: '想找台灣/東南亞的早期 Fintech 創業者，pre-seed 到 A 輪',
    avatarColor: 'from-primary-500 to-primary-700',
    tier: 'enterprise',
  },
  {
    id: 'mock-3',
    displayName: 'Sarah Chen',
    headline: 'Web3 Startup Advisor | Ex-Binance',
    bio: '前 Binance Business Development 主管，現為獨立顧問。專注 DeFi、GameFi、Web3 基礎設施。',
    industry: 'Web3 / Crypto',
    location: 'Singapore',
    skills: ['Web3', 'DeFi', 'BD', 'Tokenomics', 'Smart Contracts'],
    tags: ['Web3', 'DeFi', 'Crypto', 'Singapore', 'B2B'],
    intent: '想找台灣的 Web3 創業團隊，需要 BD 與市場進入策略',
    avatarColor: 'from-accent-500 to-accent-700',
    tier: 'pro',
  },
  {
    id: 'mock-4',
    displayName: '王建明',
    headline: '自由工作者｜B2B 內容行銷顧問',
    bio: '10 年科技業行銷經驗，現在是獨立 B2B 內容策略顧問。客戶包含 SaaS、Fintech、MarTech 新創。',
    industry: '行銷顧問',
    location: '台中, 台灣',
    skills: ['內容行銷', 'SEO', '品牌策略', '文案', 'MarTech'],
    tags: ['B2B', 'SaaS', '內容行銷', 'SEO', '自由工作者'],
    intent: '想找需要 B2B 內容行銷的 SaaS/Fintech 新創客戶（案源）',
    avatarColor: 'from-cyan-500 to-cyan-700',
    tier: 'free',
  },
  {
    id: 'mock-5',
    displayName: 'Yuki Tanaka',
    headline: '日本市場進入顧問 | 跨境電商',
    bio: '協助台灣/東南亞品牌進入日本市場。提供市場研究、當地化、電商平台（樂天、Amazon Japan）上架。',
    industry: '跨境顧問',
    location: '東京, 日本',
    skills: ['日本市場', '跨境電商', '在地化', 'Amazon Japan', '樂天'],
    tags: ['日本市場', '跨境', '電商', '在地化', 'B2B'],
    intent: '想找想進入日本市場的台灣/東南亞品牌',
    avatarColor: 'from-purple-500 to-pink-600',
    tier: 'pro',
  },
  {
    id: 'mock-6',
    displayName: '張雅雯',
    headline: '天使投資人 | 女性創業支持者',
    bio: '連續創業家 + 天使投資人。專注女性創業、D2C 品牌、生活風格領域。已投資 20+ 早期團隊。',
    industry: '天使投資',
    location: '台北, 台灣',
    skills: ['天使投資', '女性創業', 'D2C', '品牌', '創業導師'],
    tags: ['天使', '女性創業', 'D2C', '早期投資', '導師'],
    intent: '想找女性創辦的 D2C 新創，需要資金與導師資源',
    avatarColor: 'from-rose-500 to-orange-600',
    tier: 'pro',
  },
];

// 給 dev server 用的「現在登入的 mock user」
export const MOCK_CURRENT_USER: MockProfile = {
  id: 'mock-current',
  displayName: '你',
  headline: '測試帳號',
  bio: '這是 dev server 假資料，連上 Supabase 後會換成真實 user',
  industry: '測試',
  location: '台北, 台灣',
  skills: ['測試', '開發'],
  tags: ['dev', 'test'],
  intent: '想找人脈配對的測試帳號',
  avatarColor: 'from-primary-500 to-primary-700',
  tier: 'free',
};
