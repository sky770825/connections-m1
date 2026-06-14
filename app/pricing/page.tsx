import { Sparkles, Check, Crown, ArrowRight, Star } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata = {
  title: '定價方案 — Connections',
  description: '從免費開始，升級解鎖無限 AI 配對、進階搜尋、活動發布等專業功能。',
};

const COMPARISON = [
  { feature: 'AI 配對次數', free: '5 次/月', pro: '50 次/月', ent: '無限' },
  { feature: '基本搜尋', free: '✓', pro: '✓', ent: '✓' },
  { feature: '進階搜尋（Hybrid）', free: '✗', pro: '✓', ent: '✓' },
  { feature: '誰瀏覽過我', free: '✗', pro: '✓', ent: '✓' },
  { feature: '個人檔案', free: '基本', pro: '完整', ent: '完整' },
  { feature: '標籤數', free: '3 個', pro: '無限', ent: '無限' },
  { feature: '配對優先顯示', free: '✗', pro: '✓', ent: '✓' },
  { feature: 'Email 通知', free: '✗', pro: '✓', ent: '✓' },
  { feature: '私訊', free: '連線後', pro: '連線後', ent: '連線後' },
  { feature: '活動發布', free: '✗', pro: '✗', ent: '✓' },
  { feature: 'API access', free: '✗', pro: '✗', ent: '✓' },
  { feature: '數據儀表板', free: '✗', pro: '基本', ent: '進階' },
  { feature: '團隊檔案', free: '✗', pro: '✗', ent: '5 人' },
  { feature: '客服支援', free: '社群', pro: 'Email', ent: '專屬' },
  { feature: 'SLA', free: '—', pro: '—', ent: '99.9%' },
];

