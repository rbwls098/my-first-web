# Project Context

> 이 파일은 copilot-instructions.md 템플릿이다. 대괄호([...]) 안의 내용을 자신의 프로젝트에 맞게 채운다.

## Tech Stack
- Next.js 14.2.21 (App Router)
- Tailwind CSS 3.4.17
- shadcn/ui (Button, Card, Input, Dialog)
- Supabase JS v2 (@supabase/supabase-js)
- Vercel 배포

## Project Structure
- app/ — 페이지 및 라우팅
- components/ — 재사용 UI 컴포넌트
- components/ui/ — shadcn/ui 컴포넌트
- lib/ — Supabase 클라이언트, 유틸리티
- public/ — 정적 파일

## Page Map
- / — [홈 페이지 설명]
- /[경로] — [페이지 설명]
- /login — 로그인
- /profile — 프로필

## Design Tokens
- Primary color: shadcn/ui --primary ([색상 설명])
- Background: --background
- Card: shadcn/ui Card 컴포넌트 (rounded-lg shadow-sm)
- Spacing: 컨텐츠 간격 space-y-6, 카드 내부 p-6
- Max width: max-w-4xl mx-auto
- 반응형: md 이상 2열 그리드, 모바일 1열

## Component Rules
- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수(디자인 토큰) 사용

## Coding Conventions
- 함수형 컴포넌트만 사용
- async/await 패턴 (then 체이닝 금지)
- Supabase 클라이언트는 lib/supabase.js에서 import
- Tailwind CSS 유틸리티 클래스만 사용
- Server Component 기본, 상호작용 시 "use client"

## 금지 사항
- class 컴포넌트 사용 금지
- pages/ 라우터 금지 (App Router만)
- CSS Modules, styled-components 금지
- createClient를 컴포넌트 내부에서 호출 금지
