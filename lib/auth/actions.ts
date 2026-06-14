'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type AuthState = {
  error?: string;
  success?: string;
};

/* ============================================
   Email 密碼註冊
   ============================================ */
export async function signUpWithEmail(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();
  const displayName = formData.get('displayName')?.toString().trim();

  if (!email || !password || !displayName) {
    return { error: '請填寫所有欄位' };
  }

  if (password.length < 8) {
    return { error: '密碼至少 8 個字元' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/profile/edit?welcome=1');
}

/* ============================================
   Email 密碼登入
   ============================================ */
export async function signInWithEmail(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: '請填寫 Email 與密碼' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: 'Email 或密碼錯誤' };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

/* ============================================
   Google OAuth
   ============================================ */
export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) {
    redirect(data.url);
  }
}

/* ============================================
   登出
   ============================================ */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}
