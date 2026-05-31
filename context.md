# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-05-19
- 완료된 작업: 
  - 홈 페이지, 헤더/푸터 레이아웃, 포스트 목록 설정 (Ch7)
  - Supabase 프로젝트 생성 및 마이그레이션 적용 (Ch8)
  - Supabase Auth 인증 구현 (로그인/회원가입, AuthProvider) (Ch9)
  - Supabase CRUD 구현 및 권한 검증 (Ch10)
  - posts 테이블 RLS(Row Level Security) 마이그레이션 적용 (Ch11)
  - 에러 처리와 로딩 UX 적용, 폼 검증 (Ch12)
- 진행 중: 없음
- 미착수: 이미지 등 스토리지 추가(Ch13)

## 기술 결정 사항

- 인증: Supabase Auth (Email) - 구현 완료
- 상태관리: React Context (AuthProvider) - 구현 완료
- 데이터베이스: PostgreSQL (Supabase)
- 이미지: Supabase Storage 사용 예정
- 컴포넌트 라이브러리: shadcn/ui (복사형, components/ui/에 설치)
- 디자인: Tailwind CSS 4 + 디자인 토큰

## Ch10 Supabase CRUD 구현 상세

### 파일 목록 및 역할
- `app/posts/page.tsx`: 게시글 목록 (Server Component)
- `app/posts/[id]/page.tsx`: 게시글 상세 (Server Component)
- `app/posts/new/page.tsx`: 게시글 작성 (Client Component)
- `app/posts/[id]/edit/page.tsx`: 게시글 수정 (Client Component)
- `app/posts/[id]/PostActions.tsx`: 수정/삭제 버튼 제어 (Client Component)
- `lib/supabase/server.ts`: 서버 사이드 Supabase 클라이언트 (createServerClient)
- `lib/supabase/client.ts`: 클라이언트 사이드 Supabase 클라이언트 (createBrowserClient)

### Supabase 쿼리 패턴
- **목록 조회**: `supabase.from("posts").select("id, title, content, created_at, user_id").order("created_at", { ascending: false })`
- **단건 조회**: `supabase.from("posts").select("*").eq("id", id).single()`
- **생성**: `supabase.from("posts").insert({ title, content, user_id: user.id })`
- **수정**: `supabase.from("posts").update({ title, content }).eq("id", id)`
- **삭제**: `supabase.from("posts").delete().eq("id", id)`

### 보안 및 UX 정책
- **작성자 UI 분기**: `user.id === post.user_id`를 비교하여 수정/삭제 버튼 노출 여부 결정.
- **실제 보안 (RLS)**: 클라이언트 UI 분기와는 별개로 Supabase 데이터베이스 레벨에서 정책(Policy)으로 원천 차단함 (Ch11 RLS).
  - 적용 정책: SELECT 누구나, INSERT 로그인 본인, UPDATE 작성자 본인, DELETE 작성자 본인
  - 마이그레이션 파일: `supabase/migrations/20260521053522_add_posts_rls.sql`
  - 테스트 결과: 비로그인(게시판 조회 가능/작성 거부), 사용자 A(자신의 글 작성/수정/삭제 모두 성공), 사용자 B(A 작성 글 강제 수정/삭제 시도시 접근 불가로 방어 성공)
- **예외 처리**: 게시글 작성 전 `profiles` 존재 여부를 확인하고, 없을 경우 자동 생성(`upsert`)하여 참조 무결성 오류(Foreign Key Error) 방지.

## Ch12 에러 처리 및 UX (추가 내용)
- **상태 관리 UI (`loading.tsx`, `error.tsx`)**: 데이터 인출 시 스켈레톤 UI를 제공하고 에러가 발생 시 `error.tsx` 바운더리를 통해 안전하게 화면을 렌더링.
- **빈 상태 처리**: 글이 없는 경우 안내 메시지 표시.
- **클라이언트 폼 검증**: 저장 중 중복 서밋 방지(disable) 및 폼 검증(최소 글자수) 연동 적용.
- **에러 메시징 유틸 (`lib/error-message.ts`)**: 알 수 없는 Supabase 시스템 에러코드를 사용자 친화적 메시지("권한이 없습니다", "페이지를 찾을 수 없습니다" 등)로 치환.

## Ch13 AI 결과물 검증 (추가 내용)
- **Playwright E2E**: 로그인 후 CRUD 프로세스 플로우(행복 경로)와 비인증 사용자의 글 작성 거절 플로우 테스트가 추가되었습니다 (`tests/auth-crud.spec.ts`).
- **코드 리뷰 보안 패치**: 클라이언트 검증만 있던 기존 라우트를 보완하기 위해 Supabase 세션을 확인하는 `middleware.ts`(보호 라우트)가 프로젝트에 완전히 적용되었습니다.
- **보고서 작성**: `docs/검증보고서.md` 를 통해 테스트/Vercel URL 환경의 시나리오 검증 결과가 준비되었습니다.

## 환경 설정 및 버전 관리
**교재 기준**
- Next.js 16.2.1
- @supabase/supabase-js 2.47.12
- @supabase/ssr 0.5.2

**현재 설치 기준 (package.json)**
- Next.js 16.2.6
- @supabase/supabase-js 2.105.1
- @supabase/ssr 0.10.2

*정책*: 수업 프롬프트와 설명은 교재 기준으로 통일. 버전 차이(특히 패키지 버전상 차이)로 인한 오류가 생긴다면 버전 차이를 감안하여 대응한다.
