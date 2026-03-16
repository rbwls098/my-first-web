// Ch6 게시글 작성 페이지 — 모범 구현
// 제어 컴포넌트 패턴 (value + onChange)
// 유효성 검증: 빈 제목 방지

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    // 스프레드 연산자로 불변성 유지
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    if (!form.title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }

    // Ch8에서 Supabase insert로 교체 예정
    alert("게시글이 저장되었습니다 (더미)");
    router.push("/");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">새 게시글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목"
          className="w-full px-3 py-2 border rounded text-lg"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
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
