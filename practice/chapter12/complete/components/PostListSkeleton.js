// 게시글 목록 스켈레톤 UI
// animate-pulse로 로딩 중임을 표현
export default function PostListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse bg-white">
          {/* 제목 자리 */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          {/* 작성자 + 날짜 자리 */}
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
          {/* 내용 자리 */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
