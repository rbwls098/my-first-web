-- ============================================
-- Ch11 RLS 정책 — 모범 구현
-- Supabase SQL Editor에서 한 번에 실행
-- ============================================

-- 1. posts 테이블 RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 2. SELECT: 누구나 읽기 가능
CREATE POLICY "누구나 게시글 읽기" ON posts
  FOR SELECT
  USING (true);

-- 3. INSERT: 로그인 사용자만 작성 (본인 ID로만)
CREATE POLICY "로그인 사용자만 작성" ON posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4. UPDATE: 작성자만 수정
CREATE POLICY "작성자만 수정" ON posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. DELETE: 작성자만 삭제
CREATE POLICY "작성자만 삭제" ON posts
  FOR DELETE
  USING (auth.uid() = user_id);


-- ============================================
-- profiles 테이블 RLS
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 누구나 프로필 읽기 가능
CREATE POLICY "누구나 프로필 읽기" ON profiles
  FOR SELECT
  USING (true);

-- 본인 프로필만 수정 가능
CREATE POLICY "본인 프로필만 수정" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);


-- ============================================
-- 정책 확인
-- ============================================

SELECT policyname, cmd FROM pg_policies WHERE tablename = 'posts';
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'profiles';
