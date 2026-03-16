import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "내 블로그",
  description: "Ch5 블로그 — Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* ── 내비게이션 바 ── */}
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <span className="text-xl font-bold">내 블로그</span>
            <div className="flex gap-4">
              {/* TODO: NavLink 컴포넌트로 교체하여 활성 링크 스타일 적용 */}
              <Link href="/" className="text-gray-300 hover:text-white">
                홈
              </Link>
              <Link href="/posts" className="text-gray-300 hover:text-white">
                글 목록
              </Link>
              {/* TODO: 새 글 작성 링크 추가 */}
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
