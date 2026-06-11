"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { getErrorMessage } from "@/lib/error-message";

interface EditPostForm {
  title: string;
  content: string;
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading } = useAuth();
  const supabase = createClient();
  
  const [form, setForm] = useState<EditPostForm>({ title: "", content: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  // 데이터 로드 및 권한 체크
  useEffect(() => {
    async function loadPost() {
      if (loading) return;
      if (!user) {
        alert("로그인이 필요합니다.");
        router.push(`/login?redirect=/posts/${id}/edit`);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("title, content, user_id, image_url")
          .eq("id", id)
          .single();

        if (error || !data) {
          throw new Error("게시글을 찾을 수 없습니다.");
        }

        if (data.user_id !== user.id) {
          alert("수정 권한이 없습니다.");
          router.push(`/posts/${id}`);
          return;
        }

        setForm({ title: data.title, content: data.content });
        setExistingImageUrl(data.image_url);
        setImagePreview(data.image_url);
      } catch (err: unknown) {
        console.error(err);
        alert(getErrorMessage(err));
        router.push("/posts");
      } finally {
        setIsFetching(false);
      }
    }

    loadPost();
  }, [id, user, loading, router, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; 

    if (!form.title.trim()) {
      setErrorMsg("제목을 입력해주세요.");
      return;
    }
    if (!form.content.trim()) {
      setErrorMsg("내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    
    try {
      let imageUrl = existingImageUrl;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("post-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("post-images")
          .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
      }

      const { error } = await supabase
        .from("posts")
        .update({
          title: form.title,
          content: form.content,
          image_url: imageUrl,
        })
        .eq("id", id);
        
      if (error) throw error;
      
      alert("게시글이 수정되었습니다.");
      router.push(`/posts/${id}`);
      router.refresh(); 
      
    } catch (err: unknown) {
      console.error("Error updating post:", err);
      setErrorMsg(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || isFetching) {
    return <div className="mt-8 text-center">데이터를 불러오는 중...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">게시글 수정</h1>
      
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 text-gray-900"
            placeholder="제목을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            이미지 수정
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isSubmitting}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />
          {imagePreview && (
            <div className="mt-4 relative w-full h-64 border rounded-md overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="미리보기"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(existingImageUrl);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y disabled:opacity-50 text-gray-900"
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
            {isSubmitting ? "수정 중..." : "수정"}
          </button>
        </div>
      </form>
    </div>
  );
}
