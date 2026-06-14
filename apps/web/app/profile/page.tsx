import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Briefcase,
  Target,
  Edit3,
  LogOut,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { signOut } from '@/lib/auth/actions';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // 抓自己的 profile（或從 params 抓別人的，預設自己）
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    redirect('/profile/edit?welcome=1');
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold">Connections</span>
          </Link>
          <form action={signOut}>
            <Button type="submit" variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
              登出
            </Button>
          </form>
        </div>

        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl bg-hero-gradient flex items-center justify-center text-white font-display text-3xl font-bold flex-shrink-0">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.display_name}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  profile.display_name?.[0]?.toUpperCase() ?? '?'
                )}
              </div>

              {/* Main info */}
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-3xl font-bold text-ink-900">
                  {profile.display_name}
                </h1>
                {profile.headline && (
                  <p className="mt-1 text-ink-600">{profile.headline}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink-500">
                  {profile.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </span>
                  )}
                  {profile.industry && (
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      {profile.industry}
                    </span>
                  )}
                </div>
              </div>

              <Link href="/profile/edit">
                <Button variant="secondary">
                  <Edit3 className="w-4 h-4" />
                  編輯
                </Button>
              </Link>
            </div>

            {profile.bio && (
              <div className="mt-6 pt-6 border-t border-ink-100">
                <h2 className="text-sm font-semibold text-ink-700 mb-2">
                  關於我
                </h2>
                <p className="text-ink-600 leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            )}

            {profile.skills?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-ink-700 mb-2">
                  技能
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((s: string) => (
                    <Badge key={s} variant="primary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {profile.tags?.length > 0 && (
              <div className="mt-4">
                <h2 className="text-sm font-semibold text-ink-700 mb-2">
                  標籤（用於 AI 配對）
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.tags.map((t: string) => (
                    <Badge key={t} variant="accent">
                      #{t}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {profile.intent && (
              <div className="mt-6 p-4 rounded-card bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100">
                <div className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-sm font-semibold text-ink-700 mb-1">
                      我想找的人
                    </h2>
                    <p className="text-ink-700 leading-relaxed">
                      {profile.intent}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
