import Link from 'next/link';
import { Sparkles, Target, Globe2, Users, Check, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Illustration } from '@/components/ui/illustration';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/30">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-20">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 -right-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white/80 border border-primary-200 shadow-sm mb-6">
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-ink-700">為台灣/亞洲跨境商務而生</span>
              </div>

              <h1 className="hero-title text-ink-900 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                告別 <span className="gradient-text">無效社交</span>
                <br />
                AI 為你配對<span className="gradient-text">最值得認識的人</span>
              </h1>

              <p className="hero-subtitle mt-6 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                Connections 是台灣第一個 AI 人脈配對平台，專為跨境商務、創業者、投資人設計。
                告訴我們你想找什麼人，30 秒拿到精準配對。
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <Link href="/signup" className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-button bg-cta-gradient text-white shadow-xl shadow-accent-500/40 hover:shadow-accent-500/60 hover:scale-105 transition-all">
                  免費開始配對
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#how-it-works" className="inline-flex items-center gap-2 px-6 py-4 text-base font-medium rounded-button bg-white border border-ink-200 text-ink-700 hover:border-primary-300 hover:text-primary-700 transition">
                  了解運作方式
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center lg:items-start justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-ink-500">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> 30 秒上手</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> 每月 5 次免費 AI 配對</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> 不公開個資</span>
              </div>
            </div>

            <div className="hidden lg:block h-96 rounded-card overflow-hidden shadow-2xl">
              <Illustration variant="hero-network" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 大特色（with illustration）── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-900">
              為什麼選 <span className="gradient-text">Connections</span>？
            </h2>
            <p className="mt-4 text-lg text-ink-600 max-w-2xl mx-auto">
              對齊 LinkedIn 沒做的、Lunchclub 沒在地化的、Alignable 不服務亞洲的市場真空帶
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              icon={<Target className="w-7 h-7" />}
              title="AI 精準配對"
              description="告訴我們你想找什麼人（募資合夥人？跨境 KOL？東南亞代理商？），AI 用向量搜尋 + 標籤加權 + 地區加權給你 Top 20 配對。"
              illustrationVariant="ai-matching"
              gradient="from-primary-500 to-primary-700"
            />
            <FeatureCard
              icon={<Globe2 className="w-7 h-7" />}
              title="亞洲跨境垂直"
              description="專為台灣/東南亞/日本跨境商務人士設計。LinkedIn 不懂的在地化、脈脈不做的繁中 UX、Alignable 不服務的亞洲，這裡都有。"
              illustrationVariant="cross-border"
              gradient="from-accent-500 to-accent-700"
            />
            <FeatureCard
              icon={<Users className="w-7 h-7" />}
              title="關係真實沈澱"
              description="不只是「加好友」。每段連線都記錄共同專案、共同朋友、互動歷史。下次合作、找客戶、找夥伴，全部一鍵搜尋。"
              illustrationVariant="relationships"
              gradient="from-cyan-500 to-cyan-700"
            />
          </div>
        </div>
      </section>

      {/* ── 運作方式 ── */}
      <section id="how-it-works" className="py-20 bg-ink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-900">3 步驟找到對的人</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: '填寫意圖', desc: '用一句話描述你想找什麼人，例如「想找能幫我 A 輪募資的創投合夥人」', illustration: 'fill-intent' as const },
              { step: '02', title: 'AI 配對', desc: 'OpenAI Embedding 將你的意圖和平台 5000+ 人脈比對，給你 Top 20 結果', illustration: 'ai-process' as const },
              { step: '03', title: '一鍵連線', desc: '看對誰感興趣就發連線請求，配對 → 私訊 → 見面，全在平台內完成', illustration: 'connect' as const },
            ].map((s) => (
              <div key={s.step} className="relative rounded-card bg-white border border-ink-200 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all overflow-hidden">
                <div className="h-32 relative">
                  <Illustration variant={s.illustration} />
                  <div className="absolute top-2 left-2 w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center text-white font-display font-bold text-sm shadow-lg border-2 border-white">
                    {s.step}
                  </div>
                </div>
                <div className="p-6 pt-4">
                  <h3 className="font-display text-2xl font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-3 text-ink-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-hero-gradient animate-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">開始你的第一場精準人脈配對</h2>
          <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">免費加入，每月 5 次 AI 配對。不滿意隨時停用。</p>
          <Link href="/signup" className="mt-8 inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-button bg-white text-primary-700 shadow-2xl hover:scale-105 transition-all">
            免費加入 Connections
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  illustrationVariant,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  illustrationVariant: 'ai-matching' | 'cross-border' | 'relationships';
  gradient: string;
}) {
  return (
    <div className="group relative rounded-card bg-white border border-ink-200 hover:border-transparent hover:shadow-2xl transition-all overflow-hidden">
      <div className="h-40 relative">
        <Illustration variant={illustrationVariant} />
        <div className={`absolute -bottom-6 left-6 w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg border-4 border-white z-10`}>
          {icon}
        </div>
      </div>
      <div className="p-6 pt-8">
        <h3 className="font-display text-2xl font-bold text-ink-900">{title}</h3>
        <p className="mt-3 text-ink-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
