# Project Context

## Tech Stack
- Next.js 15.x (App Router ONLY — Pages Router 사용 금지)
- Tailwind CSS 4.x
- Vercel 배포

## Project Structure
- app/ — 페이지 및 라우팅
- app/page.js — 메인 페이지 (자기소개)
- app/layout.js — 공통 레이아웃
- public/ — 정적 파일

## Coding Conventions
- 함수형 컴포넌트만 사용
- Server Component 기본, "use client"는 useState/onClick 등 필요할 때만
- async/await 패턴 (then 체이닝 금지)
- Tailwind CSS 유틸리티 클래스만 사용
- 한국어 주석

## Design Principle
- 심플하고 깔끔한 UI
- Tailwind 기본 컬러 활용
- 복잡한 애니메이션/장식 금지

## Known AI Mistakes (DO NOT)
- next/router 사용 금지 → next/navigation 사용
- getServerSideProps 사용 금지 → App Router 서버 컴포넌트 사용
- @supabase/auth-helpers 사용 금지 → @supabase/ssr 사용
- CSS Modules, styled-components 사용 금지
- class 사용 금지 → className 사용 (JSX)
- 불필요한 "use client" 추가 금지 → 정적 페이지는 서버 컴포넌트로
