import "./globals.css";

export const metadata = {
  title: "내 프로필",
  description: "Ch2 자기소개 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
