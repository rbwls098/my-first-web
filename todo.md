# TODO — my-first-web

## 1단계: 기본 구조 & 아키텍처 설계 (Ch7~8)
- [x] ARCHITECTURE.md 뼈대 및 완경
- [x] .github/copilot-instructions.md 등 설정 파일 작성
- [x] shadcn/ui 초기화 (\
px shadcn init\) 및 컴포넌트 설치
- [x] 홈 페이지, 포스트 목록, 포스트 상세 레이아웃 완성
- [x] Supabase 프로젝트 생성 및 데이터베이스 스키마 작성 (profiles, posts)

## 2단계: Supabase Auth 인증 구현 (Ch9)
- [x] middleware.ts 작성 (라우트 보호)
- [x] AuthProvider 컨텍스트 생성
- [x] 로그인 페이지 (\/login\), 회원가입 페이지 (\/signup\) 구현
- [x] 로그아웃 기능 구현 및 Header 상태 반영

## 3단계: CRUD & 사용자 기능 (Ch10~11)
- [x] 포스트 목록 데이터 연결 (/posts/ Supabase Select)
- [x] 포스트 상세 데이터 연결 (/posts/[id]/ Supabase Select 단건)
- [x] 신규 포스트 작성 기능 연결 (/posts/new/ Supabase Insert)
- [x] 작성자 한정 포스트 수정/삭제 버튼 처리 (UX 분기)
- [ ] 마이페이지 (/mypage) 구성 및 작성 글 목록 표시
- [x] RLS (Row Level Security) 설정 (Ch11)
  - [x] posts RLS 마이그레이션 생성
  - [x] db push 적용
  - [x] 다른 계정 우회 테스트
  - [x] 보안 키 노출 grep
  - [x] 빌드/배포 검증

## 4단계: 고급 기능 및 UX (Ch12~13)
- [x] 전역 로딩/에러 화면 (error.tsx, loading.tsx)
- [x] 클라이언트 폼 유효성 검증
- [x] 에러 메시지 분리 및 친절한 안내 문구 적용
- [ ] 스토리지(이미지 업로드) 연동 (Ch13)

## 5단계: 배포 & 검증 (Ch13 추가 내용)
- [x] Playwright E2E 테스트 라이브러리 설치
- [x] E2E 테스트 스펙(auth-crud.spec.ts) 작성 (행복경로/거절경로 추가)
- [x] AI 코드 리뷰 및 P1~P4 레벨 로직 개선 (middleware.ts 추가, 타입 정리)
- [x] 빌드 검증 (npm run build)
- [x] Vercel 배포
- [x] 검증 보고서 작성 (`docs/검증보고서.md`)

