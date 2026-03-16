import "./globals.css";

export const metadata = {
  title: "내 블로그 — API 연동",
  description: "Ch4 API 연동 블로그 — 모범 구현",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
