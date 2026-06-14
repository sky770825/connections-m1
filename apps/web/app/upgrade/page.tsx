'use client';

import * as React from 'react';
import { Sparkles, Check, X, Crown, Users, Target, Eye, Globe, MessageCircle, BarChart3, Zap } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PLANS = [
  {
    id: 'free', name: 'Free', price: 0, priceLabel: '免費', description: '開始你的人脈探索',
    cta: '目前方案', current: true,
    features: [
      { i: true, t: '每月 5 次 AI 配對' }, { i: true, t: '基本搜尋（標籤 + 產業）' },
      { i: true, t: '個人檔案 + 3 個標籤' }, { i: true, t: '發送連線請求' },
      { i: false, t: '誰瀏覽過我（Pro 限定）' }, { i: false, t: '無限標籤' },
      { i: false, t: '無限 AI 配對' }, { i: false, t: '活動發布權限' },
    ],
  },
  {
    id: 'pro', name: 'Pro', price: 299, priceLabel: 'NT$299/月', description: '認真經營人脈的專業人士',
    cta: '升級到 Pro', popular: true,
    features: [
      { i: true, t: '每月 50 次 AI 配對' }, { i: true, t: '進階搜尋（Hybrid + 相似度）' },
      { i: true, t: '誰瀏覽過我', h: true }, { i: true, t: '無限標籤' },
      { i: true, t: '配對結果優先顯示', h: true }, { i: true, t: '私訊已連線會員' },
      { i: true, t: 'Email 通知' }, { i: false, t: '活動發布權限' },
    ],
  },
  {
    id: 'enterprise', name: '企業', price: 899, priceLabel: 'NT$899/月', description: '團隊 + 活動主辦方',
    cta: '升級到企業',
    features: [
      { i: true, t: '無限 AI 配對' }, { i: true, t: '5 人團隊檔案' },
      { i: true, t: '活動發布權限', h: true }, { i: true, t: 'API access' },
      { i: true, t: '數據分析儀表板' }, { i: true, t: '專屬客服' },
      { i: true, t: '客製品牌頁' }, { i: true, t: 'SLA 99.9% 保障' },
    ],
  },
];

const COMPARE = [
  { icon: <Target className="w-5 h-5" />, name: 'AI 配對', free: '5 次/月', pro: '50 次/月', ent: '無限' },
  { icon: <Users className="w-5 h-5" />, name: '標籤數', free: '3 個', pro: '無限', ent: '無限' },
  { icon: <Eye className="w-5 h-5" />, name: '誰瀏覽過我', free: '✗', pro: '✓', ent: '✓' },
  { icon: <MessageCircle className="w-5 h-5" />, name: '私訊', free: '連線後', pro: '連線後', ent: '連線後' },
  { icon: <Globe className="w-5 h-5" />, name: '活動發布', free: '✗', pro: '✗', ent: '✓' },
  { icon: <BarChart3 className="w-5 h-5" />, name: '數據儀表板', free: '✗', pro: '基本', ent: '進階' },
  { icon: <Zap className="w-5 h-5" />, name: 'API access', free: '✗', pro: '✗', ent: '✓' },
];

export default function UpgradePage() {
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleSelect = (planId: string) => {
    if (planId === 'free') return;
    setLoading(planId);
    setTimeout(() => {
      alert(`🚧 示範模式\n\n選擇了 ${planId} 方案\n\n實際部署需要 Stripe API key 才能串接金流。\n\n目前 demo：所有按鈕可正常 click，UI 完整，金流邏輯已就緒。`);
      setLoading(null);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar user={{ displayName: '你' }} currentPath="/upgrade" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white/80 border border-primary-200 shadow-sm mb-3">
            <Crown className="w-4 h-4 text-accent-500" />
            <span className="text-sm font-medium text-ink-700">升級方案</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-900">選擇適合你的<span className="gradient-text">方案</span></h1>
          <p className="mt-3 text-lg text-ink-500 max-w-2xl mx-auto">從免費開始，升級解鎖無限 AI 配對、進階搜尋、活動發布等專業功能</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan) => (
            <Card key={plan.id} className={plan.popular ? 'ring-2 ring-primary-500 shadow-2xl relative' : 'hover:shadow-xl transition'}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge variant="accent" className="px-3 py-1"><Sparkles className="w-3 h-3 mr-1" />最熱門</Badge></div>}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  {plan.current && <Badge variant="success">目前方案</Badge>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6"><span className="font-display text-4xl font-bold text-ink-900">{plan.priceLabel}</span></div>
                <Button className="w-full mb-6" variant={plan.popular ? 'primary' : 'secondary'} size="lg" disabled={plan.current || loading === plan.id} onClick={() => handleSelect(plan.id)}>
                  {loading === plan.id ? '處理中...' : plan.cta}
                </Button>
                <ul className="space-y-2.5">
                  {plan.features.map((f, i) => {
                    const h = (f as { h?: boolean }).h ?? false;
                    return (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        {f.i ? <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> : <X className="w-4 h-4 text-ink-300 flex-shrink-0 mt-0.5" />}
                        <span className={f.i ? (h ? 'text-primary-700 font-medium' : 'text-ink-700') : 'text-ink-400 line-through'}>{f.t}</span>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>方案比較</CardTitle><CardDescription>詳細功能對比</CardDescription></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-ink-200">
                  <th className="text-left py-3 px-4 font-semibold text-ink-700 text-sm">功能</th>
                  <th className="text-center py-3 px-4 font-semibold text-ink-700 text-sm">Free</th>
                  <th className="text-center py-3 px-4 font-semibold text-primary-700 text-sm">Pro</th>
                  <th className="text-center py-3 px-4 font-semibold text-ink-700 text-sm">企業</th>
                </tr></thead>
                <tbody>
                  {COMPARE.map((r) => (
                    <tr key={r.name} className="border-b border-ink-100">
                      <td className="py-3 px-4"><div className="flex items-center gap-2 text-ink-700 text-sm">{r.icon}{r.name}</div></td>
                      <td className="py-3 px-4 text-center text-sm text-ink-500">{r.free}</td>
                      <td className="py-3 px-4 text-center text-sm text-primary-700 font-medium bg-primary-50/50">{r.pro}</td>
                      <td className="py-3 px-4 text-center text-sm text-ink-700">{r.ent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader><CardTitle>常見問題</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { q: '可以隨時取消嗎？', a: '可以。在「設定 → 訂閱」一鍵取消，取消後仍可使用到當期結束。' },
              { q: '首次訂閱有退款嗎？', a: '有。首次訂閱 7 天內 100% 全額退款，之後不退款（Stripe 政策）。' },
              { q: '升級後可以馬上使用 Pro 功能嗎？', a: '可以。Stripe 付款成功後 webhook 會自動更新權限，通常 1-2 秒內生效。' },
              { q: '企業方案可以發票嗎？', a: '可以。我們提供三聯式發票，請 Email 至 billing@connections.app。' },
            ].map((f) => (
              <details key={f.q} className="group">
                <summary className="cursor-pointer font-medium text-ink-900 hover:text-primary-700">{f.q}</summary>
                <p className="mt-2 text-sm text-ink-600 pl-4">{f.a}</p>
              </details>
            ))}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
