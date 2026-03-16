// Ch5 공통 레이아웃 — 모범 구현
// NavLink 컴포넌트로 활성 링크 표시
import NavLink from "../components/NavLink";
import "./globals.css";

export const metadata = {
  title: "내 블로그",
  description: "Ch5 블로그 — Next.js App Router 모범 구현",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* ── 내비게이션 바 ── */}
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <span className="text-xl font-bold">내 블로그</span>
            <div className="flex gap-2">
              <NavLink href="/">홈</NavLink>
              <NavLink href="/posts">글 목록</NavLink>
              <NavLink href="/posts/new">새 글</NavLink>
            </div>
          </div>
        </nav>

        {/* ── 본문 ── */}
        <main className="max-w-4xl mx-auto p-6">{children}</main>

        {/* ── 푸터 ── */}
        <footer className="text-center text-gray-500 py-4 mt-16">
          &copy; 2026 내 블로그
        </footer>
      </body>
    </html>
  );
}
