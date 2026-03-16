import "./globals.css";

export const metadata = {
  title: "내 블로그",
  description: "Ch8 Supabase 연동 블로그",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
