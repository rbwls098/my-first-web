"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { getErrorMessage } from "@/lib/error-message";

interface PostForm {
  title: string;
  content: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const supabase = createClient();
  
  const [form, setForm] = useState<PostForm>({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!loading && !user) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login?redirect=/posts/new");
    }
  }, [user, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // 다시 한번 확인

    if (!form.title.trim()) {
      setErrorMsg("제목을 입력해주세요.");
      return;
    }
    if (form.title.trim().length < 2) {
      setErrorMsg("제목을 2자 이상 입력해주세요.");
      return;
    }
    if (!form.content.trim()) {
      setErrorMsg("내용을 입력해주세요.");
      return;
    }
    if (form.content.trim().length < 10) {
      setErrorMsg("내용을 10자 이상 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    
    try {
      // 1. 프로필이 존재하는지 먼저 확인하고, 없으면 생성 (Foreign Key 에러 방지)
      const { data: profile, error: profileCheckError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (profileCheckError || !profile) {
        // 프로필이 없으면 현재 유저 정보를 바탕으로 생성
        const { error: profileCreateError } = await supabase
          .from("profiles")
          .upsert({
            id: user.id,
            username: user.email?.split("@")[0] || "User",
          });
        
        if (profileCreateError) {
          console.error("Failed to sync profile:", profileCreateError);
          // 프로필 생성이 실패해도 일단 진행 (RLS 등에 의해 이미 존재할 수도 있음)
        }
      }

      // 2. posts 테이블에 insert
      const { data, error } = await supabase
        .from("posts")
        .insert({
          title: form.title,
          content: form.content,
          user_id: user.id,
        })
        .select()
        .single();
        
      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
      
      // 글 작성 성공 후 목록이나 상세 페이지로 이동
      router.push(`/posts/${data.id}`);
      router.refresh(); // 최신 목록을 위해 라우터 리프레시
      
    } catch (err: unknown) {
      console.error("Error submitting post:", err);
      setErrorMsg(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 중이거나 아직 리다이렉트 전일 때
  if (loading || !user) {
    return <div className="mt-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">새 글 쓰기</h1>
      
      {errorMsg && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            placeholder="제목을 입력하세요"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            내용
          </label>
          <textarea
            id="content"
            value={form.content}
            onChange={handleChange}
            disabled={isSubmitting}
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y disabled:opacity-50"
            placeholder="내용을 입력하세요"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