const TESTIMONIALS = [
  {
    name: '林筱婷',
    role: '跨境電商創業者',
    avatar: 'from-pink-500 to-rose-700',
    quote: '用了 Connections 3 個月，已經透過平台找到 5 個東南亞 KOL 代理商，2 個有效商機。值回票價。',
  },
  {
    name: '陳志豪',
    role: '創投合�人',
    avatar: 'from-primary-500 to-primary-700',
    quote: '我是 Pro 用戶，AI 配對品質比 LinkedIn 推薦精準 5 倍以上。每週都有高契合的案源。',
  },
  {
    name: 'Sarah Chen',
    role: 'Web3 顧問',
    avatar: 'from-accent-500 to-accent-700',
    quote: '台灣+東南亞+日本跨境商務，沒有一個平台像 Connections 一樣專注。我推薦給所有客戶。',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white/80 border border-primary-200 shadow-sm mb-3">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-ink-700">簡單透明的定價</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-900">
            選擇最適合你的<span className="gradient-text">方案</span>
          </h1>
          <p className="mt-3 text-lg text-ink-500 max-w-2xl mx-auto">
            從免費開始，按月付費，隨時取消。<br />
            升級解鎖無限 AI 配對、進階搜尋、誰瀏覽過我等強大功能。
          </p>
          <p className="mt-4 text-sm text-ink-500">
            💡 試算：<strong className="text-primary-700">29 個 Pro 用戶</strong> = NT$8,670/月，即可打平基礎成本
          </p>
        </div>

        {/* 3 方案 */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Free */}
          <Card className="hover:shadow-xl transition">
            <CardContent className="pt-6">
              <h3 className="font-display text-2xl font-bold text-ink-900">Free</h3>
              <p className="text-sm text-ink-500 mt-1">開始你的人脈探索</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-ink-900">$0</span>
                <span className="text-ink-500">/月</span>
              </div>
              <Link href="/signup" className="block mt-6">
                <Button variant="secondary" className="w-full" size="lg">
                  免費開始
                </Button>
              </Link>
              <ul className="mt-6 space-y-3 text-sm text-ink-700">
                {['每月 5 次 AI 配對', '基本搜尋', '3 個標籤', '發送連線請求'].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="ring-2 ring-primary-500 shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="accent" className="px-3 py-1">
                <Crown className="w-3 h-3 mr-1" />
                最受歡迎
              </Badge>
            </div>
            <CardContent className="pt-6">
              <h3 className="font-display text-2xl font-bold text-ink-900">Pro</h3>
              <p className="text-sm text-ink-500 mt-1">認真經營人脈的專業人士</p>
              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-ink-900">NT$299</span>
                  <span className="text-ink-500">/月</span>
                </div>
                <p className="text-xs text-ink-400 mt-1">約 USD $9.99</p>
              </div>
              <Link href="/upgrade" className="block mt-6">
                <Button className="w-full" size="lg">
                  升級到 Pro
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <ul className="mt-6 space-y-3 text-sm text-ink-700">
                {['每月 50 次 AI 配對', '進階搜尋（Hybrid）', '誰瀏覽過我', '無限標籤', '配對結果優先顯示', 'Email 通知'].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 企業 */}
          <Card className="hover:shadow-xl transition">
            <CardContent className="pt-6">
              <h3 className="font-display text-2xl font-bold text-ink-900">企業</h3>
              <p className="text-sm text-ink-500 mt-1">團隊 + 活動主辦方</p>
              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-ink-900">NT$899</span>
                  <span className="text-ink-500">/月</span>
                </div>
                <p className="text-xs text-ink-400 mt-1">約 USD $29.99</p>
              </div>
              <Link href="/upgrade" className="block mt-6">
                <Button variant="secondary" className="w-full" size="lg">
                  升級到企業
                </Button>
              </Link>
              <ul className="mt-6 space-y-3 text-sm text-ink-700">
                {['無限 AI 配對', '5 人團隊檔案', '活動發布權限', 'API access', '數據分析儀表板', '專屬客服', 'SLA 99.9%'].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 比較表 */}
        <Card className="mb-16">
          <CardContent className="pt-6">
            <h2 className="font-display text-2xl font-bold text-ink-900 mb-6 text-center">
              詳細功能對比
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-ink-200">
                    <th className="text-left py-3 px-4 font-semibold text-ink-700 text-sm">功能</th>
                    <th className="text-center py-3 px-4 font-semibold text-ink-700 text-sm">Free</th>
                    <th className="text-center py-3 px-4 font-semibold text-primary-700 text-sm bg-primary-50/50">Pro</th>
                    <th className="text-center py-3 px-4 font-semibold text-ink-700 text-sm">企業</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.feature} className="border-b border-ink-100 hover:bg-ink-50/50">
                      <td className="py-3 px-4 text-sm text-ink-700">{row.feature}</td>
                      <td className="py-3 px-4 text-center text-sm text-ink-500">{row.free}</td>
                      <td className="py-3 px-4 text-center text-sm text-primary-700 font-medium bg-primary-50/50">
                        {row.pro}
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-ink-700">{row.ent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 用戶見證 */}
        <div className="mb-12">
          <h2 className="font-display text-3xl font-bold text-ink-900 text-center mb-8">
            用戶怎麼說
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-ink-700 italic leading-relaxed">「{t.quote}」</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatar}`} />
                    <div>
                      <p className="font-semibold text-ink-900 text-sm">{t.name}</p>
                      <p className="text-xs text-ink-500">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">常見問題</h2>
            {[
              { q: '可以隨時取消嗎？', a: '可以。在「設定 → 訂閱」一鍵取消，取消後仍可使用到當期結束。' },
              { q: '首次訂閱有退款嗎？', a: '有。首次訂閱 7 天內 100% 全額退款，之後不退款（Stripe 政策）。' },
              { q: '可以升級或降級方案嗎？', a: '可以。升級立即生效，降級下個計費週期生效，差額按比例退還。' },
              { q: '企業方案可以開發票嗎？', a: '可以。我們提供三聯式發票，請 Email 至 billing@connections.app。' },
              { q: '有教育或非營利組織優惠嗎？', a: '有。請 Email 至 team@connections.app 並附上機構證明，享 50% 折扣。' },
            ].map((f) => (
              <details key={f.q} className="group border-b border-ink-100 pb-4 last:border-0">
                <summary className="cursor-pointer font-medium text-ink-900 hover:text-primary-700 flex items-center justify-between">
                  {f.q}
                  <span className="text-ink-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-sm text-ink-600 pl-4">{f.a}</p>
              </details>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="font-display text-3xl font-bold text-ink-900">
            準備好找到對的人了嗎？
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg">免費開始</Button>
            </Link>
            <Link href="/upgrade">
              <Button size="lg" variant="primary">
                升級到 Pro
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
