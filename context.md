# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-05-13
- 완료된 작업: 
  - 홈 페이지, 헤더/푸터 레이아웃, 포스트 목록
  - ARCHITECTURE.md 기본 구조
  - .github/copilot-instructions.md, AGENT.md 완성
  - ARCHITECTURE.md 완성 (컴포넌트 구조 + 데이터 모델 추가)
  - context.md, todo.md 작성 완료
  - 모든 설계 문서 GitHub 커밋
  - Supabase 프로젝트 생성 및 마이그레이션 적용 (Ch8)
- 진행 중: Supabase Auth 구현 시작 (Ch9)
- 미착수: 마이페이지, CRUD 기능 (Ch10~11)

## 기술 결정 사항

- 인증: Supabase Auth (Email)
- 상태관리: React Context (AuthProvider)
- 이미지: Supabase Storage 사용 예정
- 컴포넌트 라이브러리: shadcn/ui (복사형, components/ui/에 설치)
- 디자인: Tailwind CSS 4 + 디자인 토큰
- 데이터베이스: PostgreSQL (Supabase)

## 해결된 이슈

- shadcn/ui Button variant 불일치 → globals.css 수정
- 모바일 헤더 메뉴 겹침 → Sheet 컴포넌트 교체
- AGENT.md 구조 → .github/copilot-instructions.md 통합
- todo.md 오류 → 체크박스 형식 수정

## 알게 된 점

- Tailwind CSS 4: `@import "tailwindcss"` + `@theme` 블록 사용
- Server Component에서 useRouter 불가 → redirect() 사용
- 설계 문서 4종이 Ch7에서 가장 중요
- 범용 파일과 프로젝트별 파일의 구분 필수
- 세션 시작 시 #file 참조로 Copilot 전체 맥락 파악

---

## Ch9 Supabase Auth 진행 상황

### 환경 설정
- **환경변수**: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (Ch8에서 설정)
- **라이브러리**: @supabase/supabase-js, @supabase/ssr (package.json 설치됨)

### 구현 표준
- **인증 방식**: 이메일/비밀번호 (signInWithPassword)
- **라우트 보호**: middleware.ts 사용
- **상태관리**: React Context + AuthProvider
- **클라이언트 마킹**: "use client" 지시어 필요 (Auth 관련 컴포넌트)

### 주의사항
- ❌ auth.signIn() 구버전 미사용
- ❌ service_role 키는 클라이언트 미포함
- ❌ 소셜 로그인 미구현
- ❌ Pages Router, next/router 미사용

### 버전 관리
**교재 기준**
- Next.js 16.2.1
- @supabase/supabase-js 2.47.12
- @supabase/ssr 0.5.2

**현재 설치 기준**
- Next.js 16.2.6 (교재보다 최신 ✓ 업데이트 완료)
- @supabase/supabase-js 2.105.1 (교재보다 훨씬 최신)
- @supabase/ssr 0.10.2 (교재보다 훨씬 최신)

**정책**: 수업 프롬프트와 설명은 교재 기준으로 통일. 버전 차이로 인한 빌드 오류 발생 시 package.json 기준으로 원인 분석.