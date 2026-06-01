-- 댓글 수정 정책 추가
create policy "Allow individual update for owners"
on comments for update
using (auth.uid() = user_id);
