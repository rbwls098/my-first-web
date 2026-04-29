# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-04-29
- 완료된 작업: 
  - 홈 페이지, 헤더/푸터 레이아웃, 포스트 목록
  - ARCHITECTURE.md 기본 구조
  - .github/copilot-instructions.md 완성
  - ARCHITECTURE.md 완성 (컴포넌트 구조 + 데이터 모델 추가)
  - context.md, todo.md 작성 완료
  - 모든 설계 문서 GitHub 커밋
- 진행 중: Supabase 데이터베이스 연결 (Ch8 준비)
- 미착수: 마이페이지, 인증 시스템

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