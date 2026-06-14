import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

export const metadata = {
  title: '隱私政策 — Connections',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold text-ink-900">隱私政策</h1>
        <p className="mt-2 text-sm text-ink-500">最後更新：2026-06-14</p>

        <div className="mt-8 prose prose-sm max-w-none text-ink-600 space-y-6">
          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">1. 我們收集什麼</h2>
            <p>
              我們只收集你主動提供的資訊：Email、顯示名稱、頭像、自我介紹、技能、標籤、意圖。
              我們不會主動收集你的位置、通訊錄、或其他未經你同意的資料。
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">2. 我們怎麼用你的資料</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>AI 配對：將你的「意圖」和「檔案」做 embedding，與其他會員比對</li>
              <li>搜尋：讓其他會員能用標籤/技能/產業找到你</li>
              <li>通知：Email 通知你新連線、新配對、活動等</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">3. 你的控制權</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>可隨時編輯/刪除你的個人檔案</li>
              <li>可隱藏個人檔案不被搜尋（設定 → 隱私）</li>
              <li>可隨時下載所有你的資料</li>
              <li>可隨時刪除帳號，刪除後 30 天內所有資料從我們系統永久刪除</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">4. 我們不會做的事</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>不會把你的資料賣給第三方</li>
              <li>不會用你的 Email 寄垃圾信</li>
              <li>不會主動聯繫你的通訊錄</li>
              <li>不會顯示你的 Email 給未連線的會員（除非你主動開啟）</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">5. 資料儲存</h2>
            <p>
              你的資料儲存在 Supabase（託管於 AWS Singapore / Tokyo）。
              所有傳輸加密（HTTPS），所有密碼雜湊儲存（bcrypt）。
              我們定期備份，備份保留 30 天。
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">6. 聯絡我們</h2>
            <p>
              有任何隱私問題請 Email 到 <a href="mailto:privacy@connections.app" className="text-primary-600 hover:underline">privacy@connections.app</a>，
              我們會在 7 個工作天內回覆。
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
