-- ============================================
-- Ch11 RLS 정책 — 스타터: 여기에 정책을 작성하세요
-- Supabase SQL Editor에서 실행한다
-- ============================================

-- TODO ①: posts 테이블에 RLS 활성화


-- TODO ②: SELECT 정책 — 누구나 읽기 가능


-- TODO ③: INSERT 정책 — 로그인 사용자만 작성 (본인 ID)


-- TODO ④: UPDATE 정책 — 작성자만 수정


-- TODO ⑤: DELETE 정책 — 작성자만 삭제


-- TODO ⑥: profiles 테이블에도 RLS 적용


-- 확인: 정책 목록 조회
-- SELECT policyname, cmd FROM pg_policies WHERE tablename = 'posts';
