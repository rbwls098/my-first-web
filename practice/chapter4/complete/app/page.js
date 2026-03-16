// Ch4 API 연동 블로그 — 모범 구현
// 과제 요구사항: JSONPlaceholder API + userId 필터 + 제목 검색

"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // 상태 관리: 원본 데이터와 표시용 데이터를 분리
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API에서 게시글 가져오기 (async/await + 에러 처리)
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        // HTTP 에러 체크 (fetch는 404/500에서 예외를 던지지 않는다)
        if (!response.ok) {
          throw new Error(`HTTP 에러: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // 필터 + 검색 동시 적용
  useEffect(() => {
    let result = posts;

    // userId 필터 적용
    if (selectedUser !== null) {
      result = result.filter((post) => post.userId === selectedUser);
    }

    // 검색어 필터 적용 (대소문자 무관)
    if (searchTerm.trim() !== "") {
      result = result.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(result);
  }, [posts, selectedUser, searchTerm]);

  // 고유한 userId 목록 추출
  const userIds = [...new Set(posts.map((post) => post.userId))].sort(
    (a, b) => a - b
  );

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">
            데이터를 불러오지 못했습니다
          </p>
          <p className="text-gray-400 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── 헤더 + 내비게이션 ── */}
      <header className="bg-blue-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">내 블로그</h1>
          <div className="flex gap-4">
            <a href="/" className="hover:underline">
              홈
            </a>
          </div>
        </nav>
      </header>

      {/* ── 필터 + 검색 영역 ── */}
      <div className="max-w-4xl mx-auto p-4 mt-4 space-y-4">
        {/* userId 필터 버튼 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedUser(null)}
            className={`px-3 py-1 rounded text-sm ${
              selectedUser === null
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            전체
          </button>
          {userIds.map((userId) => (
            <button
              key={userId}
              onClick={() => setSelectedUser(userId)}
              className={`px-3 py-1 rounded text-sm ${
                selectedUser === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              User {userId}
            </button>
          ))}
        </div>

        {/* 제목 검색 */}
        <input
          type="text"
          placeholder="제목으로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ── 메인: 게시글 카드 목록 ── */}
      <main className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">API 게시글</h2>
          <span className="text-sm text-gray-500">
            {filteredPosts.length}개의 게시글
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            검색 결과가 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.slice(0, 20).map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    User {post.userId}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.body}</p>
              </article>
            ))}
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
