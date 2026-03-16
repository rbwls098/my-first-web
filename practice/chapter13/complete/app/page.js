// Ch13 모범 구현 — 블로그 확장 (카테고리 + 댓글)
// Ch12 블로그에 카테고리 필터와 댓글 기능을 추가한 예시
import Link from "next/link";
import PostList from "@/components/PostList";
import CategoryFilter from "@/components/CategoryFilter";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white">
        <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <Link href="/" className="text-xl font-bold">
            내 블로그
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/posts/new" className="hover:underline">
              글쓰기
            </Link>
            <AuthButton />
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">최신 글</h2>

        {/* 카테고리 필터 — Ch13에서 새로 추가한 기능 */}
        <CategoryFilter />

        {/* 블로그 글 목록 */}
        <PostList />
      </main>

      <footer className="max-w-4xl mx-auto p-4 mt-8 text-center text-gray-400 text-sm">
        &copy; 2026 내 블로그. Ch13 개인 프로젝트 모범 구현.
      </footer>
    </div>
  );
}
