'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Save, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function SettingsPage() {
  const router = useRouter();
  const [emailNotif, setEmailNotif] = React.useState(true);
  const [weeklyDigest, setWeeklyDigest] = React.useState(true);
  const [profilePublic, setProfilePublic] = React.useState(true);
  const [showEmail, setShowEmail] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar user={{ displayName: '你' }} currentPath="/settings" />

      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="font-display text-4xl font-bold text-ink-900">設定</h1>
        <p className="mt-1 text-ink-500">管理你的帳號、隱私、通知</p>

        <Tabs defaultValue="account" className="mt-6">
          <TabsList>
            <TabsTrigger value="account">帳號</TabsTrigger>
            <TabsTrigger value="privacy">隱私</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
            <TabsTrigger value="subscription">訂閱</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>帳號資訊</CardTitle>
                <CardDescription>你的 Email 與顯示名稱</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  defaultValue="you@example.com"
                  disabled
                  hint="Email 為登入帳號，無法更改"
                />
                <Input
                  label="顯示名稱"
                  defaultValue="你的名字"
                />
                <div className="flex justify-end">
                  <Button>
                    <Save className="w-4 h-4" />
                    儲存
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-red-600">刪除帳號</CardTitle>
                <CardDescription>
                  永久刪除帳號與所有資料，無法復原
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="danger">
                  <Trash2 className="w-4 h-4" />
                  刪除我的帳號
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>個人檔案隱私</CardTitle>
                <CardDescription>誰可以看到你的資訊</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-ink-50 rounded-button">
                  <div>
                    <p className="font-medium text-ink-900 text-sm">公開個人檔案</p>
                    <p className="text-xs text-ink-500 mt-0.5">其他會員可搜尋到你</p>
                  </div>
                  <Switch checked={profilePublic} onChange={setProfilePublic} />
                </div>
                <div className="flex items-center justify-between p-3 bg-ink-50 rounded-button">
                  <div>
                    <p className="font-medium text-ink-900 text-sm">顯示 Email</p>
                    <p className="text-xs text-ink-500 mt-0.5">已連線會員可看到你的 Email</p>
                  </div>
                  <Switch checked={showEmail} onChange={setShowEmail} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Email 通知</CardTitle>
                <CardDescription>哪些事件要寄 Email 給你</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-ink-50 rounded-button">
                  <div>
                    <p className="font-medium text-ink-900 text-sm">新連線請求</p>
                    <p className="text-xs text-ink-500 mt-0.5">有人想加你為人脈</p>
                  </div>
                  <Switch checked={emailNotif} onChange={setEmailNotif} />
                </div>
                <div className="flex items-center justify-between p-3 bg-ink-50 rounded-button">
                  <div>
                    <p className="font-medium text-ink-900 text-sm">每週配對摘要</p>
                    <p className="text-xs text-ink-500 mt-0.5">每週一寄本週 AI 配對結果</p>
                  </div>
                  <Switch checked={weeklyDigest} onChange={setWeeklyDigest} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>目前方案</CardTitle>
                <CardDescription>Free — 升級解鎖無限功能</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-card bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ink-900">Free</h3>
                      <p className="text-sm text-ink-600 mt-0.5">每月 5 次 AI 配對 · 3 個標籤</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => router.push('/upgrade')}
                >
                  <Sparkles className="w-4 h-4" />
                  升級到 Pro · NT$299/月
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
