import Link from "next/link";
import { Post } from "@/lib/posts";
import PostList from "@/components/PostList";

export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  const data = await res.json();
  
  // JSONPlaceholder의 데이터를 우리 Post 타입에 맞게 매핑
  const fetchedPosts: Post[] = data.map((item: any) => ({
    id: item.id,
    title: item.title,
    content: item.body,
    author: `User ${item.userId}`,
    date: new Date().toISOString().split("T")[0],
  }));

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
      <PostList initialPosts={fetchedPosts} />
    </div>
  );
}
