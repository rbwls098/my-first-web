# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-05-19
- 완료된 작업: 
  - 홈 페이지, 헤더/푸터 레이아웃, 포스트 목록 설정 (Ch7)
  - Supabase 프로젝트 생성 및 마이그레이션 적용 (Ch8)
  - Supabase Auth 인증 구현 (로그인/회원가입, AuthProvider) (Ch9)
  - Supabase CRUD 구현 및 권한 검증 (Ch10)
- 진행 중: RLS(Row Level Security) 설정 (Ch11)
- 미착수: 덧글/좋아요 기능(Ch12), 스토리지 추가(Ch13)

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
- **실제 보안**: 현재 클라이언트 UI 분기는 UX용이며, 실제 DB 보호는 Ch11 RLS에서 정책(Policy)으로 처리할 예정.
- **예외 처리**: 게시글 작성 전 `profiles` 존재 여부를 확인하고, 없을 경우 자동 생성(`upsert`)하여 참조 무결성 오류(Foreign Key Error) 방지.

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
