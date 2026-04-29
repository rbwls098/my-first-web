# TODO — my-first-web

## 1단계: 기본 구조 & 아키텍처 설계 (Ch7~8)

- [x] ARCHITECTURE.md 뼈대 작성 (페이지 맵, 유저 플로우)
- [x] ARCHITECTURE.md 완성 (컴포넌트 구조, 데이터 모델)
- [x] .github/copilot-instructions.md 작성 (Tech Stack, Conventions, Design Tokens)
- [x] context.md 작성 (프로젝트 상태, 기술 결정, 이슈 해결)
- [x] todo.md 작성 (작업 체크리스트)
- [x] shadcn/ui 초기화 (`npx shadcn init`)
- [x] shadcn/ui 컴포넌트 설치 (Button, Card, Input, Dialog)
- [x] 헤더/푸터 레이아웃
- [x] 홈 페이지 (`/`)
- [x] 포스트 목록 페이지 (`/posts`)
- [x] 포스트 상세 페이지 (`/posts/[id]`)
- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 스키마 작성 (profiles, posts 테이블)

## 2단계: 데이터 연동 & 인증 (Ch8~9)

- [ ] Supabase 연결 설정
- [ ] posts 테이블에서 데이터 조회 로직
- [ ] 포스트 목록 페이지 동적 렌더링
- [ ] 포스트 상세 페이지 동적 렌더링
- [ ] 포스트 작성 페이지 (`/posts/new`) 구현
- [ ] 포스트 생성 API 연결
- [ ] Supabase Auth 로그인 구현
- [ ] 회원가입 페이지 (`/signup`)
- [ ] 인증 상태 관리 (AuthProvider)

## 3단계: CRUD & 사용자 기능 (Ch10~11)

- [ ] 포스트 수정 기능 (`/posts/[id]/edit`)
- [ ] 포스트 삭제 기능
- [ ] 마이페이지 (`/mypage`) - 프로필 정보 조회
- [ ] 마이페이지 - 내가 작성한 글 목록
- [ ] 프로필 수정 기능
- [ ] RLS (Row Level Security) 설정

## 4단계: 고급 기능 (Ch12)

- [ ] 댓글 기능 (comments 테이블)
- [ ] 좋아요 기능 (likes 테이블)
- [ ] 검색 기능
- [ ] 태그 기능

## 5단계: 배포 & 최적화

- [ ] 성능 최적화 (이미지 최적화, 캐싱)
- [ ] SEO 최적화
- [ ] Vercel 배포
- [ ] 모니터링 설정

---

## 진행률: 13/30 (43%)

**완료된 항목**: 1~8단계 (기본 구조)
**진행 예상**: Ch8에서 Supabase 연동 시작
