// Ch3 블로그 메인 페이지 — 모범 구현
// 과제 요구사항: 시맨틱 태그 + Tailwind + 반응형 + 더미 블로그 글 3개

// 더미 게시글 데이터
const posts = [
  {
    id: 1,
    title: "Next.js App Router 시작하기",
    content: "Next.js 14의 App Router를 사용하면 서버 컴포넌트와 파일 기반 라우팅을 쉽게 구현할 수 있습니다.",
    author: "김개발",
    date: "2026-02-25",
  },
  {
    id: 2,
    title: "Tailwind CSS로 반응형 레이아웃 만들기",
    content: "유틸리티 퍼스트 CSS 프레임워크인 Tailwind를 사용하여 빠르게 반응형 웹 디자인을 구현하는 방법을 알아봅니다.",
    author: "이코딩",
    date: "2026-02-24",
  },
  {
    id: 3,
    title: "GitHub Copilot 활용 팁",
    content: "Copilot에게 명확한 프롬프트를 작성하는 방법과, 생성된 코드를 검증하는 체크리스트를 공유합니다.",
    author: "박프론트",
    date: "2026-02-23",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── 헤더 + 내비게이션 ── */}
      <header className="bg-blue-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">내 블로그</h1>
          <div className="flex gap-4">
            <a href="/" className="hover:underline">홈</a>
            <a href="/login" className="hover:underline">로그인</a>
          </div>
        </nav>
      </header>

      {/* ── 메인: 블로그 글 카드 목록 ── */}
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">최신 게시글</h2>

        {/* 반응형 그리드: 모바일 1열, 태블릿 이상 2열 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{post.author}</span>
                <time dateTime={post.date}>{post.date}</time>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* ── 푸터 ── */}
      <footer className="mt-16 bg-gray-800 text-gray-400 text-center p-6">
        <p className="text-sm">&copy; 2026 내 블로그. All rights reserved.</p>
      </footer>
    </div>
  );
}
