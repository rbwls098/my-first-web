// Ch5 블로그 글 목록 페이지 — 스타터 코드
// B회차에서 Copilot을 활용하여 완성한다.

// TODO: lib/posts.js에서 posts 배열 import
// TODO: next/link에서 Link import

export default function PostsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">글 목록</h1>
        {/* TODO: 새 글 작성 링크 추가 */}
      </div>

      {/* TODO: posts.map으로 게시글 카드 리스트 렌더링 */}
      {/* 각 카드를 Link로 감싸서 /posts/[id]로 이동 */}
      <p className="text-gray-400">게시글 목록이 여기에 표시됩니다</p>
    </div>
  );
}
