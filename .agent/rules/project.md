# Project Rules — my-first-web

## 파일 구조 규칙

### 도메인별 파일 위치
- **페이지**: `app/` (Route Handler 제외)
- **컴포넌트**: `components/` (shadcn/ui는 `components/ui/`)
- **서버 유틸리티**: `lib/` (posts.ts, utils.ts, supabase/client.ts 등)
- **설정 파일**: 프로젝트 루트 (next.config.ts, tsconfig.json, 등)
- **문서**: `docs/` (교재 문서)
- **연습 코드**: `practice/chapterN/` (각 장별 완성/시작 코드)

### 공개 자산
- **정적 파일**: `public/` (이미지, 폰트 등)
- **Supabase 설정**: `supabase/` (마이그레이션, config.toml)

## 코딩 표준 (Ch9)

### 클라이언트 vs 서버 컴포넌트
```typescript
// Server Component (기본값)
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}

// Client Component (상호작용 필요할 때만)
'use client';
import { useState } from 'react';
export function InteractiveComponent() { ... }
```

### Supabase 클라이언트 사용
```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;
```

### 인증 확인 패턴 (Ch9)
```typescript
// 로그인 사용자만 접근 가능
import { redirect } from 'next/navigation';
import supabase from '@/lib/supabase/client';

export default async function ProtectedPage() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');
  
  // 보호된 콘텐츠
}
```

## 디버깅 가이드

### 공통 오류
| 오류 | 원인 | 해결책 |
| --- | --- | --- |
| `Cannot find module 'next/router'` | Pages Router 혼용 | App Router만 사용 |
| `Error: useRouter() must be used inside next/navigation` | 잘못된 import | `next/navigation` 사용 |
| `"use client" is not allowed` | Server Component에서 클라이언트 API 사용 | 컴포넌트 분리 |
| `auth.signIn is not a function` | 구버전 Auth API | `signInWithPassword()` 사용 |

### 버전 확인
```bash
npm list next
npm list @supabase/supabase-js
npm list @supabase/ssr
```

## 커밋 메시지 규칙

### 형식
```
[Ch장번] 기능명: 간단한 설명

- 상세 변경사항 1
- 상세 변경사항 2
```

### 예시
```
[Ch9] Auth: 로그인/회원가입 페이지 구현

- 로그인 페이지 추가 (signInWithPassword 사용)
- 회원가입 페이지 추가 (폼 유효성 검증)
- AuthProvider 컨텍스트 설정
- middleware.ts로 라우트 보호
```

## 성능 및 보안 체크리스트

### 보안 (Must)
- [ ] service_role 키가 클라이언트 코드에 없음
- [ ] 민감한 정보 (비밀번호 해시 등)이 로그에 노출 안됨
- [ ] 환경변수는 .env.local에만 저장 (깃 무시)

### 성능
- [ ] 불필요한 클라이언트 마킹 제거
- [ ] 대형 라이브러리는 동적 import 고려
- [ ] 이미지는 Next.js Image 컴포넌트 사용

## 테스트 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드 검증
npm run build

# 린트 검사
npm run lint
```

## 참고 문서

- **AGENT.md**: 기본 기술 스택 및 규칙
- **ARCHITECTURE.md**: 페이지 맵, 데이터 모델, 컴포넌트 구조
- **context.md**: 프로젝트 진행 상태 및 기술 결정
