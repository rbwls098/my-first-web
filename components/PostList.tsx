"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/posts";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const [posts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-6">
        {filteredPosts.length === 0 ? (
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        ) : (
          filteredPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="block">
              <div className="bg-white border text-gray-800 border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative">
                <h2 className="text-xl font-bold mb-2 pr-16">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>작성자 ID: {post.user_id}</span>
                  <span>{new Date(post.created_at).toISOString().split('T')[0]}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
