-- 1. 좋아요 테이블 생성
create table likes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(post_id, user_id) -- 한 게시글에 한 번만 좋아요 가능
);

-- 2. 좋아요 RLS
alter table likes enable row level security;
create policy "Anyone can read likes" on likes for select using (true);
create policy "Users can insert their own likes" on likes for insert with check (auth.uid() = user_id);
create policy "Users can delete their own likes" on likes for delete using (auth.uid() = user_id);
