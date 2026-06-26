-- Imágenes de landings (hero, menú, galería, etc.)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'landing-media',
  'landing-media',
  true,
  5242880,
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Políticas idempotentes (pueden existir si ya se aplicó en remoto)
drop policy if exists "landing_media_public_read" on storage.objects;
create policy "landing_media_public_read"
on storage.objects for select
using (bucket_id = 'landing-media');

drop policy if exists "landing_media_auth_insert" on storage.objects;
create policy "landing_media_auth_insert"
on storage.objects for insert
to authenticated
with check (bucket_id = 'landing-media');

drop policy if exists "landing_media_auth_update" on storage.objects;
create policy "landing_media_auth_update"
on storage.objects for update
to authenticated
using (bucket_id = 'landing-media');

drop policy if exists "landing_media_auth_delete" on storage.objects;
create policy "landing_media_auth_delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'landing-media');
