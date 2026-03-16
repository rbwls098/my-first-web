// Ch13 개인 프로젝트 — 스타터 코드
// Ch12까지 완성된 블로그를 기반으로 나만의 기능을 확장한다.
// ARCHITECTURE.md의 설계를 바탕으로 페이지와 기능을 추가한다.

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
        <h2 className="text-2xl font-bold mb-6">최신 글</h2>
        {/* TODO: 개인 프로젝트에서 카테고리 필터, 검색, 정렬 등 확장 기능 추가 */}
        <PostList />
      </main>

      <footer className="max-w-4xl mx-auto p-4 mt-8 text-center text-gray-400 text-sm">
        &copy; 2026 내 블로그. All rights reserved.
      </footer>
    </div>
  );
}
