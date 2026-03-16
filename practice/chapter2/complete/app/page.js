// Ch2 자기소개 페이지 — 모범 구현
// 과제 요구사항: Copilot 설정 + copilot-instructions.md + 자기소개 페이지 + 배포

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      {/* ── 자기소개 카드 ── */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        {/* 프로필 아바타 */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-blue-600">홍</span>
          </div>
          <h1 className="text-3xl font-bold">홍길동</h1>
          <p className="text-gray-500">컴퓨터공학과 3학년</p>
        </div>

        {/* 상세 정보 */}
        <div className="space-y-3 mb-6">
          <p>
            <strong>학교:</strong> 한국대학교
          </p>
          <p>
            <strong>전공:</strong> 컴퓨터공학
          </p>
          <p>
            <strong>취미:</strong> 코딩, 독서, 게임
          </p>
          <p>
            <strong>한 마디:</strong> AI와 함께 웹 프로그래밍을 배우고 있습니다
          </p>
        </div>

        {/* 기술 스택 뱃지 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Next.js
          </span>
          <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">
            Tailwind
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Supabase
          </span>
        </div>

        {/* 링크 */}
        <div className="flex gap-4 justify-center">
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
