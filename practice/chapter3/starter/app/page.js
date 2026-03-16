// Ch3 블로그 메인 페이지 — 스타터 코드
// A회차 시연에서 만든 기본 뼈대이다.
// B회차에서 Copilot을 활용하여 완성한다.

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* TODO: header + nav 추가 (시맨틱 태그 사용) */}
      <header className="bg-blue-600 text-white p-4">
        <nav className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">내 블로그</h1>
          <div className="flex gap-4">
            <a href="/" className="hover:underline">홈</a>
            <a href="/login" className="hover:underline">로그인</a>
          </div>
        </nav>
      </header>

      {/* TODO: main 영역에 블로그 글 카드 목록 추가 */}
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">최신 게시글</h2>
        {/* Copilot에게 블로그 글 카드 목록 생성을 요청하세요 */}
      </main>

      {/* TODO: footer 추가 */}
    </div>
  );
}
