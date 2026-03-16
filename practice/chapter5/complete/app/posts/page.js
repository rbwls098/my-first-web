// Ch5 블로그 글 목록 페이지 — 모범 구현
// 더미 데이터를 카드로 표시하고, 클릭 시 상세 페이지로 이동
import Link from "next/link";
import { posts } from "../../lib/posts";

export default function PostsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">글 목록</h1>
        <Link
          href="/posts/new"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          새 글 작성
        </Link>
      </div>

      {/* 반응형 그리드: 모바일 1열, 태블릿 이상 2열 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="block">
            <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {post.content.length > 80
                  ? post.content.slice(0, 80) + "..."
                  : post.content}
              </p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{post.author}</span>
                <time dateTime={post.date}>{post.date}</time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
