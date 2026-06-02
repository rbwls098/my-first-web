import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Post } from "@/lib/posts";
import PostList from "@/components/PostList";

export const revalidate = 0; // 최신 데이터 조회를 위해 캐시 비활성화 (선택 사항이지만 목록의 최신성을 보장하기 위함)

export default async function PostsPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, content, created_at, user_id")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">게시글 목록</h1>
        <p className="text-red-500">데이터를 가져오는 중 오류가 발생했습니다: {error.message}</p>
      </div>
    );
  }

  // Type assertion since our query selects exactly these fields
  const fetchedPosts: Post[] = posts || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">블로그</h1>
          <p className="text-lg text-muted-foreground font-medium">새로운 기술과 인사이트를 만나보세요.</p>
        </div>
        <Link
          href="/posts/new"
          className="inline-flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-sm"
        >
          새 글 작성
        </Link>
      </div>
      
      {!fetchedPosts || fetchedPosts.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-[2rem] border border-dashed border-border">
          <p className="text-muted-foreground text-lg">아직 작성된 글이 없습니다. 첫 글의 주인공이 되어보세요!</p>
        </div>
      ) : (
        <PostList initialPosts={fetchedPosts} />
      )}
    </div>
  );
}
