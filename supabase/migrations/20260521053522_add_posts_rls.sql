-- posts 테이블 RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 1. SELECT 정책: 누구나 읽기 가능 (기존 정책이 중복 생성되지 않도록 주의)
DROP POLICY IF EXISTS "Enable read access for all users" ON posts;
CREATE POLICY "Enable read access for all users"
ON posts FOR SELECT
USING (true);

-- 2. INSERT 정책: 로그인 사용자만 가능, 자신의 글만 작성 가능
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON posts;
CREATE POLICY "Enable insert for authenticated users only"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 3. UPDATE 정책: 작성자 본인만 데이터 수정 가능
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON posts;
CREATE POLICY "Enable update for users based on user_id"
ON posts FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. DELETE 정책: 작성자 본인만 데이터 삭제 가능
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON posts;
CREATE POLICY "Enable delete for users based on user_id"
ON posts FOR DELETE
USING (auth.uid() = user_id);
