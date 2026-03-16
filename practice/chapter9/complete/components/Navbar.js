"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) return <nav className="p-4">로딩 중...</nav>;

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">내 블로그</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.email}</span>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Google로 로그인
        </button>
      )}
    </nav>
  );
}
