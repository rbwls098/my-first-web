// 게시글 상세 페이지 — TODO: 조회/삭제 구현 필요
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    // TODO: Supabase에서 단일 게시글을 조회하세요
    // 힌트: .from("posts").select("*, profiles(username)").eq("id", id).single()
    const supabase = createClient();

    // ── 여기에 Supabase 쿼리를 작성하세요 ──

    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    // TODO: Supabase에서 게시글을 삭제하세요
    // 힌트: .from("posts").delete().eq("id", id)
    const supabase = createClient();

    // ── 여기에 Supabase delete를 작성하세요 ──
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

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto p-4 mt-8">
          <p>게시글을 찾을 수 없습니다.</p>
          <Link href="/" className="text-blue-500 hover:underline">
            목록으로
          </Link>
        </main>
      </div>
    );
  }

  const isAuthor = user && user.id === post.user_id;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <article className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-6">
            {post.profiles?.username} ·{" "}
            {new Date(post.created_at).toLocaleDateString()}
          </p>
          <div className="prose max-w-none mb-8">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* 본인 글일 때만 수정/삭제 버튼 표시 */}
          {isAuthor && (
            <div className="flex gap-2 border-t pt-4">
              <Link
                href={`/posts/${post.id}/edit`}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                수정
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-red-500 hover:text-red-700"
              >
                삭제
              </button>
            </div>
          )}
        </article>
        <Link
          href="/"
          className="inline-block mt-4 text-blue-500 hover:underline"
        >
          목록으로
        </Link>
      </main>
    </div>
  );
}
