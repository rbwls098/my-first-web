# 프로젝트 아키텍처 (ARCHITECTURE.md)

## 1. 프로젝트 목표
- **개인 사이트 구축**: 학습 내용, 개발 경험, 일상 등을 기록하고 공유할 수 있는 개인용 블로그 시스템 구축
- **최신 기술 스택 활용**: Next.js App Router 기반의 모던 웹 애플리케이션 개발 경험 학습 및 적용
- **사용자 경험(UX) 최적화**: 빠르고 직관적인 글 읽기 및 작성, 관리 경험 제공

## 2. 페이지 맵 (URL 구조)
Next.js App Router 기반의 라우팅 구조입니다.

| 페이지명 | URL Path | 설명 | 인증 |
| --- | --- | --- | --- |
| 홈 (소개) | / | 서비스 소개 및 메인 페이지 | 공개 |
| 게시글 목록 | /posts | 전체 게시글 목록 최신순 노출 | 공개 |
| 게시글 상세 | /posts/[id] | 개별 게시글 읽기 페이지 | 공개 |
| 게시글 작성 | /posts/new | 신규 게시글 작성 폼 | 인증 필요 |
| 게시글 수정 | /posts/[id]/edit | 기존 게시글 수정 폼 | 인증 필요 |
| 로그인 | /login | 이메일/비밀번호 로그인 | 미인증만 |
| 회원가입 | /signup | 새 계정 생성 폼 | 미인증만 |
| 마이페이지 | /mypage | 프로필 정보 및 사용자 설정 | 인증 필요 |

## 3. 유저 플로우

### 3.1. 인증 플로우
- **회원가입**: /signup -> 정보 입력 -> Supabase 회원가입 -> 로그인 페이지로 리다이렉트
- **로그인**: /login -> 정보 입력 -> Supabase 로그인 세션 확보 -> 홈(/) 리다이렉트

### 3.2. 블로그 CRUD 플로우 (Ch10)
- **조회(Read)**: /posts에서 최신순 조회 -> 상세조회(/posts/[id]) 접근
- **작성(Create)**: /posts/new에서 폼 작성 (useAuth로 사용자 ID 획득) -> 성공 시 상세 페이지 이동
- **수정/삭제(Update/Delete)**: 본인 글인 경우에만 상세 페이지에서 `PostActions` 컴포넌트를 통해 수정/삭제 기능 활성화

---

## 4. 컴포넌트 구조

### 4.1. 공통 및 레이아웃
- **MainLayout / Header / Footer**: 서비스 전역 레이아웃 및 네비게이션
- **AuthProvider / useAuth**: 컨텍스트 기반 전역 세션 관리 훅

### 4.2. 도메인 컴포넌트 (Ch10)
- **PostList**: 게시글 배열을 받아 `Link`와 함께 목록 렌더링
- **PostActions**: 상세 페이지에서 수정(Link) 및 삭제(Button) 기능을 담당 (Client Component)
- **PostForm**: (향후 통합 예정) 현재는 작성/수정 페이지에 각각 인라인 폼 형태로 구현됨

## 5. 데이터 모델 (Ch8 기준 유지)

### 5.1. profiles (사용자 프로필)
\\\	ext
profiles
├── id: uuid (PK, auth.users 참조)
├── username: text (사용자명)
├── avatar_url: text (프로필 이미지 URL)
└── role: varchar
\\\

### 5.2. posts (블로그 포스트)
\\\	ext
posts
├── id: uuid (PK)
├── user_id: uuid (FK → profiles.id)
├── title: text (게시글 제목)
├── content: text (게시글 내용)
└── created_at: timestamptz (게시글 생성일시)
\\\

(주의: users 나 authorId 같은 임의 컬럼명은 사용하지 않으며 위 명세서를 따릅니다.)
