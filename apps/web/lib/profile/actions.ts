'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export type ProfileState = {
  error?: string;
  success?: string;
};

export async function updateProfile(
  prevState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: '未登入' };

  const update = {
    display_name: formData.get('displayName')?.toString().trim() ?? '',
    headline: formData.get('headline')?.toString().trim() ?? '',
    bio: formData.get('bio')?.toString().trim() ?? '',
    industry: formData.get('industry')?.toString().trim() ?? '',
    location: formData.get('location')?.toString().trim() ?? '',
    skills: parseList(formData.get('skills')?.toString()),
    tags: parseList(formData.get('tags')?.toString()),
    intent: formData.get('intent')?.toString().trim() ?? '',
    avatar_url: formData.get('avatarUrl')?.toString().trim() || null,
  };

  // 驗證
  if (!update.display_name) {
    return { error: '顯示名稱不能為空' };
  }
  if (update.skills.length === 0) {
    return { error: '至少填寫 1 個技能' };
  }
  if (update.tags.length === 0) {
    return { error: '至少填寫 1 個標籤（用於 AI 配對）' };
  }

  // 觸發重新生成 embedding
  update.intent && (await regenerateEmbedding(user.id));

  const { error } = await supabase
    .from('profiles')
    .update(update)
    .eq('id', user.id);

  if (error) return { error: error.message };

  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: '個人檔案已更新' };
}

function parseList(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/[,\n,，]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * 重新生成 user 的 embedding
 * Server-only — 呼叫 OpenAI API
 */
async function regenerateEmbedding(userId: string) {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('bio, skills, tags, industry, intent')
    .eq('id', userId)
    .single();

  if (!profile) return;

  // 組合成一個文本做 embedding
  const text = [
    profile.bio,
    `技能: ${(profile.skills ?? []).join(', ')}`,
    `標籤: ${(profile.tags ?? []).join(', ')}`,
    `產業: ${profile.industry ?? ''}`,
    `意圖: ${profile.intent ?? ''}`,
  ]
    .filter(Boolean)
    .join('\n');

  if (!text.trim()) return;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('OPENAI_API_KEY not set, skip embedding');
    return;
  }

  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_EMBEDDING_MODEL ?? 'text-embedding-3-small',
      input: text,
      dimensions: parseInt(
        process.env.OPENAI_EMBEDDING_DIMENSIONS ?? '512',
        10
      ),
    }),
  });

  if (!res.ok) {
    console.error('OpenAI embedding failed', await res.text());
    return;
  }

  const data = await res.json();
  const embedding = data.data?.[0]?.embedding;

  if (embedding) {
    await supabase
      .from('profiles')
      .update({ embedding })
      .eq('id', userId);
  }
}
