// Ch6 게시글 작성 페이지 — 스타터 코드
// B회차에서 제어 컴포넌트 패턴으로 폼을 완성한다

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  // TODO: useState로 폼 상태 관리
  // const [form, setForm] = useState({ title: "", content: "" });

  // TODO: handleChange 구현 (스프레드 연산자로 불변성 유지)

  // TODO: handleSubmit 구현 (제목 비어있으면 경고)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">새 게시글 작성</h1>
      <form className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="제목"
          className="w-full px-3 py-2 border rounded text-lg"
        />
        <textarea
          name="content"
          placeholder="내용을 입력하세요"
          rows={10}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          작성하기
        </button>
      </form>
    </div>
  );
}
