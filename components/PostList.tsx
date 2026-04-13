"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/posts";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.preventDefault(); // Link 이벤트 전파 방지용 (Link 안의 삭제버튼인 경우)
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

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
                <button
                  onClick={(e) => handleDelete(e, post.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm px-2 py-1 border border-red-500 rounded"
                >
                  삭제
                </button>
                <h2 className="text-xl font-bold mb-2 pr-16">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>작성자: {post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
