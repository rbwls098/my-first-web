// Ch12 블로그 메인 페이지 — 모범 구현
// error.js, loading.js, 폼 유효성 검증, next/image, metadata 적용

import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">내 블로그</h1>
          <div className="flex gap-4">
            <a href="/" className="hover:underline">홈</a>
            <a href="/posts/new" className="hover:underline">글쓰기</a>
            <a href="/login" className="hover:underline">로그인</a>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">최신 게시글</h2>
        <PostList />
      </main>

      <footer className="max-w-4xl mx-auto p-4 mt-8 text-center text-gray-400 text-sm">
        &copy; 2026 내 블로그. All rights reserved.
      </footer>
    </div>
  );
}
