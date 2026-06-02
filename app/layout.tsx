import type { Metadata } from "next";
import Link from "next/link";
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
    <html lang="ko" className="font-sans" data-scroll-behavior="smooth">
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="w-full py-12 border-t border-border/40 bg-muted/30">
              <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
                <div className="font-semibold text-foreground tracking-tighter">내 블로그</div>
                <div>&copy; 2026 Designed with Precision. All rights reserved.</div>
                <div className="flex gap-6">
                  <Link href="/posts" className="hover:text-foreground transition-colors">블로그</Link>
                  <Link href="/login" className="hover:text-foreground transition-colors">로그인</Link>
                </div>
              </div>
            </footer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
