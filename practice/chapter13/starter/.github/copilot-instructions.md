# Project Context

## Tech Stack
- Next.js 14.2.21 (App Router)
- Tailwind CSS 3.4.17
- @supabase/supabase-js 2.47.12
- @supabase/ssr 0.5.2
- Vercel 배포

## Project Structure
- app/ — 페이지 및 라우팅
- components/ — 재사용 UI 컴포넌트
- lib/ — Supabase 클라이언트, 유틸리티
- public/ — 정적 파일

## Supabase 규칙
- 클라이언트: @supabase/ssr 사용 (createBrowserClient / createServerClient)
- 환경 변수: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- RLS: 모든 테이블에 활성화
- 인증: Google OAuth (auth/callback 라우트 핸들러 필수)

## Coding Conventions
- 함수형 컴포넌트만 사용
- async/await 패턴 (then 체이닝 금지)
- Supabase 클라이언트는 lib/supabase.js에서 import
- Tailwind CSS 유틸리티 클래스만 사용
- Server Component 기본, 상호작용 시 "use client"

## 금지 사항
- class 컴포넌트 사용 금지
- pages/ 라우터 금지 (App Router만)
- next/router 사용 금지 (next/navigation 사용)
- CSS Modules, styled-components 금지
- createClient를 컴포넌트 내부에서 직접 정의 금지
- 환경 변수 하드코딩 금지
