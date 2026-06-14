import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Heart, User } from 'lucide-react';
import { Illustration } from '@/components/ui/illustration';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_PROFILES } from '@/lib/data/mock-profiles';

interface MockEvent {
  id: string; title: string; description: string; hostId: string;
  startTime: string; endTime?: string; location: string;
  capacity: number; registered: number; priceCents: number;
  coverGradient: string; tags: string[]; agenda?: { time: string; topic: string }[];
}

const MOCK_EVENTS: MockEvent[] = [
  {
    id: 'evt-1',
    title: '台灣跨境電商東南亞市場進入策略',
    description: '邀請 5 位深耕東南亞市場的台灣創業家，分享進入印尼/越南/泰國的實戰經驗與踩坑教訓。包含選品策略、KOL 媒合、當地化文案、物流金流等 5 大主題。',
    hostId: 'mock-1', startTime: '2026-07-15 19:00', endTime: '21:30',
    location: '台北市信義區 · CLBC 大安會議中心',
    capacity: 50, registered: 32, priceCents: 0,
    coverGradient: 'from-primary-500 to-accent-500',
    tags: ['東南亞', '跨境電商', '市場進入'],
    agenda: [
      { time: '19:00 - 19:30', topic: '報到 + 自由交流' },
      { time: '19:30 - 20:00', topic: '選品策略：印尼美妝市場案例' },
      { time: '20:00 - 20:30', topic: 'KOL 媒合：TikTok 當地行銷' },
      { time: '20:30 - 21:00', topic: '物流金流：跨境收款最佳實踐' },
      { time: '21:00 - 21:30', topic: 'Q&A + 自由交流' },
    ],
  },
  {
    id: 'evt-2',
    title: 'A 輪募資實戰工作坊（小型私密）',
    description: '8 位已成功募 A 輪的創業者 + 5 位創投合夥人，限額 30 人。準備 pitch deck 的可帶來 1:1 點評。',
    hostId: 'mock-2', startTime: '2026-07-20 14:00', endTime: '17:00',
    location: '台北市松山區 · 影響力學院', capacity: 30, registered: 28, priceCents: 50000,
    coverGradient: 'from-accent-500 to-rose-500',
    tags: ['創投', '募資', 'Workshop'],
    agenda: [
      { time: '14:00 - 14:30', topic: '簽到 + 咖啡' },
      { time: '14:30 - 15:30', topic: 'A 輪募資 3 大關鍵' },
      { time: '15:30 - 16:30', topic: '1:1 pitch 點評（限額 8 名）' },
      { time: '16:30 - 17:00', topic: 'Networking' },
    ],
  },
  {
    id: 'evt-3',
    title: '日本市場進入 × 樂天/Amazon Japan 上架攻略',
    description: 'Yuki Tanaka 主講。從市場研究、當地化、上架流程到物流金流，一次搞懂日本電商進入。',
    hostId: 'mock-5', startTime: '2026-08-05 19:30', endTime: '21:00',
    location: '線上（Zoom）', capacity: 200, registered: 87, priceCents: 30000,
    coverGradient: 'from-cyan-500 to-purple-500',
    tags: ['日本市場', '跨境電商', '線上'],
  },
  {
    id: 'evt-4',
    title: '女性創業 D2C 品牌共學小聚',
    description: '張雅雯主持。每位參加者 5 分鐘分享自己的 D2C 品牌，互相給反饋。每月一次。',
    hostId: 'mock-6', startTime: '2026-07-25 10:00', endTime: '12:00',
    location: '台北市大安區 · 美好咖啡', capacity: 15, registered: 12, priceCents: 20000,
    coverGradient: 'from-rose-500 to-pink-500',
    tags: ['女性創業', 'D2C', '小聚'],
  },
];

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = MOCK_EVENTS.find((e) => e.id === id);
  if (!event) notFound();

  const host = MOCK_PROFILES.find((p) => p.id === event.hostId);
  const isFull = event.registered >= event.capacity;
  const isFree = event.priceCents === 0;
  const fillRate = (event.registered / event.capacity) * 100;
  const spotsLeft = event.capacity - event.registered;

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar user={{ displayName: '你' }} currentPath="/events" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          回到活動列表
        </Link>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* 主要內容 */}
          <div>
            {/* Cover */}
                <div className="h-64">
                  <Illustration
                    variant={
                      event.id === 'evt-1' ? 'event-ecommerce' :
                      event.id === 'evt-2' ? 'event-funding' :
                      event.id === 'evt-3' ? 'event-japan' :
                      'event-women'
                    }
                  />
                </div>

            <div className="mt-6">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {event.tags.map((t) => (
                  <Badge key={t} variant="accent">#{t}</Badge>
                ))}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-900">
                {event.title}
              </h1>
              <p className="mt-4 text-ink-600 leading-relaxed">{event.description}</p>
            </div>

            {/* 議程 */}
            {event.agenda && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">議程</h2>
                  <div className="space-y-3">
                    {event.agenda.map((a, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-button bg-ink-50">
                        <div className="text-sm font-mono font-semibold text-primary-700 w-32 flex-shrink-0">
                          {a.time}
                        </div>
                        <div className="text-sm text-ink-700">{a.topic}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 主辦人 */}
            {host && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">主辦人</h2>
                  <Link
                    href={`/u/${host.id}`}
                    className="flex items-center gap-4 p-4 rounded-card bg-ink-50 hover:bg-ink-100 transition"
                  >
                    <Avatar
                      fallback={host.displayName}
                      size="lg"
                      className={`bg-gradient-to-br ${host.avatarColor}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-bold text-ink-900">
                          {host.displayName}
                        </h3>
                        {host.tier !== 'free' && (
                          <Badge variant={host.tier === 'pro' ? 'primary' : 'warning'}>
                            {host.tier.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-ink-600 mt-0.5">{host.headline}</p>
                    </div>
                    <User className="w-5 h-5 text-ink-400" />
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar: 報名 + 詳情 */}
          <aside className="space-y-4">
            <Card className="lg:sticky lg:top-20">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-ink-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-ink-700">{event.startTime}</p>
                      {event.endTime && (
                        <p className="text-ink-500 text-xs">~ {event.endTime.split(' ')[1]}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-ink-500 mt-0.5 flex-shrink-0" />
                    <p className="text-ink-700">{event.location}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-ink-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-ink-700">
                        {event.registered} / {event.capacity} 人
                        {fillRate > 80 && (
                          <Badge variant="accent" className="ml-2">快額滿</Badge>
                        )}
                      </p>
                      <div className="mt-2 h-1.5 bg-ink-100 rounded-pill overflow-hidden">
                        <div
                          className="h-full bg-cta-gradient"
                          style={{ width: `${fillRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {event.priceCents === 0 ? (
                    <Badge variant="success" className="bg-green-50 text-green-700">免費</Badge>
                  ) : (
                    <Badge variant="warning" className="bg-amber-50 text-amber-700">
                      NT${(event.priceCents / 100).toLocaleString()}
                    </Badge>
                  )}
                </div>

                <div className="pt-2 border-t border-ink-100">
                  {isFull ? (
                    <Button disabled variant="secondary" className="w-full">
                      已額滿（候補中）
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg">
                      立即報名{!isFree && ` · NT$${(event.priceCents / 100).toLocaleString()}`}
                    </Button>
                  )}
                  {!isFull && spotsLeft <= 5 && (
                    <p className="text-center text-xs text-accent-600 mt-2 font-medium">
                      ⚡ 只剩 {spotsLeft} 個名額
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1">
                    <Heart className="w-4 h-4" />
                    收藏
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4" />
                    分享
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
