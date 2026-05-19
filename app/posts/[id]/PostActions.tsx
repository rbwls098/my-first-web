"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface PostActionsProps {
  postId: number | string;
  isAuthor: boolean;
}

export default function PostActions({ postId, isAuthor }: PostActionsProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isAuthor) return null; // 클라이언트 if문을 사용한 UX적 분기. 실제 보안은 Ch11 RLS에서 처리합니다.

  const handleDelete = async () => {
    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);

      if (error) throw error;

      alert("게시글이 삭제되었습니다.");
      router.push("/posts");
      router.refresh();
    } catch (err: any) {
      console.error("Error deleting post:", err);
      alert(err.message || "게시글 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex space-x-2">
      <Link
        href={`/posts/${postId}/edit`}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
      >
        수정
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
      >
        {isDeleting ? "삭제 중..." : "삭제"}
      </button>
    </div>
  );
}
