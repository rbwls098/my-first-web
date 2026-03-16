// Ch8 모범 구현 — Supabase에서 블로그 글을 읽어와 표시하는 페이지
"use client";

import { createClient } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("posts")
        .select("*, profiles(username)")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── 헤더 ── */}
      <header className="bg-blue-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">내 블로그</h1>
          <div className="flex gap-4">
            <a href="/" className="hover:underline">홈</a>
          </div>
        </nav>
      </header>

      {/* ── 메인 ── */}
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">최신 게시글</h2>

        {/* 로딩 상태 */}
        {loading && (
          <p className="text-gray-500">게시글을 불러오는 중...</p>
        )}

        {/* 에러 상태 */}
        {error && (
          <p className="text-red-500">오류: {error}</p>
        )}

        {/* 게시글 목록 */}
        {!loading && !error && posts.length === 0 && (
          <p className="text-gray-500">아직 게시글이 없습니다.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{post.profiles?.username || "익명"}</span>
                <time dateTime={post.created_at}>
                  {new Date(post.created_at).toLocaleDateString("ko-KR")}
                </time>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* ── 푸터 ── */}
      <footer className="mt-16 bg-gray-800 text-gray-400 text-center p-6">
        <p className="text-sm">&copy; 2026 내 블로그. All rights reserved.</p>
      </footer>
    </div>
  );
}
