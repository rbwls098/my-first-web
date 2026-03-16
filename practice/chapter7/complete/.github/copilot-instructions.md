# Project Context — 맛집 리뷰 앱

## Tech Stack
- Next.js 14.2.21 (App Router)
- Tailwind CSS 3.4.17
- shadcn/ui (Button, Card, Input, Dialog, Avatar, Badge)
- Supabase JS v2 (@supabase/supabase-js)
- Vercel 배포

## Project Structure
- app/ — 페이지 및 라우팅
- components/ — 재사용 UI 컴포넌트
- components/ui/ — shadcn/ui 컴포넌트
- lib/ — Supabase 클라이언트, 유틸리티
- public/ — 정적 파일

## Page Map
- / — 홈 (리뷰 목록, 검색, 별점 필터)
- /reviews/[id] — 리뷰 상세
- /reviews/new — 리뷰 작성 (로그인 필수)
- /reviews/[id]/edit — 리뷰 수정 (작성자만)
- /login — 로그인 (Google OAuth)
- /profile — 프로필 (내 리뷰 목록)

## Data Model
- users: id, email, name, avatar_url
- reviews: id, title, content, rating, image_url, author_id (→ users.id), created_at

## Design Tokens
- Primary color: shadcn/ui --primary (따뜻한 오렌지 계열)
- Background: --background (밝은 크림색)
- Card: shadcn/ui Card 컴포넌트 (rounded-lg shadow-sm)
- Spacing: 컨텐츠 간격 space-y-6, 카드 내부 p-6
- Max width: max-w-4xl mx-auto
- 반응형: md 이상 2열 그리드, 모바일 1열
- 별점: text-yellow-400 (★ 아이콘)

## Component Rules
- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트 우선
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
- Tailwind 색상 직접 사용 금지 (bg-blue-500 등) → 디자인 토큰 사용
