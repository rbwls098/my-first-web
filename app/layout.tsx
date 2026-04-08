import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "내 블로그",
  description: "내 블로그에 오신 것을 환영합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="font-bold text-lg">내 블로그</div>
            <div className="space-x-4">
              <Link href="/" className="hover:text-gray-300">홈</Link>
              <Link href="/posts" className="hover:text-gray-300">블로그</Link>
              <Link href="/posts/new" className="hover:text-gray-300">새 글 쓰기</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto p-6">
          {children}
        </main>
        <footer className="text-center text-gray-500 py-4 mt-8">
          &copy; 2026 내 블로그
        </footer>
      </body>
    </html>
  );
}
