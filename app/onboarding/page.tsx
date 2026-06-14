'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, Check, User, Target, Users, X } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const STEPS = [
  { id: 1, title: '歡迎加入', icon: Sparkles, description: '認識 Connections 怎麼幫你' },
  { id: 2, title: '填寫檔案', icon: User, description: '讓 AI 知道你是誰' },
  { id: 3, title: '設定意圖', icon: Target, description: '告訴我們你想找什麼人' },
  { id: 4, title: '第一次配對', icon: Users, description: '看 AI 給你的 Top 5 配對' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(false);

  // 表單狀態
  const [displayName, setDisplayName] = React.useState('');
  const [headline, setHeadline] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [industry, setIndustry] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [skills, setSkills] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [intent, setIntent] = React.useState('');

  const next = () => step < 4 && setStep(step + 1);
  const back = () => step > 1 && setStep(step - 1);
  const skip = () => {
    setSkipped(true);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar user={{ displayName: '你' }} />

      {/* 進度條 */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-ink-500">步驟 {step} / 4</p>
          <button
            onClick={skip}
            className="text-sm text-ink-500 hover:text-ink-900 flex items-center gap-1"
          >
            跳過 <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="h-1.5 bg-ink-100 rounded-pill overflow-hidden">
          <div
            className="h-full bg-hero-gradient transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 步驟指示 */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const active = step === s.id;
            const done = step > s.id;
            return (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                    done
                      ? 'bg-green-500 text-white'
                      : active
                      ? 'bg-hero-gradient text-white shadow-lg'
                      : 'bg-ink-100 text-ink-400'
                  }`}
                >
                  {done ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                {s.id < 4 && (
                  <div
                    className={`w-8 h-0.5 ${done ? 'bg-green-500' : 'bg-ink-200'}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* 步驟 1: 歡迎 */}
        {step === 1 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-hero-gradient flex items-center justify-center mb-4 animate-gradient">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-3xl font-bold text-ink-900">
                歡迎加入 Connections
              </h1>
              <p className="mt-3 text-ink-600 max-w-md mx-auto">
                我們是台灣/亞洲跨境商務人脈的 AI 配對平台。<br />
                完成以下 4 個步驟，AI 會幫你找到最值得認識的人。
              </p>

              <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                {[
                  { icon: '🎯', title: 'AI 精準', desc: '意圖 → 配對' },
                  { icon: '🌏', title: '亞洲跨境', desc: '台灣+東南亞+日本' },
                  { icon: '💎', title: '真實沈澱', desc: '關係可搜尋' },
                ].map((b) => (
                  <div key={b.title} className="p-4 rounded-card bg-ink-50">
                    <div className="text-3xl mb-1">{b.icon}</div>
                    <h3 className="font-semibold text-ink-900 text-sm">{b.title}</h3>
                    <p className="text-xs text-ink-500 mt-0.5">{b.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3 justify-center">
                <Button onClick={next} size="lg">
                  開始設定
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button onClick={skip} variant="ghost" size="lg">
                  之後再說
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 步驟 2: 填寫檔案 */}
        {step === 2 && (
          <Card>
            <CardContent className="pt-6">
              <h1 className="font-display text-3xl font-bold text-ink-900">
                你的個人檔案
              </h1>
              <p className="mt-1 text-ink-500 text-sm">
                填得越詳細，AI 配對越精準（你之後可隨時改）
              </p>

              <div className="mt-6 space-y-4">
                <Input
                  label="顯示名稱 *"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="王小明"
                />
                <Input
                  label="一句話自我介紹"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="例如：跨境電商創業者，專注東南亞市場"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="產業"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Fintech / 跨境電商 / SaaS"
                  />
                  <Input
                    label="所在地"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="台北, 台灣"
                  />
                </div>
                <Textarea
                  label="自我介紹"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="讓其他人快速了解你的背景、專業、想做的事..."
                  rows={3}
                />
              </div>

              <div className="mt-8 flex justify-between">
                <Button onClick={back} variant="ghost">
                  上一步
                </Button>
                <Button onClick={next} disabled={!displayName.trim()}>
                  下一步
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 步驟 3: 設定意圖 */}
        {step === 3 && (
          <Card>
            <CardContent className="pt-6">
              <h1 className="font-display text-3xl font-bold text-ink-900">
                你想找什麼人？
              </h1>
              <p className="mt-1 text-ink-500 text-sm">
                寫得越具體，AI 配對越精準
              </p>

              <div className="mt-6 space-y-4">
                <Input
                  label="技能（用逗號分隔）"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="VC, 募資, 估值, M&A"
                  hint="至少填寫 1 個"
                />
                <Input
                  label="標籤（用逗號分隔，用於 AI 配對）"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="創投, 天使投資, Fintech, 早期階段"
                  hint="至少填寫 1 個，建議 3-7 個"
                />
                <Textarea
                  label="我想找的人（最重要）"
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  placeholder="例如：想找能幫我 A 輪募資的創投合夥人，熟悉台灣/東南亞市場的優先"
                  rows={3}
                  hint="AI 會根據這段話幫你配對最合適的人脈"
                />
              </div>

              <div className="mt-4 p-3 rounded-button bg-primary-50 border border-primary-100">
                <p className="text-xs text-ink-700">
                  💡 <strong>配對小技巧：</strong>具體角色（"創投合夥人"）+ 地區（"熟悉東南亞"）+ 用途（"幫我募資"）
                </p>
              </div>

              <div className="mt-8 flex justify-between">
                <Button onClick={back} variant="ghost">
                  上一步
                </Button>
                <Button onClick={next} disabled={!intent.trim()}>
                  下一步
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 步驟 4: 第一次配對 */}
        {step === 4 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-cta-gradient flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-3xl font-bold text-ink-900">
                🎉 設定完成！
              </h1>
              <p className="mt-3 text-ink-600 max-w-md mx-auto">
                AI 已經根據你的「意圖」準備好配對了。<br />
                立即去看你的 Top 5 人脈推薦。
              </p>

              <div className="mt-8 max-w-sm mx-auto space-y-2">
                {[
                  { name: '陳志豪 · 創投合夥人', reason: '熟悉 A 輪募資' },
                  { name: 'Sarah Chen · Web3 顧問', reason: '新加坡市場' },
                  { name: '林筱婷 · 跨境電商', reason: '東南亞 KOL 行銷' },
                ].map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center gap-3 p-3 rounded-card bg-ink-50 border border-ink-100 text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-hero-gradient flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-ink-900 text-sm truncate">{m.name}</p>
                      <p className="text-xs text-ink-500">匹配：{m.reason}</p>
                    </div>
                    <Badge variant="success">高契合</Badge>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3 justify-center">
                <Button onClick={skip} size="lg">
                  去看完整配對
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Link href="/dashboard">
                  <Button variant="secondary" size="lg">
                    回儀表板
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
