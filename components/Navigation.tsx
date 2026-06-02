"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tighter hover:opacity-70 transition-opacity">
          내 블로그
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/posts" className="text-foreground/80 hover:text-foreground transition-colors">블로그</Link>
          
          {loading ? (
            <span className="text-muted-foreground animate-pulse text-xs">로딩 중...</span>
          ) : user ? (
            <>
              <Link href="/posts/new" className="text-foreground/80 hover:text-foreground transition-colors">새 글 쓰기</Link>
              <button 
                onClick={handleSignOut} 
                className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-foreground/80 hover:text-foreground transition-colors">로그인</Link>
              <Link href="/signup" className="text-foreground/80 hover:text-foreground transition-colors">회원가입</Link>
            </>
          )}
          
          <div className="pl-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
