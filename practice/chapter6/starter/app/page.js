// Ch6 블로그 메인 페이지 — 스타터 코드
// Ch5 완성 코드 기반 + 상태 관리 뼈대
// B회차에서 검색, 삭제 기능을 추가한다

import Link from "next/link";
import { initialPosts } from "@/lib/posts";

// TODO: SearchBar Client Component를 import하여 검색 기능 추가
// import SearchBar from "@/components/SearchBar";

export default function Home() {
  const posts = initialPosts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── 헤더 + 내비게이션 ── */}
      <header className="bg-blue-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">내 블로그</h1>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">홈</Link>
            <Link href="/posts/new" className="hover:underline">글쓰기</Link>
            <Link href="/login" className="hover:underline">로그인</Link>
          </div>
        </nav>
      </header>

      {/* ── 메인: 게시글 목록 ── */}
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">최신 게시글</h2>

        {/* TODO: SearchBar 컴포넌트 추가 */}

        {/* 게시글 카드 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <Link href={`/posts/${post.id}`}>
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
              </Link>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{post.author}</span>
                <time dateTime={post.date}>{post.date}</time>
              </div>
              {/* TODO: 삭제 버튼 추가 */}
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
