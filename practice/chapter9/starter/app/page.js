// Ch9 스타터 — Ch8 완성본 기반 + 인증 뼈대
"use client";

import { createClient } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

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
      {/* ── 네비게이션 바 (인증 UI 포함) ── */}
      <Navbar />

      {/* ── 메인 ── */}
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">최신 게시글</h2>

        {loading && <p className="text-gray-500">게시글을 불러오는 중...</p>}
        {error && <p className="text-red-500">오류: {error}</p>}
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
