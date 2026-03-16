// 로그인/로그아웃 버튼 컴포넌트
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function AuthButton() {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (!user) {
    return (
      <a href="/login" className="hover:underline">
        로그인
      </a>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{user.email}</span>
      <button onClick={handleLogout} className="hover:underline text-sm">
        로그아웃
      </button>
    </div>
  );
}
