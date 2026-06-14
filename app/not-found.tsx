import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Illustration } from '@/components/ui/illustration';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl w-full">
        <div className="h-64 mb-6">
          <Illustration variant="404" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-900">
          找不到這個頁面
        </h1>
        <p className="mt-2 text-ink-500">
          你要找的內容可能已經被移除，或連結錯誤
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button size="lg">
            <Home className="w-4 h-4" />
            回到首頁
          </Button>
        </Link>
      </div>
    </main>
  );
}
