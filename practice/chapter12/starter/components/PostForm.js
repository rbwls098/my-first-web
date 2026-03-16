// 게시글 작성 폼 — 유효성 검증 없음
// TODO: validate() 함수, 에러 메시지 표시, border-red-500 추가 필요
"use client";

import { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: 유효성 검증 추가
    onSubmit({ title: title.trim(), content: content.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
      </div>
      <div>
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg h-40"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        게시글 작성
      </button>
    </form>
  );
}
