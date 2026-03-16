import "./globals.css";

export const metadata = {
  title: "내 블로그 — 카테고리 확장",
  description: "Ch13 개인 프로젝트 모범 구현 — 블로그에 카테고리와 댓글 기능 추가",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
