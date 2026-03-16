// error.js — 에러 처리 (Ch12 패턴 적용)
"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-bold text-red-600">문제가 발생했습니다</h2>
      <p className="text-gray-600">{error.message || "일시적인 오류입니다."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
}
