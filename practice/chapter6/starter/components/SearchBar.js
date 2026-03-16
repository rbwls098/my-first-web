// Ch6 검색바 — 스타터 코드
// "use client" Client Component로 분리
// B회차에서 useState + filter 검색 기능을 완성한다

"use client";

import { useState } from "react";

export default function SearchBar({ posts, onFilter }) {
  const [query, setQuery] = useState("");

  // TODO: handleChange 함수 구현
  // 1. setQuery로 검색어 상태 업데이트
  // 2. posts.filter()로 제목 검색
  // 3. onFilter 콜백으로 필터된 결과 전달

  return (
    <input
      type="text"
      value={query}
      onChange={() => {}} // TODO: handleChange 연결
      placeholder="게시글 검색..."
      className="w-full px-3 py-2 border rounded mb-4"
    />
  );
}
