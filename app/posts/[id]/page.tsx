import Link from "next/link";
import { posts } from "@/lib/posts";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    return (
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          게시글을 찾을 수 없습니다
        </h2>
        <Link href="/posts" className="text-blue-500 hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6 flex space-x-4">
        <span>작성자: {post.author}</span>
        <span>작성일: {post.date}</span>
      </div>
      <p className="text-gray-700 text-lg mb-8 whitespace-pre-wrap">
        {post.content}
      </p>

      <div className="mt-8">
        <Link
          href="/posts"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}
