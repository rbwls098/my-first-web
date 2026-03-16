// 게시글 작성 폼 — 모범 구현
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
    const supabase = createClient();
    const { error } = await supabase
      .from("posts")
      .insert({
        title: title.trim(),
        content: content.trim(),
        user_id: user.id,
      });

    if (error) {
      alert("작성 실패: " + error.message);
    } else {
      router.push("/");
    }
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
