'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="font-display text-3xl font-bold text-ink-900">發生了一些錯誤</h1>
        <p className="mt-2 text-ink-500">請重新整理或回到首頁</p>
        {error.digest && (
          <p className="mt-1 text-xs text-ink-400 font-mono">{error.digest}</p>
        )}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>
            <RefreshCw className="w-4 h-4" />
            重試
          </Button>
          <Link href="/">
            <Button variant="secondary">
              <Home className="w-4 h-4" />
              回到首頁
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
