// 게시글 목록 — 로딩 + 에러 처리 완성 버전
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { getUserMessage } from "@/lib/utils";
import PostListSkeleton from "./PostListSkeleton";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("posts")
          .select("*, profiles(username)")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPosts(data);
      } catch (err) {
        setError(getUserMessage(err));
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // 상태 확인 순서: loading → error → empty → data
  if (loading) return <PostListSkeleton />;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (posts.length === 0) return <p className="p-4 text-gray-500">게시글이 없습니다.</p>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article key={post.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition">
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p className="text-gray-600 text-sm">
            {post.profiles?.username} &middot;{" "}
            {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p className="mt-2 text-gray-800">{post.content}</p>
        </article>
      ))}
    </div>
  );
}
