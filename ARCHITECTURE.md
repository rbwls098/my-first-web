# 프로젝트 아키텍처 (ARCHITECTURE.md)

## 1. 프로젝트 목표
- **개인 사이트 구축**: 학습 내용, 개발 경험, 일상 등을 기록하고 공유할 수 있는 개인용 블로그 시스템 구축
- **최신 기술 스택 활용**: Next.js App Router 기반의 모던 웹 애플리케이션 개발 경험 학습 및 적용
- **사용자 경험(UX) 최적화**: 빠르고 직관적인 글 읽기 및 작성, 관리 경험 제공

## 2. 페이지 맵 (URL 구조)
Next.js App Router 기반의 라우팅 구조입니다.

| 페이지명 | URL Path | 설명 | 인증 |
| --- | --- | --- | --- |
| 홈 (게시글 목록) | `/` | 전체 게시글 목록 및 소개 노출 (`app/page.tsx`) | 공개 |
| 로그인 | `/login` | 이메일/비밀번호 로그인 (`app/login/page.tsx`) | 미인증만 접근 |
| 회원가입 | `/signup` | 새 계정 생성 폼 (`app/signup/page.tsx`) | 미인증만 접근 |
| 게시글 상세 | `/posts/[id]` | 개별 게시글 읽기 페이지 (`app/posts/[id]/page.tsx`) | 공개 |
| 게시글 작성 | `/posts/new` | 신규 게시글 작성 폼 (`app/posts/new/page.tsx`) | 인증 필요 |
| 마이페이지 | `/mypage` | 프로필 정보 및 사용자 설정 (`app/mypage/page.tsx`) | 인증 필요 |

## 3. 유저 플로우

### 3.1. 회원가입 플로우 (Ch9)
1. **회원가입 페이지 진입**: `/signup` 접속
2. **정보 입력**: 이메일 및 비밀번호 입력
3. **계정 생성**: Supabase Auth에 가입 요청
4. **완료**: 로그인 페이지로 자동 리다이렉트

### 3.2. 로그인 플로우 (Ch9)
1. **로그인 페이지 진입**: `/login` 접속
2. **인증**: 이메일과 비밀번호로 signInWithPassword() 호출
3. **세션 생성**: Supabase Auth에서 세션 토큰 발급
4. **리다이렉트**: 인증 성공 후 홈(`/`) 또는 이전 페이지로 이동

### 3.3. 글 읽기 플로우
1. **홈 화면 진입** (`/`): 최신 게시글 목록 확인
2. **게시글 클릭**: 읽고 싶은 게시글 선택
3. **글 상세 조회** (`/posts/[id]`): 게시글 본문 읽기 및 목록으로 돌아가기

### 3.4. 글 작성 플로우
1. **인증 확인**: middleware.ts에서 로그인 상태 확인 (미인증 → `/login` 리다이렉트)
2. **작성 버튼 클릭**: 홈 또는 네비게이션 바에서 '글쓰기' 클릭
3. **에디터 진입** (`/posts/new`): 제목 및 본문 입력 폼 작성
4. **저장/발행**: 폼 제출 시 서버에 데이터 저장 요청
5. **결과 확인**: 저장이 완료되면 방금 작성한 글 상세 페이지(`/posts/[id]`)로 자동 이동

### 3.5. 마이페이지 플로우
1. **마이페이지 진입**: 메뉴에서 프로필/마이페이지 탭 클릭 (`/mypage`)
2. **정보 확인**: 내 프로필 정보 및 활동(내가 쓴 글 등) 조회
3. **정보 수정**: 필요한 프로필 설정이나 환경 설정 변경 후 저장

---

## 4. 컴포넌트 구조

### 4.1. 레이아웃 & 상태관리 (Ch9)
- **Header**: 로고, 네비게이션 메뉴, 사용자 정보 (인증 상태 표시)
- **Footer**: 사이트 정보, 링크
- **MainLayout**: Header + 콘텐츠 영역 + Footer
- **AuthProvider** (Context): 전역 인증 상태 관리 (로그인 사용자 정보, 세션 관리)
- **middleware.ts**: 라우트 보호 (인증 필요 페이지 접근 제어)

### 4.2. shadcn/ui 컴포넌트 활용

| 페이지 | 주요 컴포넌트 | 용도 |
| --- | --- | --- |
| 홈 (`/`) | Card, Button | 글 목록 카드화, 글쓰기 버튼 |
| 로그인 (`/login`) | Input, Button | 이메일/비밀번호 입력, 로그인 버튼 |
| 회원가입 (`/signup`) | Input, Button | 회원정보 입력, 가입 버튼 |
| 글 상세 (`/posts/[id]`) | Card, Button | 글 본문 표시, 수정/삭제 버튼 |
| 글 작성 (`/posts/new`) | Input, Button, Dialog | 제목/본문 입력, 저장 버튼, 확인 다이얼로그 |
| 마이페이지 (`/mypage`) | Card, Button | 프로필 정보 표시, 설정 버튼 |

### 4.3. 커스텀 컴포넌트
- **PostCard**: 글 목록에서 사용하는 카드 (shadcn/ui Card 래핑)
- **PostList**: 글 목록 배열 렌더링
- **Navigation**: 헤더 네비게이션 (shadcn/ui 컴포넌트 조합)
- **AuthContext** (Ch9): 인증 상태와 사용자 정보 제공 (useAuth 훅)
- **LoginForm**: 로그인 폼 (이메일, 비밀번호, 제출 로직)
- **SignupForm**: 회원가입 폼 (이메일, 비밀번호 입력 및 유효성 검증)

## 5. 데이터 모델

### 5.1. profiles (사용자 프로필)

```
profiles
├── id: uuid (PK, auth.users 참조)
├── username: text (사용자명)
├── avatar_url: text (프로필 이미지 URL)
├── bio: text (간단한 소개)
├── role: varchar (기본값: 'user', 가능값: 'user', 'admin')
└── created_at: timestamptz (프로필 생성일)
```

### 5.2. posts (블로그 포스트)

```
posts
├── id: uuid (PK)
├── user_id: uuid (FK → profiles.id)
├── title: text (포스트 제목)
├── content: text (포스트 본문)
├── excerpt: text (포스트 요약)
├── published: boolean (발행 상태, 기본값: true)
├── created_at: timestamptz (작성일)
├── updated_at: timestamptz (수정일)
└── views: integer (조회수, 기본값: 0)
```

### 5.3. 관계 구조

```
profiles (1) ──→ (N) posts
  users          (user_id FK)
```

- 한 사용자가 여러 개의 포스트 작성 가능
- posts.user_id는 profiles.id를 참조하는 외래키
- 사용자 삭제 시 RESTRICT (포스트 먼저 삭제 필요)

### 5.4. 데이터 흐름

1. **포스트 작성**: 사용자가 `/posts/new`에서 제목과 본문 입력 → posts 테이블에 저장
2. **포스트 조회**: 홈(`/`)에서 posts 테이블의 모든 글 조회 → Card로 렌더링
3. **상세 조회**: `/posts/[id]`에서 특정 post 조회 → 해당 user_id로 작성자 정보 조회
4. **마이페이지**: 로그인한 사용자의 profile 정보 및 본인이 작성한 posts 조회
