# Copilot Instructions — my-first-web

## Tech Stack

### 교재 기준 (Ch10)
- Next.js 16.2.1 (App Router only)
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- shadcn/ui (components/ui/ 경로에 설치됨)
- Supabase (PostgreSQL, Auth, RLS)
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

- Default to Server Components unless a Client Component is required (e.g., /posts, /posts/[id] are Server Components)
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
- Border radius: rounded-lg (카드, 버튼 기본값)

## Component Rules

- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트 우선
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수(디자인 토큰) 사용

## Supabase CRUD Rules (Ch10)

### 데이터 모델 및 쿼리
- **컬럼명 고정**: `posts` 테이블의 컬럼명(`id`, `user_id`, `title`, `content`, `created_at`)을 임의로 변경하거나 다른 이름(authorId, body 등)을 사용하지 마십시오.
- **서버 클라이언트**: 서버 컴포넌트에서는 `lib/supabase/server.ts`의 `createClient`를 `await`하여 사용하십시오.
- **클라이언트 클라이언트**: 클라이언트 컴포넌트에서는 `lib/supabase/client.ts`의 `createClient`를 사용하십시오.
- **Foreign Key 관리**: 게시글 작성 시 `profiles` 테이블에 해당 `user.id`가 존재하는지 확인하고, 없을 경우 `upsert` 로직을 포함하여 참조 무결성 오류를 방지하십시오.

### 보안 및 권한
- **UI 분기**: 작성자 본인 확인은 `user.id === post.user_id` 조건을 사용하십시오. (단, 이는 보안이 아닌 UX 목적입니다.)
- **보안**: `service_role` 키는 서버 환경변수로만 관리하며, 브라우저/클라이언트 코드에 절대 포함하거나 노출하지 마십시오.
- **RLS**: 모든 보안은 클라이언트 if문이 아니라 DB의 RLS를 통해 강제합니다. RLS 정책 SQL은 반드시 Supabase CLI (마이그레이션 파일)로 남깁니다.

## Known AI Mistakes

- **Routing**: 절대 `next/router`를 사용하지 마십시오. 항상 `next/navigation`의 `useRouter`, `usePathname`, `useParams`를 사용하십시오.
- **Pages Router**: `pages/` 디렉토리를 생성하거나 관련 패턴을 사용하지 마십시오.
- **Auth**: `auth.signIn()` 대신 `auth.signInWithPassword()`를 사용하십시오.
- **Key Security**: `SUPABASE_SERVICE_ROLE_KEY`를 `NEXT_PUBLIC_` 접두사와 함께 사용하거나 클라이언트 측 파일에 작성하지 마십시오.
- **SSR**: 서버 컴포넌트에서 `createClient()`를 호출할 때 `await`를 누락하지 마십시오.