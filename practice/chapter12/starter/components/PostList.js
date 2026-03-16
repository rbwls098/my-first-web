// 게시글 목록 컴포넌트 — 에러/로딩 처리 없음
// TODO: loading 상태, error 상태, 스켈레톤 UI 추가 필요
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data } = await supabase
        .from("posts")
        .select("*, profiles(username)")
        .order("created_at", { ascending: false });

      if (data) setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article key={post.id} className="border rounded-lg p-4 bg-white">
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
