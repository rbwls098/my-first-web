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
- [ ] RLS (Row Level Security) 설정 (Ch11)

## 4단계: 고급 기능 (Ch12)
- [ ] 댓글 기능 (comments 테이블)
- [ ] 좋아요 기능 (likes 테이블)
- [ ] 검색/태그 기능

## 5단계: 배포 & 최적화
- [x] 빌드 검증 (npm run build)
- [x] Vercel 배포

