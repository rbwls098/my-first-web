# Copilot Instructions — my-first-web

## Tech Stack

- Next.js 16.2.1 (App Router only)
- React 19.2.4
- Tailwind CSS 4
- shadcn/ui (components/ui/ 경로에 설치됨)
- TypeScript

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

## Known AI Mistakes

- Do not use `next/router`; use `next/navigation` when navigation is needed
- Do not create `pages/` router files; this project uses the App Router
- Do not add `"use client"` unless interactivity or browser APIs are actually needed
- Do not use hardcoded colors (like bg-blue-500); always use design tokens (like bg-primary)
- Do not import from `components/ui/` without verifying the file exists
- Do not use Pages Router pattern like `/pages/about.tsx`
