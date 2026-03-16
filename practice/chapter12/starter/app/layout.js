import "./globals.css";

export const metadata = {
  title: "내 블로그",
  description: "Ch12 블로그 — 에러 처리와 UX 완성",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
