// Ch4 API 연동 블로그 — 스타터 코드
// Ch3 complete 기반 + fetch 스켈레톤
// B회차에서 Copilot을 활용하여 API 연동과 필터/검색을 구현한다.

"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: useEffect 안에서 fetch로 API 데이터를 가져온다
  // API: https://jsonplaceholder.typicode.com/posts
  // async/await 패턴 사용, response.ok 체크, try-catch 에러 처리 포함
  useEffect(() => {
    // Copilot에게 fetch 로직 생성을 요청하세요
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── 헤더 + 내비게이션 ── */}
      <header className="bg-blue-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">내 블로그</h1>
          <div className="flex gap-4">
            <a href="/" className="hover:underline">홈</a>
          </div>
        </nav>
      </header>

      {/* ── 필터/검색 영역 ── */}
      <div className="max-w-4xl mx-auto p-4 mt-4">
        {/* TODO: userId 필터 버튼 추가 */}
        {/* TODO: 제목 검색 input 추가 */}
      </div>

      {/* ── 메인: 게시글 카드 목록 ── */}
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">API 게시글</h2>

        {loading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TODO: posts를 map으로 카드 렌더링 */}
            <p className="text-gray-400">게시글이 여기에 표시됩니다</p>
          </div>
        )}
      </main>

      {/* ── 푸터 ── */}
      <footer className="mt-16 bg-gray-800 text-gray-400 text-center p-6">
        <p className="text-sm">&copy; 2026 내 블로그. All rights reserved.</p>
      </footer>
    </div>
  );
}
