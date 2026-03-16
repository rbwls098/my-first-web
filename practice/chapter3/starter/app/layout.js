import "./globals.css";

export const metadata = {
  title: "내 블로그",
  description: "Ch3 블로그 메인 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
