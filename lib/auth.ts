import { createClient } from './supabase/client';

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error || !data.user) return { data, error };

  // 프로필 자동 생성을 시도합니다. (이미 존재할 경우 upsert로 덮어쓰거나 무시)
  await supabase.from('profiles').upsert({
    id: data.user.id,
    username: name,
  });

  return { data, error };
}

export async function signOut() {
  const supabase = createClient();
  return await supabase.auth.signOut();
}
