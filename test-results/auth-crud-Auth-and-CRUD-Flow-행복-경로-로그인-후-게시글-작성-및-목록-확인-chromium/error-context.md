# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-crud.spec.ts >> Auth and CRUD Flow >> 행복 경로: 로그인 후 게시글 작성 및 목록 확인
- Location: tests\auth-crud.spec.ts:9:7

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.fill: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByLabel('이메일', { exact: true })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "내 블로그" [ref=e4] [cursor=pointer]:
        - /url: /
      - generic [ref=e5]:
        - link "홈" [ref=e6] [cursor=pointer]:
          - /url: /
        - link "블로그" [ref=e7] [cursor=pointer]:
          - /url: /posts
        - link "새 글 쓰기" [ref=e8] [cursor=pointer]:
          - /url: /posts/new
        - button "로그아웃" [ref=e9] [cursor=pointer]
  - main [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e12]:
        - heading "게시글 목록" [level=1] [ref=e13]
        - link "새 글 작성" [ref=e14] [cursor=pointer]:
          - /url: /posts/new
      - generic [ref=e15]:
        - textbox "검색어를 입력하세요" [ref=e17]
        - 'link "dddddddd dddddddd 작성자 ID: ef196f11-1721-4aa0-8129-9f8f952e8023 2026-05-21" [ref=e19] [cursor=pointer]':
          - /url: /posts/cc3ba83a-4907-4b86-a04a-13a68e8f625c
          - generic [ref=e20]:
            - heading "dddddddd" [level=2] [ref=e21]
            - paragraph [ref=e22]: dddddddd
            - generic [ref=e23]:
              - generic [ref=e24]: "작성자 ID: ef196f11-1721-4aa0-8129-9f8f952e8023"
              - generic [ref=e25]: 2026-05-21
  - contentinfo [ref=e26]: © 2026 내 블로그
  - button "Open Next.js Dev Tools" [ref=e32] [cursor=pointer]:
    - img [ref=e33]
  - alert [ref=e36]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // 테스트 전 더미 환경 변수 확인
  4  | // 실행 시 $env:TEST_EMAIL="test@example.com"; $env:TEST_PASSWORD="password" npx playwright test 처럼 실행
  5  | const TEST_EMAIL = process.env.TEST_EMAIL || 'test@example.com';
  6  | const TEST_PASSWORD = process.env.TEST_PASSWORD || 'password123';
  7  | 
  8  | test.describe('Auth and CRUD Flow', () => {
  9  |   test('행복 경로: 로그인 후 게시글 작성 및 목록 확인', async ({ page }) => {
  10 |     // 겹치지 않는 유니크한 이메일 생성
  11 |     const uniqueEmail = `test_${Date.now()}_${Math.floor(Math.random() * 1000)}@example.com`;
  12 |     const uniqueTitle = `Test Post ${Date.now()}`;
  13 | 
  14 |     // 1. 회원가입
  15 |     await page.goto('/signup');
  16 |     await page.getByLabel('이름').fill('Test User');
  17 |     await page.getByLabel('이메일').fill(uniqueEmail);
  18 |     await page.getByLabel('비밀번호').fill(TEST_PASSWORD);
  19 |     await page.getByRole('button', { name: '회원가입' }).click();
  20 |     
  21 |     // 가입 완료 메시지 대기
  22 |     const successMessage = page.getByText('가입 완료!');
  23 |     await expect(successMessage).toBeVisible({ timeout: 15000 });
  24 |     
  25 |     // 2. 명시적으로 로그인 페이지로 이동 (자동 리다이렉트 대기하지 않고 직접 이동 처리로 문제 방어)
  26 |     await page.goto('/login');
  27 |     await page.waitForLoadState('networkidle');
> 28 |     await page.getByLabel('이메일', { exact: true }).fill(uniqueEmail);
     |                                                   ^ Error: locator.fill: Test timeout of 120000ms exceeded.
  29 |     await page.getByLabel('비밀번호').fill(TEST_PASSWORD);
  30 |     await page.getByRole('button', { name: '로그인', exact: true }).click();
  31 |     
  32 |     // 리다이렉트되어 게시글 목록(/posts)으로 이동했는지 확인
  33 |     // 로그인 에러 메시지가 있는지 확인 (디버깅용)
  34 |     const loginError = page.locator('.bg-red-100');
  35 |     if (await loginError.isVisible()) {
  36 |       console.error('Login failed with message:', await loginError.innerText());
  37 |     }
  38 |     
  39 |     await expect(page).toHaveURL(/\/posts/, { timeout: 20000 });
  40 |     
  41 |     // 3. 글 작성 페이지로 이동
  42 |     const newPostLink = page.getByRole('link', { name: '새 글 작성' });
  43 |     await newPostLink.waitFor({ state: 'visible' });
  44 |     await newPostLink.click();
  45 |     
  46 |     // URL 변경 대기
  47 |     await page.waitForURL(/\/posts\/new/, { timeout: 15000 });
  48 |     
  49 |     // 제목과 내용 입력
  50 |     await page.getByLabel('제목').fill(uniqueTitle);
  51 |     await page.getByLabel('내용').fill('이것은 Playwright E2E 테스트를 통해 작성된 게시글입니다. 글자수 제한을 넘기 위해 10자 이상 작성합니다.');
  52 |     
  53 |     // 저장 버튼 클릭
  54 |     await page.getByRole('button', { name: '저장' }).click();
  55 |     
  56 |     // 상세 페이지로 이동하는지 대기 (URL이 /posts/UUID 로 변경)
  57 |     // /posts/new와 구분하기 위해 정규식 보강
  58 |     await page.waitForURL(/\/posts\/(?!new)[^\/]+$/, { timeout: 20000 });
  59 |     
  60 |     // 4. 다시 목록으로 이동하여 새 글 제목 확인
  61 |     await page.goto('/posts');
  62 |     await expect(page.getByText(uniqueTitle)).toBeVisible({ timeout: 20000 });
  63 |   });
  64 | 
  65 |   test('거절 경로: 비로그인 상태에서 새 글 작성 시도', async ({ page }) => {
  66 |     // 로그아웃 상태인지 확실히 하기 위해 
  67 |     // 브라우저 컨텍스트가 새로우므로 비로그인 상태임.
  68 |     
  69 |     // 이벤트 리스너: alert() 등은 없지만, 클라이언트에서 튕겨내는 로직이 있다면 확인.
  70 |     // 현재 new/page.tsx 에서는 user가 없으면 alert 처리 후 리다이렉트 (useEffect 내부)
  71 |     page.on('dialog', async (dialog) => {
  72 |       expect(dialog.message()).toContain('로그인이 필요한 서비스입니다.');
  73 |       await dialog.dismiss();
  74 |     });
  75 | 
  76 |     // /posts/new 직접 접근
  77 |     await page.goto('/posts/new');
  78 |     
  79 |     // /login 페이지로 리다이렉트 되는지 확인
  80 |     await expect(page).toHaveURL(/\/login/);
  81 |   });
  82 | });
```