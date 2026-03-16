// TODO: 인증 상태에 따라 로그인/로그아웃 버튼을 표시하는 네비게이션 바
// "use client";
//
// import { useAuth } from "@/contexts/AuthContext";
//
// 1. useAuth()에서 user, loading, signInWithGoogle, signOut 가져오기
// 2. loading이면 "로딩 중..." 표시
// 3. user가 있으면 이메일 + 로그아웃 버튼
// 4. user가 없으면 "Google로 로그인" 버튼

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">내 블로그</h1>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Google로 로그인
      </button>
    </nav>
  );
}
