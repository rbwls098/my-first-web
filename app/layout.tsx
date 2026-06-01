import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navigation } from "@/components/Navigation";

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
    <html lang="ko" className="font-sans">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            <main className="max-w-4xl mx-auto p-4 md:p-6">
              {children}
            </main>
            <footer className="text-center text-gray-500 py-4 mt-8">
              &copy; 2026 내 블로그
            </footer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
