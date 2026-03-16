// loading.js — 서버 컴포넌트 로딩 UI
import PostListSkeleton from "@/components/PostListSkeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <PostListSkeleton />
    </div>
  );
}
