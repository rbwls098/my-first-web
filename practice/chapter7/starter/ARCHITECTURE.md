# Architecture — [프로젝트 이름]

> 이 파일은 설계서 템플릿이다. 대괄호([...]) 안의 내용을 자신의 프로젝트에 맞게 채운다.

## Page Map
- / — [홈 페이지 설명]
- /[페이지]/[id] — [상세 페이지 설명]
- /[페이지]/new — [작성 페이지 설명]
- /login — 로그인 (Google OAuth)
- /profile — 프로필 (내 [콘텐츠] 목록)

## User Flow
- [콘텐츠] 읽기: 홈 → 카드 클릭 → 상세 페이지
- [콘텐츠] 쓰기: 홈 → 글쓰기 버튼 → (로그인 필요 시 리다이렉트) → 작성 → 제출 → 상세
- [콘텐츠] 수정: 상세 → 수정 버튼 (작성자만 표시) → 수정 → 제출 → 상세

## Component Hierarchy
Layout
├── Header (네비게이션: 로고, 글쓰기, 로그인/프로필)
├── Main
│   ├── [목록 컴포넌트] (카드 목록)
│   ├── [상세 컴포넌트] (상세 보기)
│   ├── [폼 컴포넌트] (작성/수정 폼)
│   ├── LoginPage (로그인)
│   └── ProfilePage (프로필 + 내 [콘텐츠])
└── Footer

## Data Model

### users
- id: UUID (Supabase auth.users 참조)
- email: text
- name: text
- avatar_url: text

### [메인 테이블 이름]
- id: UUID (자동 생성)
- title: text (필수)
- content: text (필수)
- [추가 필드]: [타입] ([설명])
- author_id: UUID (→ users.id, 외래 키)
- created_at: timestamptz (자동 생성)

### 관계
- users 1:N [메인 테이블] (한 사용자가 여러 [콘텐츠] 작성)

## Design Tokens
- Primary: shadcn/ui --primary ([색상 설명])
- Background: --background
- Components: shadcn/ui (Button, Card, Input, Dialog)
- Layout: max-w-4xl mx-auto, space-y-6
- Responsive: md:grid-cols-2, 모바일 1열
