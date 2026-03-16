// 블로그 글 목록 — 카테고리 필터 + 댓글 수 표시 확장 버전
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { getUserMessage } from "@/lib/utils";
import PostListSkeleton from "./PostListSkeleton";

export default function PostList({ category }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const supabase = createClient();
        let query = supabase
          .from("posts")
          .select("*, profiles(username)")
          .order("created_at", { ascending: false });

        // 카테고리 필터 적용
        if (category) {
          query = query.eq("category", category);
        }

        const { data, error } = await query;
        if (error) throw error;
        setPosts(data);
      } catch (err) {
        setError(getUserMessage(err));
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [category]);

  if (loading) return <PostListSkeleton />;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (posts.length === 0) return <p className="p-4 text-gray-500">아직 글이 없습니다.</p>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`} className="block">
          <article className="border rounded-lg p-4 bg-white hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-1">
              {post.category && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                  {post.category}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-gray-600 text-sm">
              {post.profiles?.username} &middot;{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-800 line-clamp-2">{post.content}</p>
          </article>
        </Link>
      ))}
    </div>
  );
}
