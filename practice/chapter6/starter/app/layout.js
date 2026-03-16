import "./globals.css";

export const metadata = {
  title: "내 블로그",
  description: "Ch6 블로그 프론트엔드",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
