// 게시글 목록 컴포넌트 — 모범 구현
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const supabase = createClient();
    // 게시글 + 작성자 이름을 함께 조회, 최신순 정렬
    const { data, error } = await supabase
      .from("posts")
      .select("*, profiles(username)")
      .order("created_at", { ascending: false });

    if (!error) setPosts(data);
    setLoading(false);
  }

  if (loading) return <p className="text-center py-8">로딩 중...</p>;
  if (posts.length === 0)
    return <p className="text-center py-8 text-gray-500">게시글이 없습니다.</p>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              {post.profiles?.username} ·{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-700 line-clamp-2">{post.content}</p>
          </article>
        </Link>
      ))}
    </div>
  );
}
