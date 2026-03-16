// Ch5 게시글 작성 페이지 — 모범 구현
// useState로 폼 입력 관리, useRouter로 제출 후 이동
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // 폼 기본 제출 동작 방지
    alert("저장되었습니다 (Ch8에서 실제 저장 구현 예정)");
    router.push("/posts"); // 목록 페이지로 이동
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 제목 입력 */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="게시글 제목을 입력하세요"
            required
          />
        </div>

        {/* 내용 입력 */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="게시글 내용을 입력하세요"
            required
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          등록
        </button>
      </form>
    </div>
  );
}
