"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CommentItem({
  comment,
  isOwner,
}: {
  comment: any;
  isOwner: boolean;
}) {
  const router = useRouter();
  const [dateString, setDateString] = useState("");

  // 클라이언트 마운트 이후에만 날짜 포맷팅 실행
  useEffect(() => {
    setDateString(new Date(comment.created_at).toLocaleString());
  }, [comment.created_at]);

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", comment.id);

    if (error) {
      alert("삭제 실패: " + error.message);
    } else {
      router.refresh(); // 페이지 새로고침
    }
  };

  return (
    <li className="bg-gray-100 p-4 rounded flex justify-between items-start">
      <div>
        <p className="text-gray-900">{comment.content}</p>
        <div className="text-xs text-gray-500 mt-2">
          작성자: {comment.user_id} | {dateString || "..."}
        </div>
      </div>
      {isOwner && (
        <div className="flex space-x-2">
          {/* 수정 기능은 별도 구현 필요 */}
          <button className="text-xs text-blue-600 hover:underline">수정</button>
          <button
            onClick={handleDelete}
            className="text-xs text-red-600 hover:underline"
          >
            삭제
          </button>
        </div>
      )}
    </li>
  );
}
