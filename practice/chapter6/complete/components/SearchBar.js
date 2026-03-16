// Ch6 검색바 — 모범 구현
// "use client" Client Component
// useState로 검색어 관리 + filter로 제목 검색

"use client";

import { useState } from "react";

export default function SearchBar({ posts, onFilter }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    // 대소문자 무시하여 제목 검색
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    onFilter(filtered);
  }

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="게시글 검색..."
      className="w-full px-3 py-2 border rounded mb-4"
    />
  );
}
