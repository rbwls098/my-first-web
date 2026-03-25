export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">이규진의 블로그</h1>
          <nav className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">Posts</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Profile Card */}
        <section className="mb-16">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    이규진
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    한신대학교 공공인재학부에서 공부하며 세상을 넓게 보고 있습니다.
                  </p>
                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <dt className="text-sm font-semibold text-gray-500">학교</dt>
                      <dd className="mt-1 text-base font-bold">한신대학교</dd>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <dt className="text-sm font-semibold text-gray-500">전공</dt>
                      <dd className="mt-1 text-base font-bold">공공인재학부</dd>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <dt className="text-sm font-semibold text-gray-500">취미</dt>
                      <dd className="mt-1 text-base font-bold">여행</dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Preview */}
        <section>
          <h3 className="text-2xl font-bold mb-8">최근 게시글</h3>
          <div className="space-y-8">
            {[1, 2, 3].map((post) => (
              <article key={post} className="group relative flex flex-col items-start px-4 py-6 hover:bg-white hover:shadow-md rounded-2xl transition-all">
                <h4 className="text-xl font-bold group-hover:text-blue-600">블로그 포스트 제목 {post}</h4>
                <p className="mt-2 text-gray-600 line-clamp-2">이곳에 게시글의 요약 내용이 들어갑니다. Tailwind CSS를 활용한 멋진 레이아웃을 구성해 보세요.</p>
                <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
                  <span>2026년 3월 25일</span>
                  <span>·</span>
                  <span>5 min read</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-24 border-t py-12 text-center text-sm text-gray-500">
        <p>© 2026 Lee Kyujin. All rights reserved.</p>
      </footer>
    </div>
  );
}
