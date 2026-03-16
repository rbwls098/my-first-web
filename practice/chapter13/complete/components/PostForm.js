// 블로그 글 작성 폼 — 카테고리 선택 추가 버전
"use client";

import { useState } from "react";

const CATEGORIES = ["개발", "일상", "학습", "리뷰"];

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    else if (title.trim().length < 2) newErrors.title = "제목은 2자 이상이어야 합니다.";
    else if (title.trim().length > 100) newErrors.title = "제목은 100자 이하여야 합니다.";

    if (!content.trim()) newErrors.content = "내용을 입력해주세요.";
    else if (content.trim().length < 10) newErrors.content = "내용은 10자 이상이어야 합니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      category: category || null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-3 border rounded-lg ${errors.title ? "border-red-500" : ""}`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">카테고리 선택 (선택사항)</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          placeholder="내용을 입력하세요 (10자 이상)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full p-3 border rounded-lg h-40 ${errors.content ? "border-red-500" : ""}`}
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        글 작성
      </button>
    </form>
  );
}
