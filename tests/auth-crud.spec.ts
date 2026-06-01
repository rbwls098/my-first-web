import { test, expect } from '@playwright/test';

// 테스트 전 더미 환경 변수 확인
// 실행 시 $env:TEST_EMAIL="test@example.com"; $env:TEST_PASSWORD="password" npx playwright test 처럼 실행
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'password123';

test.describe('Auth and CRUD Flow', () => {
  test('행복 경로: 로그인 후 게시글 작성 및 목록 확인', async ({ page }) => {
    // 겹치지 않는 유니크한 이메일 생성
    const uniqueEmail = `test_${Date.now()}_${Math.floor(Math.random() * 1000)}@example.com`;
    const uniqueTitle = `Test Post ${Date.now()}`;

    // 1. 회원가입
    await page.goto('/signup');
    await page.getByLabel('이름').fill('Test User');
    await page.getByLabel('이메일').fill(uniqueEmail);
    await page.getByLabel('비밀번호').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: '회원가입' }).click();
    
    // 가입 완료 메시지 대기
    const successMessage = page.getByText('가입 완료!');
    await expect(successMessage).toBeVisible({ timeout: 15000 });
    
    // 2. 명시적으로 로그인 페이지로 이동 (자동 리다이렉트 대기하지 않고 직접 이동 처리로 문제 방어)
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.getByLabel('이메일', { exact: true }).fill(uniqueEmail);
    await page.getByLabel('비밀번호').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: '로그인', exact: true }).click();
    
    // 리다이렉트되어 게시글 목록(/posts)으로 이동했는지 확인
    // 로그인 에러 메시지가 있는지 확인 (디버깅용)
    const loginError = page.locator('.bg-red-100');
    if (await loginError.isVisible()) {
      console.error('Login failed with message:', await loginError.innerText());
    }
    
    await expect(page).toHaveURL(/\/posts/, { timeout: 20000 });
    
    // 3. 글 작성 페이지로 이동
    const newPostLink = page.getByRole('link', { name: '새 글 작성' });
    await newPostLink.waitFor({ state: 'visible' });
    await newPostLink.click();
    
    // URL 변경 대기
    await page.waitForURL(/\/posts\/new/, { timeout: 15000 });
    
    // 제목과 내용 입력
    await page.getByLabel('제목').fill(uniqueTitle);
    await page.getByLabel('내용').fill('이것은 Playwright E2E 테스트를 통해 작성된 게시글입니다. 글자수 제한을 넘기 위해 10자 이상 작성합니다.');
    
    // 저장 버튼 클릭
    await page.getByRole('button', { name: '저장' }).click();
    
    // 상세 페이지로 이동하는지 대기 (URL이 /posts/UUID 로 변경)
    // /posts/new와 구분하기 위해 정규식 보강
    await page.waitForURL(/\/posts\/(?!new)[^\/]+$/, { timeout: 20000 });
    
    // 4. 다시 목록으로 이동하여 새 글 제목 확인
    await page.goto('/posts');
    await expect(page.getByText(uniqueTitle)).toBeVisible({ timeout: 20000 });
  });

  test('거절 경로: 비로그인 상태에서 새 글 작성 시도', async ({ page }) => {
    // 로그아웃 상태인지 확실히 하기 위해 
    // 브라우저 컨텍스트가 새로우므로 비로그인 상태임.
    
    // 이벤트 리스너: alert() 등은 없지만, 클라이언트에서 튕겨내는 로직이 있다면 확인.
    // 현재 new/page.tsx 에서는 user가 없으면 alert 처리 후 리다이렉트 (useEffect 내부)
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('로그인이 필요한 서비스입니다.');
      await dialog.dismiss();
    });

    // /posts/new 직접 접근
    await page.goto('/posts/new');
    
    // /login 페이지로 리다이렉트 되는지 확인
    await expect(page).toHaveURL(/\/login/);
  });
});