'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { signInWithEmail, signInWithGoogle } from '@/lib/auth/actions';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signInWithEmail, {});

  return (
    <main className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/30 flex items-center justify-center p-4">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-2xl">Connections</span>
        </Link>

        <Card>
          <CardContent className="pt-6">
            <h1 className="font-display text-3xl font-bold text-ink-900 text-center">
              歡迎回來
            </h1>
            <p className="mt-2 text-center text-ink-500">
              登入繼續你的人脈探索
            </p>

            {state.error && (
              <div className="mt-6 p-3 rounded-button bg-red-50 border border-red-200 text-sm text-red-700">
                {state.error}
              </div>
            )}

            <form action={formAction} className="mt-6 space-y-4">
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
              <Input
                name="password"
                type="password"
                label="密碼"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />

              <Button type="submit" size="lg" className="w-full" disabled={pending}>
                {pending ? '登入中...' : '登入'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-ink-200" />
              <span className="text-xs text-ink-400">或</span>
              <div className="flex-1 h-px bg-ink-200" />
            </div>

            <form action={signInWithGoogle}>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                使用 Google 登入
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-500">
              還沒有帳號？{' '}
              <Link
                href="/signup"
                className="font-semibold text-primary-600 hover:text-primary-700"
              >
                免費加入
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
