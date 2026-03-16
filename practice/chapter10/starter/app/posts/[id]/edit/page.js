// 게시글 수정 페이지 — TODO: 조회/수정 구현 필요
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    // TODO: 기존 게시글 데이터를 조회하여 폼에 채우세요
    const supabase = createClient();

    // ── 여기에 Supabase 쿼리를 작성하세요 ──

    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSaving(true);

    // TODO: Supabase에서 게시글을 수정하세요
    // 힌트: .from("posts").update({ title, content }).eq("id", id)
    const supabase = createClient();

    // ── 여기에 Supabase update를 작성하세요 ──

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto p-4 mt-8">
          <p>로딩 중...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">게시글 수정</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium mb-1"
            >
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border rounded-lg h-40"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {saving ? "저장 중..." : "수정 완료"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
