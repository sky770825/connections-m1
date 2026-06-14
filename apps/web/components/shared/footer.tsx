import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 bg-ink-900 text-ink-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-white">Connections</span>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed">
              台灣/亞洲跨境商務人脈 AI 配對平台
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">產品</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="hover:text-white transition">搜尋人脈</Link></li>
              <li><Link href="/match" className="hover:text-white transition">AI 配對</Link></li>
              <li><Link href="/upgrade" className="hover:text-white transition">升級 Pro</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">公司</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">關於我們</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">隱私政策</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">服務條款</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">聯絡</h4>
            <ul className="space-y-2 text-sm">
              <li>support@connections.app</li>
              <li>台北市信義區</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-ink-800 text-xs text-ink-500 text-center">
          © 2026 Connections. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
