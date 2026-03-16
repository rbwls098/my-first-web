// 카테고리 필터 컴포넌트 — Ch13 확장 기능
// 블로그 글을 카테고리별로 필터링한다.
"use client";

import { useState } from "react";

const CATEGORIES = ["전체", "개발", "일상", "학습", "리뷰"];

export default function CategoryFilter({ onSelect }) {
  const [selected, setSelected] = useState("전체");

  function handleClick(category) {
    setSelected(category);
    if (onSelect) onSelect(category === "전체" ? null : category);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-3 py-1 rounded-full text-sm ${
            selected === cat
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
