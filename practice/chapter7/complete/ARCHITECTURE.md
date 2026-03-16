# Architecture — 맛집 리뷰 앱

## Page Map
- / — 홈 (리뷰 목록, 검색, 별점 필터)
- /reviews/[id] — 리뷰 상세 (본문, 이미지, 별점)
- /reviews/new — 리뷰 작성 (로그인 필수)
- /reviews/[id]/edit — 리뷰 수정 (작성자만)
- /login — 로그인 (Google OAuth)
- /profile — 프로필 (내 리뷰 목록)

## User Flow
- 리뷰 읽기: 홈 → 카드 클릭 → 상세 페이지
- 리뷰 쓰기: 홈 → 글쓰기 버튼 → (로그인 필요 시 /login으로 리다이렉트) → 작성 → 제출 → 상세
- 리뷰 수정: 상세 → 수정 버튼 (작성자만 표시) → 수정 → 제출 → 상세
- 리뷰 삭제: 상세 → 삭제 버튼 (작성자만 표시) → confirm → 홈

## Component Hierarchy
Layout
├── Header (네비게이션: 로고, 글쓰기, 로그인/프로필)
├── Main
│   ├── ReviewList (리뷰 카드 목록 + 검색 + 별점 필터)
│   ├── ReviewDetail (리뷰 상세: 본문, 이미지, 별점)
│   ├── ReviewForm (리뷰 작성/수정 폼)
│   ├── LoginPage (Google 로그인)
│   └── ProfilePage (프로필 + 내 리뷰)
└── Footer

## Data Model

### users
- id: UUID (Supabase auth.users 참조)
- email: text
- name: text
- avatar_url: text

### reviews
- id: UUID (자동 생성)
- title: text (필수, 가게 이름)
- content: text (필수, 리뷰 본문)
- rating: integer (필수, 1-5)
- image_url: text (선택, 음식 사진)
- author_id: UUID (→ users.id, 외래 키)
- created_at: timestamptz (자동 생성)

### 관계
- users 1:N reviews (한 사용자가 여러 리뷰 작성)

## Design Tokens
- Primary: shadcn/ui --primary (따뜻한 오렌지 계열)
- Background: --background (밝은 크림색)
- Components: shadcn/ui (Button, Card, Input, Dialog, Avatar, Badge)
- Layout: max-w-4xl mx-auto, space-y-6
- Responsive: md:grid-cols-2, 모바일 1열
- 별점: text-yellow-400 (★ 아이콘)
