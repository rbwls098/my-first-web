"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export function Navigation() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-lg hover:text-gray-300">
          내 블로그
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/" className="hover:text-gray-300">홈</Link>
          <Link href="/posts" className="hover:text-gray-300">블로그</Link>
          
          {loading ? (
            <span className="text-gray-400 text-sm">로딩 중...</span>
          ) : user ? (
            <>
              <Link href="/posts/new" className="hover:text-gray-300 transform transition-colors">새 글 쓰기</Link>
              <button 
                onClick={handleSignOut} 
                className="hover:text-gray-300 ml-4 font-medium transition-colors cursor-pointer"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">로그인</Link>
              <Link href="/signup" className="hover:text-gray-300">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
