// 내비게이션 바 — 인증 UI 포함
"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const { user } = useAuth();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  return (
    <header className="bg-blue-600 text-white">
      <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold">
          내 블로그
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/posts/new"
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                글쓰기
              </Link>
              <button
                onClick={handleSignOut}
                className="hover:underline text-sm"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              로그인
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
