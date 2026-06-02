"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LikeButton({ postId, userId }: { postId: string; userId: string | undefined }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const fetchLikes = async () => {
      const { data: likes, count } = await supabase
        .from("likes")
        .select("*", { count: "exact" })
        .eq("post_id", postId);
      
      setLikeCount(count || 0);
      if (userId) {
        const liked = likes?.some((like) => like.user_id === userId);
        setIsLiked(!!liked);
      }
    };
    fetchLikes();
  }, [postId, userId, supabase]);

  const toggleLike = async () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (isLiked) {
      await supabase.from("likes").delete().eq("post_id", postId).eq("user_id", userId);
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      await supabase.from("likes").insert({ post_id: postId, user_id: userId });
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`px-4 py-2 rounded transition-colors ${
        isLiked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      {isLiked ? "❤️ 좋아요 취소" : "🤍 좋아요"} ({likeCount})
    </button>
  );
}
