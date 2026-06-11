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
    <div className="space-y-12">
      <div className="relative group max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="게시글 검색..."
          className="w-full pl-12 pr-4 py-3 bg-muted/40 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:bg-background transition-all placeholder:text-muted-foreground/60 text-lg font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-muted/10 rounded-[2rem] border border-dashed border-border/60">
            <p className="text-muted-foreground text-lg">검색 결과가 없습니다.</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="group block">
              <div className="h-full bg-card border border-border/40 rounded-[2rem] overflow-hidden flex flex-col hover:border-blue-500/30 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-500 hover:-translate-y-1">
                {post.image_url && (
                  <div className="relative w-full h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tighter mb-4 group-hover:text-blue-500 transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed font-light">{post.content}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                    <span>{post.user_id.slice(0, 8)}</span>
                    <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
