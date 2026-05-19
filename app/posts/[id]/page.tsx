import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import PostActions from "./PostActions";

export const revalidate = 0;

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const supabase = await createClient();

  // 1. posts 테이블에서 id로 단일 데이터 조회 (조회할 컬럼 지정)
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, content, created_at, user_id")
    .eq("id", id)
    .single();
    
  // 3. 없는 글인 경우 notFound() 처리
  if (error || !post) {
    notFound();
  }

  // 5. 로그인한 사용자가 작성자인지 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthor = user?.id === post.user_id;

  return (
    <article className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6 flex space-x-4">
        <span>작성자 ID: {post.user_id}</span>
        <span>작성일: {new Date(post.created_at).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-700 text-lg mb-8 whitespace-pre-wrap">
        {post.content}
      </p>

      <div className="mt-8 flex justify-between items-center">
        <Link
          href="/posts"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          목록으로 돌아가기
        </Link>
        
        {/* 클라이언트 if문을 사용한 UX적 분기. 실제 보안은 Ch11 RLS에서 처리합니다. */}
        <PostActions postId={post.id} isAuthor={isAuthor} />
      </div>
    </article>
  );
}
