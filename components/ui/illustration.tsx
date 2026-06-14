// Inline SVG illustration components — 取代 DALL-E 的「豐富視覺」方案
// 設計：pop art / 滿版色塊 / 多元素，符合老蔡口味

import { cn } from '@/lib/utils';

export type IllustrationVariant =
  | 'ai-matching'
  | 'cross-border'
  | 'relationships'
  | 'fill-intent'
  | 'ai-process'
  | 'connect'
  | 'event-ecommerce'
  | 'event-funding'
  | 'event-japan'
  | 'event-women'
  | 'empty-no-match'
  | 'empty-no-connection'
  | 'empty-no-message'
  | '404'
  | 'hero-network';

interface IllustrationProps {
  variant: IllustrationVariant;
  className?: string;
}

export function Illustration({ variant, className }: IllustrationProps) {
  return (
    <div className={cn('relative w-full h-full overflow-hidden rounded-card', className)}>
      {VARIANTS[variant]()}
    </div>
  );
}

const VARIANTS: Record<IllustrationVariant, () => React.ReactNode> = {
  // ====== Hero 主視覺 ======
  'hero-network': () => (
    <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hero-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="50%" stopColor="#4338CA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <radialGradient id="hero-glow1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-glow2" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#hero-bg)" />
      {/* 模糊光暈 */}
      <circle cx="200" cy="200" r="180" fill="url(#hero-glow1)" />
      <circle cx="600" cy="400" r="200" fill="url(#hero-glow2)" />
      {/* 抽象人脈網絡 — 8 個節點 + 連線 */}
      <g stroke="#A5B4FC" strokeWidth="1.5" fill="none" opacity="0.6">
        <line x1="200" y1="200" x2="400" y2="150" />
        <line x1="200" y1="200" x2="300" y2="350" />
        <line x1="200" y1="200" x2="500" y2="280" />
        <line x1="400" y1="150" x2="600" y2="200" />
        <line x1="300" y1="350" x2="500" y2="280" />
        <line x1="500" y1="280" x2="650" y2="400" />
        <line x1="600" y1="200" x2="650" y2="400" />
        <line x1="300" y1="350" x2="200" y2="450" />
        <line x1="200" y1="450" x2="400" y2="500" />
        <line x1="400" y1="500" x2="500" y2="280" />
      </g>
      {/* 節點 */}
      {[
        { cx: 200, cy: 200, r: 28, fill: '#F97316' },
        { cx: 400, cy: 150, r: 22, fill: '#06B6D4' },
        { cx: 300, cy: 350, r: 25, fill: '#FBBF24' },
        { cx: 500, cy: 280, r: 30, fill: '#EC4899' },
        { cx: 600, cy: 200, r: 22, fill: '#10B981' },
        { cx: 650, cy: 400, r: 26, fill: '#8B5CF6' },
        { cx: 200, cy: 450, r: 20, fill: '#F59E0B' },
        { cx: 400, cy: 500, r: 24, fill: '#3B82F6' },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.fill} opacity="0.9" />
          <circle cx={n.cx} cy={n.cy} r={n.r + 8} fill="none" stroke={n.fill} strokeWidth="2" opacity="0.4" />
        </g>
      ))}
      {/* 中心亮點 */}
      <circle cx="500" cy="280" r="40" fill="white" opacity="0.15" />
      <circle cx="500" cy="280" r="60" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
    </svg>
  ),

  // ====== 3 大特色 ======
  'ai-matching': () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ai-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ai-bg)" />
      {/* AI 大腦 */}
      <circle cx="200" cy="150" r="60" fill="#FBBF24" opacity="0.3" />
      <circle cx="200" cy="150" r="50" fill="none" stroke="#FBBF24" strokeWidth="2" />
      <circle cx="200" cy="150" r="8" fill="white" />
      <circle cx="180" cy="140" r="4" fill="#FBBF24" />
      <circle cx="220" cy="140" r="4" fill="#FBBF24" />
      <circle cx="190" cy="165" r="4" fill="#FBBF24" />
      <circle cx="210" cy="165" r="4" fill="#FBBF24" />
      {/* 配對箭頭 */}
      <path d="M 100 80 L 160 130" stroke="white" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
      <path d="M 300 80 L 240 130" stroke="white" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
      <path d="M 100 230 L 160 180" stroke="white" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
      <path d="M 300 230 L 240 180" stroke="white" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
        </marker>
      </defs>
      {/* 4 個候選人形 */}
      {[
        { x: 100, y: 80, fill: '#EC4899' },
        { x: 300, y: 80, fill: '#10B981' },
        { x: 100, y: 230, fill: '#06B6D4' },
        { x: 300, y: 230, fill: '#F97316' },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="20" fill={p.fill} />
          <circle cx={p.x} cy={p.y - 22} r="10" fill="white" />
        </g>
      ))}
    </svg>
  ),

  'cross-border': () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cb-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cb-bg)" />
      {/* 地球儀 */}
      <circle cx="200" cy="150" r="100" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="2" />
      <ellipse cx="200" cy="150" rx="100" ry="40" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="200" cy="150" rx="60" ry="100" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="100" y1="150" x2="300" y2="150" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="200" y1="50" x2="200" y2="250" stroke="white" strokeWidth="1.5" opacity="0.6" />
      {/* 地標點 */}
      <g fill="white">
        <circle cx="160" cy="120" r="5" />
        <circle cx="220" cy="140" r="5" />
        <circle cx="180" cy="180" r="5" />
        <circle cx="240" cy="170" r="5" />
        <circle cx="150" cy="200" r="5" />
      </g>
      {/* 飛機軌跡 */}
      <path d="M 100 80 Q 200 40 300 80" stroke="white" strokeWidth="2" fill="none" strokeDasharray="4,4" />
      <path d="M 50 200 Q 200 280 350 220" stroke="white" strokeWidth="2" fill="none" strokeDasharray="4,4" />
      {/* 飛機 */}
      <text x="195" y="55" fontSize="20" fill="white">✈️</text>
      <text x="195" y="265" fontSize="20" fill="white">✈️</text>
    </svg>
  ),

  'relationships': () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="rel-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#rel-bg)" />
      {/* 時間軸 */}
      <line x1="50" y1="200" x2="350" y2="200" stroke="white" strokeWidth="3" />
      {[100, 175, 250].map((x, i) => (
        <circle key={i} cx={x} cy="200" r="8" fill="white" />
      ))}
      {/* 累積的連線節點 */}
      {[
        { cx: 100, cy: 100, color: '#FBBF24' },
        { cx: 175, cy: 80, color: '#EC4899' },
        { cx: 250, cy: 120, color: '#8B5CF6' },
        { cx: 300, cy: 60, color: '#F97316' },
        { cx: 325, cy: 140, color: '#FBBF24' },
      ].map((n, i) => (
        <g key={i}>
          <line x1={n.cx} y1={n.cy} x2={[100, 175, 250][Math.min(i, 2)]} y2="200" stroke="white" strokeWidth="1" opacity="0.6" />
          <circle cx={n.cx} cy={n.cy} r="18" fill={n.color} />
          <circle cx={n.cx} cy={n.cy} r="18" fill="none" stroke="white" strokeWidth="2" />
        </g>
      ))}
      <text x="50" y="250" fill="white" fontSize="14" fontWeight="bold">3 個月前</text>
      <text x="280" y="250" fill="white" fontSize="14" fontWeight="bold">今天</text>
    </svg>
  ),

  // ====== 3 步驟 ======
  'fill-intent': () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#4F46E5" />
      <rect x="60" y="60" width="280" height="180" rx="12" fill="white" />
      <circle cx="100" cy="100" r="6" fill="#F97316" />
      <circle cx="120" cy="100" r="6" fill="#10B981" />
      <circle cx="140" cy="100" r="6" fill="#EF4444" />
      {/* 對話氣泡 */}
      <rect x="80" y="130" width="180" height="20" rx="10" fill="#E0E7FF" />
      <rect x="80" y="160" width="240" height="20" rx="10" fill="#E0E7FF" />
      <rect x="80" y="190" width="160" height="20" rx="10" fill="#E0E7FF" />
      {/* 游標 */}
      <line x1="245" y1="155" x2="245" y2="175" stroke="#4F46E5" strokeWidth="2">
        <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
      </line>
    </svg>
  ),

  'ai-process': () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#7C3AED" />
      {/* 旋轉的齒輪 */}
      <g transform="translate(200, 150)">
        <g>
          <circle r="50" fill="none" stroke="white" strokeWidth="3" strokeDasharray="20,10" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle r="30" fill="#FBBF24" />
          <text textAnchor="middle" dy="6" fontSize="20" fill="white">AI</text>
        </g>
      </g>
      {/* 周圍的資料點 */}
      {[
        { x: 100, y: 100, fill: '#EC4899' },
        { x: 300, y: 100, fill: '#10B981' },
        { x: 100, y: 200, fill: '#06B6D4' },
        { x: 300, y: 200, fill: '#F97316' },
        { x: 60, y: 150, fill: '#FBBF24' },
        { x: 340, y: 150, fill: '#8B5CF6' },
      ].map((p, i) => (
        <g key={i}>
          <line x1={p.x} y1={p.y} x2="200" y2="150" stroke="white" strokeWidth="1" opacity="0.4" />
          <circle cx={p.x} cy={p.y} r="10" fill={p.fill} />
        </g>
      ))}
    </svg>
  ),

  'connect': () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="conn-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#conn-bg)" />
      {/* 兩個握手的圓 */}
      <circle cx="140" cy="150" r="50" fill="white" opacity="0.9" />
      <circle cx="260" cy="150" r="50" fill="white" opacity="0.9" />
      <circle cx="140" cy="125" r="20" fill="#FBBF24" />
      <circle cx="260" cy="125" r="20" fill="#10B981" />
      {/* 連線光束 */}
      <line x1="180" y1="150" x2="220" y2="150" stroke="white" strokeWidth="4" />
      <circle cx="200" cy="150" r="8" fill="#FBBF24" stroke="white" strokeWidth="2" />
      {/* 火花 */}
      {[180, 195, 210, 220].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="130" x2={x} y2="120" stroke="white" strokeWidth="1.5" />
          <line x1={x} y1="170" x2={x} y2="180" stroke="white" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  ),

  // ====== 4 個活動封面 ======
  'event-ecommerce': () => (
    <svg viewBox="0 0 800 320" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ec-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <rect width="800" height="320" fill="url(#ec-bg)" />
      {/* 地球 */}
      <circle cx="600" cy="160" r="100" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2" />
      <ellipse cx="600" cy="160" rx="100" ry="40" fill="none" stroke="white" strokeWidth="1.5" />
      <ellipse cx="600" cy="160" rx="60" ry="100" fill="none" stroke="white" strokeWidth="1.5" />
      {/* 購物車 */}
      <g transform="translate(150, 100)">
        <rect x="0" y="20" width="120" height="80" rx="8" fill="white" />
        <rect x="10" y="30" width="40" height="20" fill="#FBBF24" />
        <rect x="60" y="30" width="50" height="20" fill="#EC4899" />
        <rect x="10" y="60" width="100" height="30" fill="#10B981" />
        <circle cx="20" cy="120" r="15" fill="#F97316" stroke="white" strokeWidth="3" />
        <circle cx="100" cy="120" r="15" fill="#06B6D4" stroke="white" strokeWidth="3" />
      </g>
      <text x="400" y="60" fontSize="48" fontWeight="900" fill="white">東南亞</text>
      <text x="400" y="120" fontSize="36" fontWeight="700" fill="rgba(255,255,255,0.8)">跨境電商</text>
    </svg>
  ),

  'event-funding': () => (
    <svg viewBox="0 0 800 320" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="fd-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect width="800" height="320" fill="url(#fd-bg)" />
      {/* 上漲箭頭 */}
      <polyline points="100,250 200,200 300,170 400,140 500,100 600,60 700,40" stroke="white" strokeWidth="6" fill="none" />
      <polygon points="700,40 680,50 690,30 710,30" fill="white" />
      {/* 圓點標記 */}
      {[100, 200, 300, 400, 500, 600, 700].map((x, i) => (
        <circle key={i} cx={x} cy={250 - (i * 35)} r="6" fill="#FBBF24" stroke="white" strokeWidth="2" />
      ))}
      <text x="80" y="80" fontSize="56" fontWeight="900" fill="white">A 輪</text>
      <text x="80" y="130" fontSize="32" fontWeight="700" fill="rgba(255,255,255,0.85)">募資</text>
    </svg>
  ),

  'event-japan': () => (
    <svg viewBox="0 0 800 320" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="jp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="800" height="320" fill="url(#jp-bg)" />
      {/* 富士山 */}
      <polygon points="100,260 250,100 400,260" fill="white" opacity="0.95" />
      <polygon points="220,140 250,100 280,140 270,130 250,115 230,130" fill="#FCA5A5" />
      {/* 櫻花 */}
      {[
        { x: 100, y: 80, r: 12, fill: '#FBBF24' },
        { x: 200, y: 50, r: 14, fill: '#EC4899' },
        { x: 500, y: 100, r: 16, fill: '#FBBF24' },
        { x: 600, y: 60, r: 12, fill: '#EC4899' },
        { x: 700, y: 90, r: 14, fill: '#FBBF24' },
        { x: 150, y: 200, r: 10, fill: '#EC4899' },
        { x: 450, y: 220, r: 12, fill: '#FBBF24' },
        { x: 650, y: 180, r: 14, fill: '#EC4899' },
      ].map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r={c.r} fill={c.fill} />
          <circle cx={c.x - c.r * 0.3} cy={c.y} r={c.r * 0.4} fill="white" opacity="0.4" />
        </g>
      ))}
      <text x="420" y="200" fontSize="56" fontWeight="900" fill="white">日本</text>
      <text x="420" y="250" fontSize="32" fontWeight="700" fill="rgba(255,255,255,0.85)">市場</text>
    </svg>
  ),

  'event-women': () => (
    <svg viewBox="0 0 800 320" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wm-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <rect width="800" height="320" fill="url(#wm-bg)" />
      {/* 3 個女性剪影 */}
      {[
        { x: 150, color: '#FBBF24' },
        { x: 400, color: '#10B981' },
        { x: 650, color: '#06B6D4' },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x}, 80)`}>
          <circle cx="0" cy="0" r="25" fill={p.color} stroke="white" strokeWidth="3" />
          <path d="M -30 30 Q -30 130 0 180 Q 30 130 30 30 Z" fill={p.color} stroke="white" strokeWidth="3" />
          <circle cx="-8" cy="-3" r="3" fill="white" />
          <circle cx="8" cy="-3" r="3" fill="white" />
        </g>
      ))}
      <text x="400" y="280" fontSize="28" fontWeight="700" fill="white" textAnchor="middle">D2C 品牌共學</text>
    </svg>
  ),

  // ====== Empty states ======
  'empty-no-match': () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F8FAFC" />
      <circle cx="200" cy="150" r="50" fill="none" stroke="#94A3B8" strokeWidth="3" />
      <line x1="240" y1="190" x2="280" y2="230" stroke="#94A3B8" strokeWidth="3" />
      <text x="200" y="250" fontSize="14" fill="#64748B" textAnchor="middle">沒有配對結果</text>
    </svg>
  ),

  'empty-no-connection': () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F8FAFC" />
      <circle cx="160" cy="140" r="30" fill="#E0E7FF" />
      <circle cx="240" cy="140" r="30" fill="#FED7AA" />
      <line x1="180" y1="170" x2="220" y2="170" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="6,4" />
      <text x="200" y="240" fontSize="14" fill="#64748B" textAnchor="middle">還沒有連線</text>
    </svg>
  ),

  'empty-no-message': () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F8FAFC" />
      <path d="M 130 100 L 270 100 L 270 200 L 200 200 L 170 230 L 170 200 L 130 200 Z" fill="white" stroke="#CBD5E1" strokeWidth="2" />
      <circle cx="160" cy="140" r="3" fill="#94A3B8" />
      <circle cx="200" cy="140" r="3" fill="#94A3B8" />
      <circle cx="240" cy="140" r="3" fill="#94A3B8" />
      <text x="200" y="260" fontSize="14" fill="#64748B" textAnchor="middle">還沒有訊息</text>
    </svg>
  ),

  // ====== 404 ======
  '404': () => (
    <svg viewBox="0 0 600 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="404-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#404-bg)" />
      {/* 巨大的 404 */}
      <text x="300" y="220" fontSize="200" fontWeight="900" fill="white" textAnchor="middle" opacity="0.9">404</text>
      {/* 失聯的人脈線 */}
      <line x1="100" y1="280" x2="500" y2="280" stroke="white" strokeWidth="3" strokeDasharray="8,4" opacity="0.5" />
      <circle cx="100" cy="280" r="15" fill="white" />
      <circle cx="500" cy="280" r="15" fill="white" opacity="0.3" />
      <text x="300" y="340" fontSize="20" fill="white" textAnchor="middle" opacity="0.9">人脈斷了，再試一次？</text>
    </svg>
  ),
};
