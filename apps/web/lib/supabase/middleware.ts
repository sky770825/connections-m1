import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Middleware 用的 Supabase session refresh
 * 自動更新 cookies 中的 JWT
 *
 * 容錯：如果 Supabase URL 是 placeholder（開發階段），跳過 auth refresh
 * 這讓 Sprint 0 純前端測試不需要真實 Supabase project
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

  // 開發 placeholder：跳過 Supabase auth refresh
  if (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl.includes('placeholder') ||
    supabaseKey.includes('placeholder')
  ) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: Array<{
          name: string;
          value: string;
          options?: Record<string, unknown>;
        }>
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh session if needed
  await supabase.auth.getUser();

  return response;
}
