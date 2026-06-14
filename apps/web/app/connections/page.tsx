'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, Check, X, Clock, UserPlus, MessageCircle, MapPin, Briefcase } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MOCK_PROFILES } from '@/lib/data/mock-profiles';

type Status = 'pending-sent' | 'pending-received' | 'connected' | 'suggested';

interface ConnectionItem {
  id: string;
  profile: (typeof MOCK_PROFILES)[number];
  status: Status;
  message?: string;
  sentAt: string;
}

const MOCK_CONNECTIONS: ConnectionItem[] = [
  { id: 'c1', profile: MOCK_PROFILES[1], status: 'pending-received', message: '看到你的 profile，想認識你聊聊 A 輪募資的可能性', sentAt: '2 小時前' },
  { id: 'c2', profile: MOCK_PROFILES[5], status: 'pending-received', message: '我也是天使投資人，希望可以交流', sentAt: '昨天' },
  { id: 'c3', profile: MOCK_PROFILES[2], status: 'pending-sent', message: 'Hi Sarah, 我正在做 Web3 進入台灣市場的策略', sentAt: '3 天前' },
  { id: 'c4', profile: MOCK_PROFILES[0], status: 'connected', sentAt: '1 週前' },
  { id: 'c5', profile: MOCK_PROFILES[4], status: 'connected', sentAt: '2 週前' },
  { id: 'c6', profile: MOCK_PROFILES[3], status: 'suggested', sentAt: 'AI 配對推薦' },
];

export default function ConnectionsPage() {
  const [items, setItems] = React.useState(MOCK_CONNECTIONS);
  const accept = (id: string) => setItems((p) => p.map((c) => (c.id === id ? { ...c, status: 'connected' as Status } : c)));
  const reject = (id: string) => setItems((p) => p.filter((c) => c.id !== id));

  const received = items.filter((c) => c.status === 'pending-received');
  const sent = items.filter((c) => c.status === 'pending-sent');
  const connected = items.filter((c) => c.status === 'connected');
  const suggested = items.filter((c) => c.status === 'suggested');

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar user={{ displayName: '你' }} currentPath="/connections" />
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="font-display text-4xl font-bold text-ink-900">我的連線</h1>
        <p className="mt-1 text-ink-500">管理收到的邀請、已發出的請求、已建立的關係</p>

        <Tabs defaultValue="received" className="mt-6">
          <TabsList>
            <TabsTrigger value="received">收到的邀請 {received.length > 0 && <span className="ml-1.5 px-1.5 py-0.5 rounded-pill bg-accent-500 text-white text-xs">{received.length}</span>}</TabsTrigger>
            <TabsTrigger value="sent">已發出 ({sent.length})</TabsTrigger>
            <TabsTrigger value="connected">已連線 ({connected.length})</TabsTrigger>
            <TabsTrigger value="suggested">AI 推薦 ({suggested.length})</TabsTrigger>
          </TabsList>
          {[
            { value: 'received', list: received },
            { value: 'sent', list: sent },
            { value: 'connected', list: connected },
            { value: 'suggested', list: suggested },
          ].map(({ value, list }) => (
            <TabsContent key={value} value={value}>
              <div className="space-y-3">
                {list.length === 0 ? (
                  <Card><CardContent className="py-12 text-center">
                    <Sparkles className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                    <h3 className="font-display text-xl font-bold text-ink-900">沒有資料</h3>
                  </CardContent></Card>
                ) : list.map((c) => (
                  <Card key={c.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <Link href={`/u/${c.profile.id}`}>
                          <Avatar fallback={c.profile.displayName} size="lg" className={`bg-gradient-to-br ${c.profile.avatarColor}`} />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link href={`/u/${c.profile.id}`} className="font-display text-lg font-bold text-ink-900 hover:text-primary-600">{c.profile.displayName}</Link>
                            {c.profile.tier !== 'free' && <Badge variant={c.profile.tier === 'pro' ? 'primary' : 'warning'}>{c.profile.tier.toUpperCase()}</Badge>}
                            <span className="text-xs text-ink-400">· {c.sentAt}</span>
                          </div>
                          <p className="text-sm text-ink-600 mt-0.5">{c.profile.headline}</p>
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-500">
                            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{c.profile.industry}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.profile.location}</span>
                          </div>
                          {c.message && <div className="mt-3 p-3 rounded-button bg-ink-50 border border-ink-100"><p className="text-sm text-ink-700 italic">「{c.message}」</p></div>}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          {c.status === 'pending-received' && (
                            <>
                              <Button onClick={() => accept(c.id)} size="sm"><Check className="w-4 h-4" />接受</Button>
                              <Button onClick={() => reject(c.id)} variant="secondary" size="sm"><X className="w-4 h-4" />拒絕</Button>
                            </>
                          )}
                          {c.status === 'pending-sent' && <Badge variant="default"><Clock className="w-3 h-3 mr-1" />等待回覆</Badge>}
                          {c.status === 'connected' && (
                            <>
                              <Link href="/messages"><Button size="sm" variant="primary"><MessageCircle className="w-4 h-4" />私訊</Button></Link>
                              <Link href={`/u/${c.profile.id}`}><Button size="sm" variant="secondary">查看</Button></Link>
                            </>
                          )}
                          {c.status === 'suggested' && <Button size="sm"><UserPlus className="w-4 h-4" />發送連線</Button>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
