import "./globals.css";

export const metadata = {
  title: "내 프로필",
  description: "Ch1 개인 프로필 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
