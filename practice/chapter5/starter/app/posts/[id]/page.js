// Ch5 게시글 상세 페이지 — 스타터 코드
// B회차에서 Copilot을 활용하여 완성한다.

// TODO: next/link에서 Link import
// TODO: next/navigation에서 notFound import
// TODO: lib/posts.js에서 posts import

// 주의: Next.js 15에서 params는 Promise이므로 await 필요
export default async function PostDetailPage({ params }) {
  // TODO: await params로 id 추출
  // TODO: posts.find()로 해당 게시글 찾기
  // TODO: 없으면 notFound() 호출

  return (
    <article className="max-w-2xl mx-auto">
      {/* TODO: 목록으로 돌아가기 Link */}
      {/* TODO: 게시글 제목, 작성자, 날짜, 내용 표시 */}
      <p className="text-gray-400">게시글 상세 내용이 여기에 표시됩니다</p>
    </article>
  );
}
