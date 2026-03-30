export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold mb-4">블로그 제목</h1>
        <nav>
          <ul className="flex gap-4 text-gray-600">
            <li><a href="/" className="hover:text-black transition">홈</a></li>
            <li><a href="/about" className="hover:text-black transition">소개</a></li>
          </ul>
        </nav>
      </header>

      <main className="space-y-6">
        <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-bold">첫 번째 게시글 제목</h2>
          <p className="text-gray-600 mt-2">첫 번째 게시글의 내용 미리보기입니다.</p>
          <p className="text-sm text-gray-400 mt-4">작성자: 홍길동 | 날짜: 2026-03-30</p>
        </article>

        <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-bold">두 번째 게시글 제목</h2>
          <p className="text-gray-600 mt-2">두 번째 게시글의 내용 미리보기입니다.</p>
          <p className="text-sm text-gray-400 mt-4">작성자: 이순신 | 날짜: 2026-03-29</p>
        </article>

        <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-bold">세 번째 게시글 제목</h2>
          <p className="text-gray-600 mt-2">세 번째 게시글의 내용 미리보기입니다.</p>
          <p className="text-sm text-gray-400 mt-4">작성자: 강감찬 | 날짜: 2026-03-28</p>
        </article>
      </main>

      <footer className="mt-12 border-t pt-4 text-center">
        <p className="text-sm text-gray-400">&copy; 2026 블로그 이름. All rights reserved.</p>
      </footer>
    </div>
  );
}
