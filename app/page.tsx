import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section 1: Minimalist Statement */}
      <section className="w-full pt-20 pb-32 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          나의 생각. 나의 공간.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          기술과 일상의 경계에서 기록하는 작지만 깊은 생각들.
          <br className="hidden md:block" />
          더 나은 미래를 향한 여정을 함께합니다.
        </p>
        <div className="mt-10 flex gap-6">
          <Link 
            href="/posts" 
            className="text-blue-500 text-xl font-medium hover:underline flex items-center gap-1 group"
          >
            블로그 읽기
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link 
            href="/signup" 
            className="text-blue-500 text-xl font-medium hover:underline flex items-center gap-1 group"
          >
            시작하기
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* Hero Section 2: Large Feature Tile */}
      <section className="w-full max-w-6xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-card border border-border/50 shadow-2xl shadow-black/5 dark:shadow-white/5 aspect-[16/9] flex flex-col items-center justify-center p-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 opacity-50" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 relative z-10">
            Playwright & Next.js
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg relative z-10">
            현대적인 웹 개발과 견고한 테스트 자동화에 대한 심도 있는 가이드.
          </p>
          <Link 
            href="/posts" 
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity relative z-10"
          >
            최신 글 보기
          </Link>
        </div>
      </section>

      {/* Grid Section: Info Tiles */}
      <section className="w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        <div className="rounded-[2rem] bg-card border border-border/50 p-12 flex flex-col justify-between h-[400px]">
          <div>
            <h3 className="text-2xl font-bold tracking-tighter mb-2">Supabase Auth</h3>
            <p className="text-muted-foreground">강력하고 안전한 사용자 인증 시스템.</p>
          </div>
          <Link href="/posts" className="text-blue-500 font-medium hover:underline">더 알아보기 →</Link>
        </div>
        <div className="rounded-[2rem] bg-card border border-border/50 p-12 flex flex-col justify-between h-[400px] bg-gradient-to-b from-card to-muted/30">
          <div>
            <h3 className="text-2xl font-bold tracking-tighter mb-2">Clean Design</h3>
            <p className="text-muted-foreground">복잡함을 덜어내고 본질에 집중하는 미학.</p>
          </div>
          <Link href="/posts" className="text-blue-500 font-medium hover:underline">더 알아보기 →</Link>
        </div>
      </section>
    </div>
  );
}
