import "./globals.css";

// 메타데이터 설정 — SEO 기초
export const metadata = {
  title: "내 블로그",
  description: "Next.js + Supabase로 만든 블로그",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
