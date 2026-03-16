// Ch1 개인 프로필 페이지 — 모범 구현
// 과제 요구사항: 본인 이름 + 자기소개 + Tailwind 스타일링 + Vercel 배포

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      {/* ── 프로필 카드 ── */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        {/* 이름과 소속 */}
        <h1 className="text-3xl font-bold text-center mb-2">홍길동</h1>
        <p className="text-gray-500 text-center mb-6">컴퓨터공학과 3학년</p>

        {/* 상세 정보 */}
        <div className="space-y-3">
          <p>
            <strong>학교:</strong> 한국대학교
          </p>
          <p>
            <strong>전공:</strong> 컴퓨터공학
          </p>
          <p>
            <strong>취미:</strong> 코딩, 독서, 게임
          </p>
        </div>

        {/* 링크 */}
        <div className="mt-6 flex gap-4 justify-center">
          <a
            href="https://github.com/본인아이디"
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            GitHub
          </a>
          <a
            href="mailto:본인@이메일.com"
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            이메일
          </a>
        </div>
      </div>
    </main>
  );
}
