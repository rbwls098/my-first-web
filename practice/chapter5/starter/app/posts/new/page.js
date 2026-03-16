// Ch5 게시글 작성 페이지 — 스타터 코드
// B회차에서 Copilot을 활용하여 완성한다.

// 주의: useState, useRouter 사용 시 "use client" 필수
// 주의: useRouter는 "next/navigation"에서 import (next/router 아님)

// TODO: "use client" 지시어 추가
// TODO: useState, useRouter import

export default function NewPostPage() {
  // TODO: useRouter 초기화
  // TODO: useState로 title, content 상태 관리
  // TODO: handleSubmit 함수 (alert + router.push)

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>
      {/* TODO: 제목 input + 내용 textarea + 등록 버튼 */}
      <p className="text-gray-400">작성 폼이 여기에 표시됩니다</p>
    </div>
  );
}
