'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, Send, RefreshCw, MapPin, Briefcase, Target } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MOCK_PROFILES } from '@/lib/data/mock-profiles';
import { scoreToTier } from '@/lib/utils';

const SAMPLE_INTENTS = [
  '想找能幫我 A 輪募資的創投合夥人',
  '想找東南亞 KOL 行銷代理商',
  '想找熟悉日本市場的跨境電商顧問',
  '想找女性創業 D2C 品牌創辦人',
  '想找 Web3 進入台灣市場的策略顧問',
];

export default function MatchPage() {
  const [intent, setIntent] = React.useState('');
  const [matched, setMatched] = React.useState<typeof MOCK_PROFILES | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleMatch = () => {
    if (!intent.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const q = intent.toLowerCase();
      const results = MOCK_PROFILES
        .map((p) => ({
          p,
          score: (p.bio.toLowerCase().includes(q) ? 0.4 : 0) + (p.tags.some((t) => q.includes(t.toLowerCase())) ? 0.3 : 0) + (p.skills.some((s) => q.includes(s.toLowerCase())) ? 0.3 : 0) + 0.5,
        }))
        .filter((r) => r.score > 0.5)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.p);
      setMatched(results.length > 0 ? results : MOCK_PROFILES.slice(0, 3));
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar user={{ displayName: '你' }} currentPath="/match" />
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white/80 border border-primary-200 shadow-sm mb-3">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-ink-700">AI 智能配對</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-ink-900">告訴我你想找什麼人</h1>
          <p className="mt-2 text-ink-500">AI 會根據你的意圖，從平台 5000+ 人脈中找到 Top 20 配對</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Textarea label="我想找的人（用一句話描述）" placeholder="例如：想找能幫我 A 輪募資的創投合夥人，熟悉台灣/東南亞市場的優先" rows={4} value={intent} onChange={(e) => setIntent(e.target.value)} hint="越具體 AI 配對越精準" />
            <div className="mt-3">
              <p className="text-xs text-ink-500 mb-2">或試試這些範例：</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_INTENTS.map((s) => (
                  <button key={s} onClick={() => setIntent(s)} className="text-xs px-3 py-1.5 rounded-pill bg-white border border-ink-200 text-ink-600 hover:border-primary-300 hover:text-primary-700 transition">{s}</button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Button onClick={handleMatch} size="lg" disabled={!intent.trim() || loading} className="flex-1">
                {loading ? (<><RefreshCw className="w-4 h-4 animate-spin" />AI 配對中...</>) : (<><Sparkles className="w-4 h-4" />開始 AI 配對</>)}
              </Button>
              <Button onClick={() => { setIntent(''); setMatched(null); }} variant="secondary" size="lg">清除</Button>
            </div>
          </CardContent>
        </Card>

        {matched && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-bold text-ink-900">配對結果（{matched.length}）</h2>
              <Button variant="ghost" size="sm" onClick={handleMatch}><RefreshCw className="w-4 h-4" />重新配對</Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {matched.map((p, idx) => {
                const score = 0.95 - idx * 0.05;
                const tier = scoreToTier(score);
                return (
                  <Card key={p.id} className="hover:shadow-xl hover:scale-[1.01] transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar fallback={p.displayName} size="lg" className={`bg-gradient-to-br ${p.avatarColor}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link href={`/u/${p.id}`} className="font-display text-lg font-bold text-ink-900 hover:text-primary-600">{p.displayName}</Link>
                            <Badge className={tier.color}>{tier.label}</Badge>
                          </div>
                          <p className="text-sm text-ink-600 line-clamp-2">{p.headline}</p>
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-500">
                            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{p.industry}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 rounded-button bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100">
                        <div className="flex items-start gap-2">
                          <Target className="w-3.5 h-3.5 text-primary-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-ink-700 line-clamp-2"><span className="font-semibold">TA 想找：</span>{p.intent}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Link href={`/u/${p.id}`} className="flex-1"><Button variant="secondary" size="sm" className="w-full">查看檔案</Button></Link>
                        <Button size="sm" className="flex-1"><Send className="w-4 h-4" />發送連線</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {!matched && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>💡 配對小技巧</CardTitle>
              <CardDescription>寫得越具體，AI 配對越準</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-ink-600">
                <li>✅ 寫出 <strong>具體角色</strong>：「創投合夥人」比「投資人」精準</li>
                <li>✅ 加上 <strong>地區偏好</strong>：「熟悉東南亞的」比「國際的」有效</li>
                <li>✅ 寫出 <strong>用途</strong>：「幫我募資」比「想合作」AI 更能理解</li>
                <li>✅ 給 <strong>優先條件</strong>：「優先考慮有跨境經驗的」</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
}
