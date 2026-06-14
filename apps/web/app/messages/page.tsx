'use client';

import * as React from 'react';
import Link from 'next/link';
import { Send, MessageCircle, MoreVertical } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MOCK_PROFILES } from '@/lib/data/mock-profiles';

interface MockMessage { id: string; fromId: string; toId: string; content: string; sentAt: string; read: boolean; }

const CURRENT_USER_ID = 'mock-current';

const MOCK_CONVERSATIONS: Record<string, MockMessage[]> = {
  'mock-1': [
    { id: 'm1', fromId: 'mock-1', toId: CURRENT_USER_ID, content: '嗨！看到你也在做東南亞市場，要不要約個咖啡聊聊？', sentAt: '10:30', read: true },
    { id: 'm2', fromId: CURRENT_USER_ID, toId: 'mock-1', content: '好啊！這週三下午可以嗎？我在信義區', sentAt: '10:45', read: true },
    { id: 'm3', fromId: 'mock-1', toId: CURRENT_USER_ID, content: '週三可以！3 點在 ATT 的 Starbucks？', sentAt: '11:02', read: true },
    { id: 'm4', fromId: 'mock-1', toId: CURRENT_USER_ID, content: '剛好我這週要去新加坡，要不要幫你問問當地 KOL？', sentAt: '14:22', read: false },
  ],
  'mock-2': [{ id: 'm5', fromId: 'mock-2', toId: CURRENT_USER_ID, content: '我們正在看 A 輪的 Fintech 案，方便介紹嗎？', sentAt: '昨天', read: true }],
  'mock-4': [
    { id: 'm6', fromId: 'mock-4', toId: CURRENT_USER_ID, content: 'Hi, 我看了你的 profile，我們的客戶應該有興趣', sentAt: '3 天前', read: true },
    { id: 'm7', fromId: CURRENT_USER_ID, toId: 'mock-4', content: '好呀，什麼時候方便聊聊？', sentAt: '3 天前', read: true },
  ],
};

export default function MessagesPage() {
  const [selectedId, setSelectedId] = React.useState<string | null>('mock-1');
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState(MOCK_CONVERSATIONS);

  const selected = selectedId ? MOCK_PROFILES.find((p) => p.id === selectedId) : null;
  const conversation = selectedId ? messages[selectedId] ?? [] : [];

  const send = () => {
    if (!selectedId || !input.trim()) return;
    const newMsg: MockMessage = { id: `m${Date.now()}`, fromId: CURRENT_USER_ID, toId: selectedId, content: input.trim(), sentAt: '剛剛', read: true };
    setMessages((p) => ({ ...p, [selectedId]: [...(p[selectedId] ?? []), newMsg] }));
    setInput('');
    setTimeout(() => {
      const reply: MockMessage = { id: `m${Date.now() + 1}`, fromId: selectedId, toId: CURRENT_USER_ID, content: '收到！', sentAt: '剛剛', read: false };
      setMessages((p) => ({ ...p, [selectedId]: [...(p[selectedId] ?? []), reply] }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar user={{ displayName: '你' }} currentPath="/messages" />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 mb-4">私訊</h1>
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-[300px_1fr] h-[600px]">
            <aside className="border-r border-ink-200 overflow-y-auto">
              <div className="p-3 border-b border-ink-100"><Input placeholder="搜尋對話..." className="text-sm" /></div>
              <div>
                {Object.keys(MOCK_CONVERSATIONS).map((id) => {
                  const p = MOCK_PROFILES.find((mp) => mp.id === id);
                  if (!p) return null;
                  const lastMsg = MOCK_CONVERSATIONS[id][MOCK_CONVERSATIONS[id].length - 1];
                  const unread = MOCK_CONVERSATIONS[id].filter((m) => !m.read && m.toId === CURRENT_USER_ID).length;
                  return (
                    <button key={id} onClick={() => setSelectedId(id)} className={`w-full text-left p-3 flex items-start gap-3 hover:bg-ink-50 border-b border-ink-100 transition ${selectedId === id ? 'bg-primary-50' : ''}`}>
                      <Avatar fallback={p.displayName} size="md" className={`bg-gradient-to-br ${p.avatarColor}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-ink-900 text-sm truncate">{p.displayName}</p>
                          <span className="text-xs text-ink-400">{lastMsg.sentAt}</span>
                        </div>
                        <p className="text-xs text-ink-500 truncate mt-0.5">{lastMsg.content}</p>
                      </div>
                      {unread > 0 && <div className="w-2 h-2 rounded-full bg-accent-500 mt-2" />}
                    </button>
                  );
                })}
              </div>
            </aside>
            <main className="flex flex-col">
              {selected ? (
                <>
                  <div className="p-4 border-b border-ink-200 flex items-center gap-3">
                    <Avatar fallback={selected.displayName} size="md" className={`bg-gradient-to-br ${selected.avatarColor}`} />
                    <div className="flex-1 min-w-0">
                      <Link href={`/u/${selected.id}`} className="font-display font-bold text-ink-900 hover:text-primary-600">{selected.displayName}</Link>
                      <p className="text-xs text-ink-500">{selected.headline}</p>
                    </div>
                    <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {conversation.map((msg) => {
                      const isMe = msg.fromId === CURRENT_USER_ID;
                      return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] px-4 py-2 rounded-button ${isMe ? 'bg-cta-gradient text-white' : 'bg-white border border-ink-200 text-ink-900'}`}>
                            <p className="text-sm">{msg.content}</p>
                            <p className={`text-xs mt-1 ${isMe ? 'text-white/70' : 'text-ink-400'}`}>{msg.sentAt}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 border-t border-ink-200 flex items-center gap-2">
                    <Input placeholder="輸入訊息..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} className="flex-1" />
                    <Button onClick={send} disabled={!input.trim()}><Send className="w-4 h-4" /></Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                    <p className="text-ink-500">選擇一個對話開始聊天</p>
                  </div>
                </div>
              )}
            </main>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
