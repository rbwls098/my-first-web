"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 개발자용 로그는 콘솔에 남기고 사용자 화면에는 친절한 메시지 표시
    console.error("앱 전역 에러발생:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-2xl font-bold mb-4 text-red-500">문제가 발생했습니다.</h2>
      <p className="text-gray-600 mb-6">잠시 후 다시 시도해주세요.</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
