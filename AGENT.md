# Copilot Instructions — my-first-web

## Tech Stack

### 교재 기준 (Ch9)
- Next.js 16.2.1 (App Router only)
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- shadcn/ui (components/ui/ 경로에 설치됨)
- Supabase (PostgreSQL, Auth)
- @supabase/supabase-js 2.47.12
- @supabase/ssr 0.5.2

### 현재 설치 기준
**주의**: 패키지 버전이 교재보다 최신일 수 있습니다.
- Next.js 16.2.6 (교재보다 최신 ✓ 2026-05-13 업데이트)
- React 19.2.3
- @supabase/supabase-js 2.105.1 (교재보다 훨씬 최신)
- @supabase/ssr 0.10.2 (교재보다 훨씬 최신)

**정책**: 수업 프롬프트와 설명은 교재 기준으로 통일. 버전 차이로 인한 빌드 오류 시 package.json 기준으로 원인 분석.

## Coding Conventions

- Default to Server Components unless a Client Component is required
- Use Tailwind CSS for styling
- Keep components simple and easy to verify
- Prefer files inside `app/` for routes
- Import paths: `@/components/...` for absolute imports

## Design Tokens

- Primary color: shadcn/ui --primary (현재: 어두운 파란색 계열)
- Background: --background (흰색)
- Foreground: --foreground (검은색)
- Card: shadcn/ui Card 컴포넌트 사용 (rounded-lg shadow-sm)
- Spacing: 컨텐츠 간격 space-y-6, 카드 내부 p-6
- Max width: max-w-4xl mx-auto (메인 컨텐츠)
- 반응형: md 이상 2열 그리드, 모바일 1열
- Border radius: rounded-lg (카드, 버튼 기본값)

## Component Rules

- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트 우선
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수(디자인 토큰) 사용
- 모든 상호작용 요소는 shadcn/ui 컴포넌트 활용

## Supabase Auth Rules (Ch9)

### 인증 메커니즘
- **인증 방식**: 이메일/비밀번호만 사용 (signInWithPassword)
- **라우트 보호**: middleware.ts 사용 (인증 필요 페이지 접근 제어)
- **세션 관리**: @supabase/ssr으로 쿠키 기반 세션 유지
- **상태관리**: React Context + AuthProvider (전역 인증 상태)

### 구현 표준
- **로그인 함수**: `client.auth.signInWithPassword()` 사용
- **회원가입 함수**: `client.auth.signUp()` 사용
- **로그아웃 함수**: `client.auth.signOut()` 사용
- **현재 세션**: `client.auth.getSession()` 또는 `client.auth.getUser()` 사용

### 금지 사항
- ❌ 구버전 `auth.signIn()` 미사용
- ❌ 소셜 로그인 (Google, GitHub 등) 미구현
- ❌ service_role 키는 클라이언트에 절대 미포함
- ❌ Pages Router, next/router, pages/ 디렉토리 미사용

### 환경변수
```
NEXT_PUBLIC_SUPABASE_URL=<프로젝트 URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<익명 키>
```

## Known AI Mistakes

- Do not use `next/router`; use `next/navigation` when navigation is needed
- Do not create `pages/` router files; this project uses the App Router
- Do not add `"use client"` unless interactivity or browser APIs are actually needed
- Do not use hardcoded colors (like bg-blue-500); always use design tokens (like bg-primary)
- Do not import from `components/ui/` without verifying the file exists
- Do not use Pages Router pattern like `/pages/about.tsx`
- **Auth**: Do not use `auth.signIn()`; use `auth.signInWithPassword()` instead
- **Auth**: Do not add service_role key to client code
- **Auth**: Do not implement social login; email/password only
- **Routing**: Do not use `useRouter()` in Server Components; use `redirect()` or `middleware.ts` instead