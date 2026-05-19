# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-05-19
- 완료된 작업: 
  - 홈 페이지, 헤더/푸터 레이아웃, 포스트 목록 설정 (Ch7)
  - Supabase 프로젝트 생성 및 마이그레이션 적용 (Ch8)
  - Supabase Auth 인증 구현 (로그인/회원가입, AuthProvider) (Ch9)
  - Supabase CRUD 구현 및 권한 검증, 빌드 경고 해결(proxy.ts 전환) (Ch10)
- 진행 중: RLS(Row Level Security) 설정 (Ch11)
- 미착수: 덧글/좋아요 기능(Ch12), 스토리지 추가(Ch13)

## 기술 결정 사항

- 인증: Supabase Auth (Email) - 구현 완료
- 상태관리: React Context (AuthProvider) - 구현 완료
- 데이터베이스: PostgreSQL (Supabase)
- 이미지: Supabase Storage 사용 예정
- 컴포넌트 라이브러리: shadcn/ui (복사형, components/ui/에 설치)
- 디자인: Tailwind CSS 4 + 디자인 토큰

## Ch10 Supabase CRUD 진행 상황

### 환경 설정 및 버전 관리
**교재 기준**
- Next.js 16.2.1
- @supabase/supabase-js 2.47.12
- @supabase/ssr 0.5.2

**현재 설치 기준 (package.json)**
- Next.js 16.2.6
- @supabase/supabase-js 2.105.1
- @supabase/ssr 0.10.2

*정책*: 수업 프롬프트와 설명은 교재 기준으로 통일. 버전 차이(특히 패키지 버전상 차이)로 인한 오류가 생긴다면 버전 차이를 감안하여 대응한다.

### 구현 표준
- **데이터 모델**: posts (id, user_id, title, content, created_at)
- **Supabase 클라이언트**: Ch8에서 설정한 lib/supabase/client.ts 만 사용.
- **인증 연동**: useAuth / AuthProvider 를 사용하여 로그인 된 사용자 정보(user.id)를 기반으로 글 작성(Create) 수행.
- **라우터**: App Router 전용 (next/navigation만 사용, next/router 금지).
- **보안 vs UX**: 본 장에서는 작성자에게만 수정/삭제 버튼이 보이도록 클라이언트 UI 단에서 분기. 실제 보안은 Ch11의 RLS로 통제할 예정임.

### 주의사항
- posts DB 컬럼명 임의 변경 금지
- 생성 시 user_id를 입력 폼으로 받지 않고, user.id에서 가져와서 처리
- 수정/삭제 시 .eq("id", postId) 조건식 누락 주의
