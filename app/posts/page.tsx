import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Post } from "@/lib/posts";
import PostList from "@/components/PostList";

export const revalidate = 0; // 최신 데이터 조회를 위해 캐시 비활성화 (선택 사항이지만 목록의 최신성을 보장하기 위함)

export default async function PostsPage() {
  const supabase = createClient();
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">게시글 목록</h1>
        <Link
          href="/posts/new"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors"
        >
          새 글 작성
        </Link>
      </div>
      
      {!fetchedPosts || fetchedPosts.length === 0 ? (
        <p className="text-gray-500">아직 작성된 글이 없습니다. 첫 글을 작성해보세요!</p>
      ) : (
        <PostList initialPosts={fetchedPosts} />
      )}
    </div>
  );
}
