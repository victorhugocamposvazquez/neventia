-- Etiquetas y timeline de actividad por lead
alter table public.leads
  add column if not exists tags text[] not null default '{}';

create table if not exists public.lead_activities (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads (id) on delete cascade,
  type       text not null check (type in (
    'created', 'status_change', 'note', 'call', 'whatsapp', 'email',
    'tag_added', 'tag_removed', 'system'
  )),
  body       text,
  meta       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists lead_activities_lead_id_idx
  on public.lead_activities (lead_id, created_at desc);

alter table public.lead_activities enable row level security;

drop policy if exists "lead_activities_admin_all" on public.lead_activities;
create policy "lead_activities_admin_all"
  on public.lead_activities
  for all
  to authenticated
  using (true)
  with check (true);
