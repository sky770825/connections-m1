import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

export const metadata = {
  title: '服務條款 — Connections',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold text-ink-900">服務條款</h1>
        <p className="mt-2 text-sm text-ink-500">最後更新：2026-06-14</p>

        <div className="mt-8 prose prose-sm max-w-none text-ink-600 space-y-6">
          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">1. 接受條款</h2>
            <p>
              使用 Connections 即代表你同意這些條款。
              如果你不同意，請停止使用並刪除帳號。
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">2. 帳號責任</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>你必須提供真實的 Email 與個人資訊</li>
              <li>你必須保管好密碼，帳號被盜用需自行負責</li>
              <li>你不能冒充他人或建立假帳號</li>
              <li>你不能騷擾、霸凌、發送垃圾訊息</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">3. 訂閱與退款</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pro 訂閱 NT$299/月，企業 NT$899/月，可隨時取消</li>
              <li>取消後仍可使用到當期結束</li>
              <li>首次訂閱 7 天內全額退款，之後不退款</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">4. 平台免責</h2>
            <p>
              Connections 是媒合平台，不對會員之間的實際交易、合作、投資結果負責。
              請自行判斷合作對象的信用與實力。
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">5. 內容授權</h2>
            <p>
              你保留自己發布內容的版權，但同意授予 Connections 平台展示、推廣、改編的權利（僅限於平台內）。
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-900">6. 條款修改</h2>
            <p>
              我們可能更新條款，更新前 30 天會 Email 通知。
              繼續使用即代表同意新條款。
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
