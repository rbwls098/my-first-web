// Ch8 스타터 — Ch6 완성본 기반 + Supabase 전환 뼈대
// B회차 과제: lib/supabase.js 설정 → posts 테이블 생성 → 더미 데이터를 Supabase 데이터로 교체
// 현재는 lib/posts.js의 더미 데이터를 표시한다.

"use client";

import { useState } from "react";
import Link from "next/link";
import { initialPosts } from "@/lib/posts";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  // TODO: Ch8 과제 — useState(initialPosts) 대신 Supabase에서 데이터를 가져오도록 변경
  // 힌트: useEffect + createClient() + supabase.from("posts").select("*")
  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  // 검색 필터 콜백
  function handleFilter(filtered) {
    setFilteredPosts(filtered);
  }

  // 블로그 글 삭제 (불변성 유지 — filter 사용)
  function handleDelete(id) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // TODO: Ch10 과제 — Supabase delete로 교체
      const updated = posts.filter((post) => post.id !== id);
      setPosts(updated);
      setFilteredPosts(updated);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── 헤더 + 내비게이션 ── */}
      <header className="bg-blue-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">내 블로그</h1>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">홈</Link>
            <Link href="/posts/new" className="hover:underline">글쓰기</Link>
          </div>
        </nav>
      </header>

      {/* ── 메인: 검색 + 블로그 글 목록 ── */}
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">최신 글</h2>

        {/* 검색바 (Client Component) */}
        <SearchBar posts={posts} onFilter={handleFilter} />

        {/* 검색 결과 카운트 */}
        <p className="text-sm text-gray-500 mb-4">
          {filteredPosts.length}개의 글
        </p>

        {/* 검색 결과 없음 */}
        {filteredPosts.length === 0 && (
          <p className="text-gray-400 text-center py-8">검색 결과가 없습니다</p>
        )}

        {/* 블로그 글 카드 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <Link href={`/posts/${post.id}`}>
                <h3 className="text-lg font-bold mb-2 hover:text-blue-500">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div>
                  <span>{post.author}</span>
                  <span className="mx-2">|</span>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  삭제
                </button>
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
