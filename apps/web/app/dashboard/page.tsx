import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Sparkles, Search, MessageCircle, Users, Calendar, ArrowRight, Sparkles as Sparkle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { signOut } from '@/lib/auth/actions';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // 抓取使用者 profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || !profile.intent) {
    redirect('/profile/edit?welcome=1');
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 glass border-b border-ink-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold">Connections</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button variant="ghost" size="sm">我的檔案</Button>
            </Link>
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="sm">登出</Button>
            </form>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* 歡迎 banner */}
        <div className="mb-8 p-6 rounded-card bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-xl">
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            嗨，{profile.display_name} 👋
          </h1>
          <p className="mt-1 text-white/90">
            你的 AI 配對正在準備中（Sprint 1 上線後自動啟用）
          </p>
        </div>

        {/* 4 個核心功能卡片（M1 完成後會變成可互動的） */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            icon={<Sparkle className="w-6 h-6" />}
            title="AI 配對"
            description="填寫意圖後，AI 給你 Top 20 配對"
            href="/match"
            badge="W3 上線"
            gradient="from-primary-500 to-primary-700"
          />
          <FeatureCard
            icon={<Search className="w-6 h-6" />}
            title="人脈搜尋"
            description="用標籤、技能、產業搜尋會員"
            href="/search"
            badge="W2 上線"
            gradient="from-cyan-500 to-cyan-700"
          />
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="我的連線"
            description="管理你的連線與互動歷史"
            href="/connections"
            badge="W5 上線"
            gradient="from-accent-500 to-accent-700"
          />
          <FeatureCard
            icon={<Calendar className="w-6 h-6" />}
            title="活動"
            description="瀏覽/發布商務活動"
            href="/events"
            badge="W7 上線"
            gradient="from-pink-500 to-rose-700"
          />
        </div>

        {/* 進度提示 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🚀 M1 開發進度</CardTitle>
            <CardDescription>8 週完成 MVP，目前在 Sprint 0（環境建置）</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                { name: 'Sprint 0 — 環境 + 設計系統 + Landing + 註冊', status: 'in_progress' },
                { name: 'Sprint 1 — 會員系統 + 個人檔案', status: 'next' },
                { name: 'Sprint 2 — AI 配對 + 搜尋', status: 'planned' },
                { name: 'Sprint 3 — 互動 + 私訊', status: 'planned' },
                { name: 'Sprint 4 — 活動 + 訂閱 + 上線', status: 'planned' },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <Badge variant={s.status === 'in_progress' ? 'accent' : 'default'}>
                    {s.status === 'in_progress' ? '進行中' : s.status === 'next' ? '下一個' : '排程中'}
                  </Badge>
                  <span className="text-ink-700">{s.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
  badge,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge: string;
  gradient: string;
}) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer h-full">
        <CardContent className="pt-6">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg mb-4`}>
            {icon}
          </div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display text-lg font-bold text-ink-900">{title}</h3>
            <Badge>{badge}</Badge>
          </div>
          <p className="text-sm text-ink-500">{description}</p>
          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary-600">
            前往 <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
