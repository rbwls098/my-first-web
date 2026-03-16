// Ch5 게시글 상세 페이지 — 모범 구현
// 동적 라우트에서 params를 await로 추출하고, find로 게시글을 찾는다
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../../../lib/posts";

export default async function PostDetailPage({ params }) {
  // Next.js 15에서 params는 Promise이므로 await 필수
  const { id } = await params;

  // find()로 해당 id의 게시글 찾기
  const post = posts.find((p) => p.id === id);

  // 게시글이 없으면 404 표시
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-2xl mx-auto">
      {/* 목록으로 돌아가기 */}
      <Link
        href="/posts"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; 목록으로
      </Link>

      {/* 게시글 제목 */}
      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>

      {/* 작성자, 날짜 */}
      <div className="flex gap-2 text-sm text-gray-500 mt-2">
        <span>{post.author}</span>
        <span>&middot;</span>
        <time dateTime={post.date}>{post.date}</time>
      </div>

      {/* 본문 */}
      <div className="mt-6 leading-relaxed text-gray-700">{post.content}</div>
    </article>
  );
}
