import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import PostActions from "./PostActions";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import LikeButton from "./LikeButton";

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
    .select("id, title, content, created_at, user_id, image_url")
    .eq("id", id)
    .single();
    
  // 댓글 조회
  const { data: comments } = await supabase
    .from("comments")
    .select("id, content, created_at, user_id")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

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
    <div className="max-w-3xl mx-auto px-4 py-16">
      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-blue-500" />
              {post.user_id.slice(0, 8)}
            </span>
            <span className="text-border">|</span>
            <span>{new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {post.image_url && (
          <div className="relative w-full rounded-2xl overflow-hidden border border-border/40 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed text-foreground/90 whitespace-pre-wrap font-light">
            {post.content}
          </p>
        </div>

        <div className="pt-12 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <LikeButton postId={post.id} userId={user?.id} />
            <PostActions postId={post.id} isAuthor={isAuthor} />
          </div>
          
          <Link
            href="/posts"
            className="text-blue-500 font-medium hover:underline flex items-center gap-1"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>

        <section className="mt-20 pt-12 border-t border-border/40">
          <h2 className="text-2xl font-bold tracking-tighter mb-8">댓글</h2>
          <CommentForm postId={post.id} />
          <div className="mt-10">
            {comments && comments.length > 0 ? (
              <ul className="divide-y divide-border/40">
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    isOwner={user?.id === comment.user_id}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground py-10 text-center bg-muted/10 rounded-2xl border border-dashed border-border/60">
                첫 번째 댓글을 남겨보세요.
              </p>
            )}
          </div>
        </section>
      </article>
    </div>
  );
}
