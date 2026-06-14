import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Briefcase, Sparkles, MessageCircle, UserPlus, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_PROFILES } from '@/lib/data/mock-profiles';

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = MOCK_PROFILES.find((p) => p.id === id);

  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar user={{ displayName: '你' }} currentPath="/search" />

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link
          href="/search"
          className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          回到搜尋
        </Link>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar
                fallback={profile.displayName}
                size="xl"
                className={`bg-gradient-to-br ${profile.avatarColor}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-3xl font-bold text-ink-900">
                    {profile.displayName}
                  </h1>
                  {profile.tier !== 'free' && (
                    <Badge variant={profile.tier === 'pro' ? 'primary' : 'warning'}>
                      {profile.tier.toUpperCase()}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-ink-600">{profile.headline}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    {profile.industry}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto">
                  <UserPlus className="w-4 h-4" />
                  發送連線
                </Button>
                <Button variant="secondary" className="w-full sm:w-auto">
                  <MessageCircle className="w-4 h-4" />
                  私訊
                </Button>
              </div>
            </div>

            {profile.bio && (
              <div className="mt-6 pt-6 border-t border-ink-100">
                <h2 className="text-sm font-semibold text-ink-700 mb-2">關於我</h2>
                <p className="text-ink-600 leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            )}

            {profile.skills.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-ink-700 mb-2">技能</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((s) => (
                    <Badge key={s} variant="primary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {profile.tags.length > 0 && (
              <div className="mt-4">
                <h2 className="text-sm font-semibold text-ink-700 mb-2">標籤</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.tags.map((t) => (
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
                  <Sparkles className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-sm font-semibold text-ink-700 mb-1">我想找的人</h2>
                    <p className="text-ink-700 leading-relaxed">{profile.intent}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
