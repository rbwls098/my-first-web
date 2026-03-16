# Project Context

## Tech Stack
- Next.js 15.x (App Router ONLY — Pages Router 사용 금지)
- Tailwind CSS 4.x
- Vercel 배포

## Coding Conventions
<!-- TODO: 아래 항목을 확인하고 필요한 규칙을 추가하세요 -->
- Server Component 기본, "use client"는 필요할 때만
- async/await 패턴 (then 체이닝 금지)
- Tailwind CSS 유틸리티 클래스만 사용

## Known AI Mistakes (DO NOT)
<!-- TODO: AI가 자주 틀리는 패턴을 여기에 추가하세요 -->
<!-- 형식: "금지 패턴 → 올바른 대안" -->
- next/router 사용 금지 → next/navigation 사용
- getServerSideProps 사용 금지 → App Router 서버 컴포넌트 사용
