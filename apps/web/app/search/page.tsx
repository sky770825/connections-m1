'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search as SearchIcon, MapPin, Briefcase, Sparkles, Filter } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_PROFILES, type MockProfile } from '@/lib/data/mock-profiles';

const ALL_TAGS = Array.from(
  new Set(MOCK_PROFILES.flatMap((p) => p.tags))
).sort();

const ALL_INDUSTRIES = Array.from(
  new Set(MOCK_PROFILES.map((p) => p.industry))
).sort();

export default function SearchPage() {
  const [query, setQuery] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<MockProfile[]>(MOCK_PROFILES);

  // 模擬搜尋（含 FTS 行為）
  React.useEffect(() => {
    let r = MOCK_PROFILES;
    if (query) {
      const q = query.toLowerCase();
      r = r.filter(
        (p) =>
          p.displayName.toLowerCase().includes(q) ||
          p.headline.toLowerCase().includes(q) ||
          p.bio.toLowerCase().includes(q) ||
          p.skills.some((s) => s.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedTags.length > 0) {
      r = r.filter((p) => selectedTags.every((t) => p.tags.includes(t)));
    }
    if (selectedIndustry) {
      r = r.filter((p) => p.industry === selectedIndustry);
    }
    setResults(r);
  }, [query, selectedTags, selectedIndustry]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-primary-50/20">
      <Navbar user={{ displayName: '你' }} currentPath="/search" />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* 搜尋框 */}
        <div className="mb-6">
          <h1 className="font-display text-4xl font-bold text-ink-900">搜尋人脈</h1>
          <p className="mt-1 text-ink-500">
            用關鍵字、標籤、產業搜尋平台上的會員
          </p>
        </div>

        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋姓名、技能、標籤、意圖..."
            className="w-full pl-12 pr-4 py-3.5 text-base text-ink-900 bg-white border border-ink-200 rounded-button focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
          />
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Filters */}
          <aside>
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-semibold text-ink-900 mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> 篩選
                </h2>

                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-ink-500 uppercase mb-2">產業</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedIndustry(null)}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-button ${
                        !selectedIndustry
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-ink-600 hover:bg-ink-100'
                      }`}
                    >
                      全部
                    </button>
                    {ALL_INDUSTRIES.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setSelectedIndustry(ind)}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-button ${
                          selectedIndustry === ind
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'text-ink-600 hover:bg-ink-100'
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-ink-500 uppercase mb-2">標籤</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-2 py-1 rounded-pill border transition ${
                          selectedTags.includes(tag)
                            ? 'bg-primary-100 border-primary-300 text-primary-700'
                            : 'bg-white border-ink-200 text-ink-600 hover:border-primary-300'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <main>
            <div className="mb-4 text-sm text-ink-500">
              找到 <span className="font-semibold text-ink-900">{results.length}</span> 個結果
              {query && (
                <>
                  {' '}符合「<span className="font-semibold text-ink-900">{query}</span>」
                </>
              )}
            </div>

            {results.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <SearchIcon className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                  <h3 className="font-display text-xl font-bold text-ink-900">沒有符合的結果</h3>
                  <p className="mt-1 text-ink-500 text-sm">試試放寬篩選條件或更換關鍵字</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {results.map((p) => (
                  <Link key={p.id} href={`/u/${p.id}`}>
                    <Card className="hover:shadow-xl hover:scale-[1.01] transition-all h-full">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Avatar
                            fallback={p.displayName}
                            size="lg"
                            className={`bg-gradient-to-br ${p.avatarColor}`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-display text-lg font-bold text-ink-900 truncate">
                                {p.displayName}
                              </h3>
                              {p.tier !== 'free' && (
                                <Badge variant={p.tier === 'pro' ? 'primary' : 'warning'}>
                                  {p.tier.toUpperCase()}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-ink-600 line-clamp-2">{p.headline}</p>
                            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-500">
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3 h-3" />
                                {p.industry}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {p.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        {p.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.tags.slice(0, 4).map((t) => (
                              <Badge key={t} variant="accent">
                                #{t}
                              </Badge>
                            ))}
                            {p.tags.length > 4 && (
                              <span className="text-xs text-ink-400">+{p.tags.length - 4}</span>
                            )}
                          </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-primary-600">
                            <Sparkles className="w-3.5 h-3.5" />
                            配對契合度高
                          </div>
                          <Button size="sm" variant="ghost">
                            查看 →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
