'use client';

import { useActionState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { updateProfile } from '@/lib/profile/actions';

export default function ProfileEditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isWelcome = searchParams.get('welcome') === '1';

  const [state, formAction, pending] = useActionState(updateProfile, {});

  // 成功後跳轉
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => router.push('/profile'), 1200);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-hero-gradient flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl">Connections</span>
        </div>

        {isWelcome && (
          <div className="mb-6 p-4 rounded-card bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 flex items-start gap-3">
            <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-ink-900">歡迎加入！</h3>
              <p className="text-sm text-ink-600 mt-0.5">
                完成以下設定，讓 AI 為你配對最合適的人脈
              </p>
            </div>
          </div>
        )}

        <Card>
          <CardContent className="pt-6">
            <h1 className="font-display text-3xl font-bold text-ink-900">
              你的個人檔案
            </h1>
            <p className="mt-1 text-ink-500 text-sm">
              填得越詳細，AI 配對越精準
            </p>

            {state.error && (
              <div className="mt-4 p-3 rounded-button bg-red-50 border border-red-200 text-sm text-red-700">
                {state.error}
              </div>
            )}
            {state.success && (
              <div className="mt-4 p-3 rounded-button bg-green-50 border border-green-200 text-sm text-green-700">
                {state.success} — 正在跳轉...
              </div>
            )}

            <form action={formAction} className="mt-6 space-y-5">
              <Input
                name="displayName"
                label="顯示名稱 *"
                placeholder="王小明"
                required
              />
              <Input
                name="headline"
                label="一句話自我介紹"
                placeholder="例如：跨境電商創業者，專注東南亞市場"
              />
              <Input
                name="avatarUrl"
                label="頭像網址（可選）"
                placeholder="https://..."
                type="url"
              />
              <Textarea
                name="bio"
                label="自我介紹"
                placeholder="讓其他人快速了解你的背景、專業、想做的事..."
                rows={4}
                hint="建議 100-200 字"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  name="industry"
                  label="產業"
                  placeholder="Fintech / 跨境電商 / SaaS"
                />
                <Input
                  name="location"
                  label="所在地"
                  placeholder="台北, 台灣"
                />
              </div>
              <Input
                name="skills"
                label="技能（用逗號分隔）"
                placeholder="VC, 募資, 估值, M&A"
                hint="至少填寫 1 個"
              />
              <Input
                name="tags"
                label="標籤（用逗號分隔，用於 AI 配對）"
                placeholder="創投, 天使投資, Fintech, 早期階段"
                hint="至少填寫 1 個，建議 3-7 個"
              />
              <Textarea
                name="intent"
                label="我想找的人（最重要）"
                placeholder="例如：想找能幫我 A 輪募資的創投合夥人，熟悉台灣/東南亞市場的優先"
                rows={3}
                hint="AI 會根據這段話幫你配對最合適的人脈"
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={pending}
                >
                  {pending ? '儲存中...' : '儲存並開始配對'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
