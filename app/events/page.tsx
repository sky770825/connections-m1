import Link from 'next/link';
import { Calendar, MapPin, Users, Clock, ArrowRight, Plus } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Illustration } from '@/components/ui/illustration';
import { MOCK_PROFILES } from '@/lib/data/mock-profiles';

interface MockEvent {
  id: string; title: string; description: string; hostId: string;
  startTime: string; endTime?: string; location: string;
  capacity: number; registered: number; priceCents: number;
  coverGradient: string; tags: string[];
}

const MOCK_EVENTS: MockEvent[] = [
  { id: 'evt-1', title: '台灣跨境電商東南亞市場進入策略', description: '邀請 5 位深耕東南亞市場的台灣創業家，分享進入印尼/越南/泰國的實戰經驗與踩坑教訓。', hostId: 'mock-1', startTime: '2026-07-15 19:00', endTime: '21:30', location: '台北市信義區 · CLBC 大安會議中心', capacity: 50, registered: 32, priceCents: 0, coverGradient: 'from-primary-500 to-accent-500', tags: ['東南亞', '跨境電商', '市場進入'] },
  { id: 'evt-2', title: 'A 輪募資實戰工作坊（小型私密）', description: '8 位已成功募 A 輪的創業者 + 5 位創投合夥人，限額 30 人。準備 pitch deck 的可帶來 1:1 點評。', hostId: 'mock-2', startTime: '2026-07-20 14:00', endTime: '17:00', location: '台北市松山區 · 影響力學院', capacity: 30, registered: 28, priceCents: 50000, coverGradient: 'from-accent-500 to-rose-500', tags: ['創投', '募資', 'Workshop'] },
  { id: 'evt-3', title: '日本市場進入 × 樂天/Amazon Japan 上架攻略', description: 'Yuki Tanaka 主講。從市場研究、當地化、上架流程到物流金流，一次搞懂日本電商進入。', hostId: 'mock-5', startTime: '2026-08-05 19:30', endTime: '21:00', location: '線上（Zoom）', capacity: 200, registered: 87, priceCents: 30000, coverGradient: 'from-cyan-500 to-purple-500', tags: ['日本市場', '跨境電商', '線上'] },
  { id: 'evt-4', title: '女性創業 D2C 品牌共學小聚', description: '張雅雯主持。每位參加者 5 分鐘分享自己的 D2C 品牌，互相給反饋。每月一次。', hostId: 'mock-6', startTime: '2026-07-25 10:00', endTime: '12:00', location: '台北市大安區 · 美好咖啡', capacity: 15, registered: 12, priceCents: 20000, coverGradient: 'from-rose-500 to-pink-500', tags: ['女性創業', 'D2C', '小聚'] },
];

const COVER_MAP: Record<string, 'event-ecommerce' | 'event-funding' | 'event-japan' | 'event-women'> = {
  'evt-1': 'event-ecommerce',
  'evt-2': 'event-funding',
  'evt-3': 'event-japan',
  'evt-4': 'event-women',
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar user={{ displayName: '你' }} currentPath="/events" />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-4xl font-bold text-ink-900">商務活動</h1>
            <p className="mt-1 text-ink-500">跨境商務人脈聚會、workshop、主題分享</p>
          </div>
          <Button><Plus className="w-4 h-4" />發布活動</Button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {['全部', '免費', '付費', '線上', '台北', '東南亞', '日本'].map((t, i) => (
            <button key={t} className={`px-3 py-1.5 text-sm rounded-pill border transition ${i === 0 ? 'bg-primary-50 border-primary-300 text-primary-700' : 'bg-white border-ink-200 text-ink-600 hover:border-primary-300'}`}>{t}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {MOCK_EVENTS.map((evt) => {
            const host = MOCK_PROFILES.find((p) => p.id === evt.hostId);
            const isFull = evt.registered >= evt.capacity;
            const fillRate = (evt.registered / evt.capacity) * 100;
            const isFree = evt.priceCents === 0;
            return (
              <Card key={evt.id} className="hover:shadow-2xl transition overflow-hidden">
                {/* 封面 */}
                <div className="h-32 relative">
                  <Illustration variant={COVER_MAP[evt.id]} />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {isFree ? (
                      <Badge variant="success" className="bg-white/90 text-green-700">免費</Badge>
                    ) : (
                      <Badge variant="warning" className="bg-white/90 text-amber-700">
                        NT${(evt.priceCents / 100).toLocaleString()}
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="pt-6">
                  <h2 className="font-display text-xl font-bold text-ink-900 line-clamp-2">{evt.title}</h2>
                  <p className="mt-2 text-sm text-ink-600 line-clamp-2">{evt.description}</p>

                  <div className="mt-4 space-y-2 text-sm text-ink-500">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{evt.startTime} {evt.endTime && `~ ${evt.endTime.split(' ')[1]}`}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{evt.location}</span></div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>{evt.registered} / {evt.capacity} 人 {fillRate > 80 && <span className="text-accent-600 font-medium">（快額滿）</span>}</span></div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {evt.tags.map((t) => <Badge key={t} variant="accent">#{t}</Badge>)}
                  </div>

                  {host && (
                    <div className="mt-4 pt-4 border-t border-ink-100 flex items-center gap-2">
                      <Avatar fallback={host.displayName} size="sm" className={`bg-gradient-to-br ${host.avatarColor}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-ink-500">主辦人</p>
                        <p className="text-sm font-medium text-ink-900 truncate">{host.displayName}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    {isFull ? <Button disabled variant="secondary" className="w-full">已額滿（候補中）</Button> : <Button className="w-full">立即報名<ArrowRight className="w-4 h-4" /></Button>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
