import Link from 'next/link';
import { Sparkles, Target, Globe2, Users, ArrowRight, MapPin } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white/80 border border-primary-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-ink-700">關於 Connections</span>
          </div>
          <h1 className="hero-title text-ink-900">
            為 <span className="gradient-text">台灣/亞洲跨境商務</span> 打造的人脈 AI 配對
          </h1>
          <p className="hero-subtitle mt-4 max-w-2xl mx-auto">
            告別 LinkedIn 滿天飛的 spam 邀請、告別 Lunchclub 的英文門檻、告別在地化不足的國際平台。
            我們只做一件事：把台灣/東南亞/日本最值得認識的商務人脈，用 AI 精準配對給你。
          </p>
        </div>

        {/* 故事 */}
        <Card className="mb-12">
          <CardContent className="pt-6 prose prose-sm max-w-none">
            <h2 className="font-display text-2xl font-bold text-ink-900 mb-3">我們的起點</h2>
            <p className="text-ink-600 leading-relaxed">
              創辦人老蔡是跨境創業者，過去 5 年在東南亞、日本拓展業務時深刻體會到：
              <strong className="text-ink-900">「對的人」比「多的人」重要 100 倍</strong>。
            </p>
            <p className="text-ink-600 leading-relaxed mt-3">
              LinkedIn 上 1 萬個連線 = 0 個有效商機；Lunchclub 全英文介面讓中文母語創業者怯步；脈脈的繁中用戶被忽略；Alignable 不服務亞洲。
            </p>
            <p className="text-ink-600 leading-relaxed mt-3">
              我們看到一個市場真空帶：<strong className="text-primary-700">台灣/亞洲跨境商務的精準人脈 AI 配對平台</strong>。
            </p>
          </CardContent>
        </Card>

        {/* 3 大差異化 */}
        <h2 className="font-display text-3xl font-bold text-ink-900 text-center mb-8">
          我們的<span className="gradient-text">差異化</span>
        </h2>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Target className="w-6 h-6" />,
              title: 'AI 精準配對',
              desc: 'OpenAI Embedding + 標籤加權 + 地區加權，給你 Top 20 真實契合的人脈，不是 LinkedIn 那種罐頭推薦。',
              color: 'from-primary-500 to-primary-700',
            },
            {
              icon: <Globe2 className="w-6 h-6" />,
              title: '亞洲跨境垂直',
              desc: '專為台灣/東南亞/日本跨境商務人士設計。繁中母語 UX、亞洲時區、跨境稅務/物流常見痛點的在地化建議。',
              color: 'from-accent-500 to-accent-700',
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: '關係真實沈澱',
              desc: '不只是「加好友」。每段連線記錄共同專案、共同朋友、互動歷史。找客戶、找夥伴、找導師，一鍵搜尋。',
              color: 'from-cyan-500 to-cyan-700',
            },
          ].map((d) => (
            <Card key={d.title} className="hover:shadow-xl transition">
              <CardContent className="pt-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center text-white shadow-lg mb-4`}
                >
                  {d.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-ink-900">{d.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{d.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team / 創辦人 */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">創辦人</h2>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-hero-gradient flex items-center justify-center text-white font-display text-2xl font-bold flex-shrink-0">
                老蔡
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ink-900">老蔡</h3>
                <p className="text-ink-600 mt-1">跨境創業者 · 連續創業 · 5 年東南亞市場</p>
                <p className="text-sm text-ink-500 mt-2">
                  「我曾經 1 年加 200 個 LinkedIn 連線，0 個有效商機。
                  這就是我做 Connections 的原因：人脈質量比數量重要 100 倍。」
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 總部 */}
        <div className="text-center text-sm text-ink-500">
          <p className="flex items-center justify-center gap-1.5">
            <MapPin className="w-4 h-4" />
            總部位於台北市信義區
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
