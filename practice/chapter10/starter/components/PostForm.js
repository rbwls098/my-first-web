// 게시글 작성 폼 — TODO: insert 함수 구현 필요
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function PostForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    // TODO: Supabase에 게시글을 생성하세요
    // 힌트: .from("posts").insert({ title, content, user_id: user.id })
    const supabase = createClient();

    // ── 여기에 Supabase insert를 작성하세요 ──

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          제목
        </label>
        <input
          id="title"
          type="text"
          placeholder="게시글 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          내용
        </label>
        <textarea
          id="content"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg h-40"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "작성 중..." : "게시글 작성"}
      </button>
    </form>
  );
}
