// Ch5 홈 페이지
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">블로그에 오신 것을 환영합니다</h1>
      <p className="text-gray-600 mb-8">
        Next.js App Router로 만든 블로그입니다.
      </p>
      <Link
        href="/posts"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        블로그 바로가기
      </Link>
    </div>
  );
}
