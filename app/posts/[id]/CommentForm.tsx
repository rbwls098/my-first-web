"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CommentForm({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const supabase = createClient();
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, user_id: user.id, content }]);

    if (error) {
      console.error("댓글 작성 실패 상세 에러:", JSON.stringify(error, null, 2));
      alert(`댓글 작성에 실패했습니다: ${error.message}\n(상세 내용은 콘솔 F12를 확인하세요)`);
    } else {
      setContent("");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="댓글을 작성하세요..."
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {loading ? "작성 중..." : "댓글 작성"}
      </button>
    </form>
  );
}
