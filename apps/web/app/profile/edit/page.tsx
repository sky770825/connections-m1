import { Suspense } from 'react';
import ProfileEditForm from './ProfileEditForm';

export const metadata = {
  title: '編輯個人檔案 — Connections',
};

// 避免整頁 CSR bailout — 保留 SSG
export default function ProfileEditPage() {
  return (
    <Suspense fallback={<ProfileEditLoading />}>
      <ProfileEditForm />
    </Suspense>
  );
}

function ProfileEditLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20 flex items-center justify-center">
      <div className="text-ink-500">載入中...</div>
    </main>
  );
}
