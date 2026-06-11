-- posts 테이블에 image_url 컬럼 추가
alter table posts add column image_url text;

-- storage bucket 생성 (post-images)
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

-- storage policy 설정
-- 1. 누구나 이미지 조회 가능
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'post-images' );

-- 2. 인증된 사용자만 이미지 업로드 가능
create policy "Authenticated users can upload images"
on storage.objects for insert
with check (
  bucket_id = 'post-images' AND
  auth.role() = 'authenticated'
);

-- 3. 본인의 이미지만 삭제 가능 (간소화를 위해 업로드한 사용자가 본인인 경우만 허용)
-- storage.objects 에는 owner 필드가 있어 auth.uid() 와 비교 가능
create policy "Users can delete their own images"
on storage.objects for delete
using (
  bucket_id = 'post-images' AND
  auth.uid() = owner
);
