import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        <p className="text-sm text-ink-500">載入中...</p>
      </div>
    </div>
  );
}
