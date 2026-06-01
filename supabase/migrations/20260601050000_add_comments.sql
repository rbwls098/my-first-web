-- comments 테이블 생성
create table comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

-- RLS 활성화
alter table comments enable row level security;

-- 1. SELECT: 누구나 읽기 가능
create policy "Allow public read access for comments"
on comments for select
using (true);

-- 2. INSERT: 로그인한 사용자만 본인의 이름으로 작성 가능
create policy "Allow individual insert for authenticated users"
on comments for insert
with check (auth.uid() = user_id);

-- 3. DELETE: 작성자 본인만 삭제 가능
create policy "Allow individual delete for owners"
on comments for delete
using (auth.uid() = user_id);
