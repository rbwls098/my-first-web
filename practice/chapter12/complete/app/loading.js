// loading.js — 서버 컴포넌트가 데이터를 가져오는 동안 자동 표시
import PostListSkeleton from "@/components/PostListSkeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <PostListSkeleton />
    </div>
  );
}
