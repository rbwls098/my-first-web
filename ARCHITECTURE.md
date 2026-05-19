# 프로젝트 아키텍처 (ARCHITECTURE.md)

## 1. 프로젝트 목표
- **개인 사이트 구축**: 학습 내용, 개발 경험, 일상 등을 기록하고 공유할 수 있는 개인용 블로그 시스템 구축
- **최신 기술 스택 활용**: Next.js App Router 기반의 모던 웹 애플리케이션 개발 경험 학습 및 적용
- **사용자 경험(UX) 최적화**: 빠르고 직관적인 글 읽기 및 작성, 관리 경험 제공

## 2. 페이지 맵 (URL 구조)
Next.js App Router 기반의 라우팅 구조입니다.

| 페이지명 | URL Path | 설명 | 인증 |
| --- | --- | --- | --- |
| 홈 (게시글 목록) | / | 전체 게시글 목록 및 소개 노출 | 공개 |
| 로그인 | /login | 이메일/비밀번호 로그인 | 미인증만 |
| 회원가입 | /signup | 새 계정 생성 폼 | 미인증만 |
| 게시글 상세 | /posts/[id] | 개별 게시글 읽기 페이지 | 공개 |
| 게시글 작성 | /posts/new | 신규 게시글 작성 폼 | 인증 필요 |
| 마이페이지 | /mypage | 프로필 정보 및 사용자 설정 | 인증 필요 |

## 3. 유저 플로우

### 3.1. 인증 플로우
- **회원가입**: /signup -> 정보 입력 -> Supabase 회원가입 -> 로그인 페이지로 리다이렉트
- **로그인**: /login -> 정보 입력 -> Supabase 로그인 세션 확보 -> 홈(/) 리다이렉트

### 3.2. 블로그 CRUD 플로우 (Ch10)
- **조회(Read)**: 홈(/posts)에서 데이터 최신순 조회 -> 상세조회(/posts/[id]) 접근
- **작성(Create)**: middleware 로 인증 확인 -> /posts/new에서 폼 작성 (useAuth로 사용자 정보 획득) -> 목록/상세 뷰 이동
- **수정/삭제(Update/Delete)**: 본인 글인 경우에만 게시글 상세(/posts/[id])에서 수정/삭제 기능 활성화됨 (UX 처리)

---

## 4. 컴포넌트 구조

### 4.1. 공통 및 레이아웃
- **MainLayout / Header / Footer**: 서비스 전역 레이아웃. 네비게이션 및 인증 상태 표시
- **AuthProvider / useAuth**: 컨텍스트 기반 전역 세션 관리 훅

### 4.2. UI 및 로직 컴포넌트
- **PostCard / PostList**: 데이터베이스의 글 데이터를 배열로 렌더링.
- **LoginForm / SignupForm**: 사용자 입력 검증 및 Auth 요청 처리 폼.
- **PostForm**: 게시글 정보(제목, 내용)를 처리하는 폼 (작성/수정에 공통 적용 가능).

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
