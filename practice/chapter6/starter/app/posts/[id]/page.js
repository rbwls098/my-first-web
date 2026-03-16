// Ch6 게시글 상세 페이지 — 스타터 코드
import Link from "next/link";
import { initialPosts } from "@/lib/posts";

export default function PostDetailPage({ params }) {
  const post = initialPosts.find((p) => p.id === Number(params.id));

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold">게시글을 찾을 수 없습니다</h1>
        <Link href="/" className="text-blue-500 hover:underline mt-4 block">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        &larr; 목록으로
      </Link>
      <article>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex gap-4 text-sm text-gray-400 mb-8">
          <span>{post.author}</span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
      </article>
    </div>
  );
}
