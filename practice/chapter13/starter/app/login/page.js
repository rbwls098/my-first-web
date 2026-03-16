// 로그인 페이지 — Google OAuth
"use client";

import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  async function handleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <h1 className="text-2xl font-bold">로그인</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Google로 로그인
      </button>
    </div>
  );
}
