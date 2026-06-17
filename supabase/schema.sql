-- ============================================================
-- neventia · Esquema de base de datos
-- Ejecuta este archivo en el SQL Editor de Supabase
-- (o con `supabase db query`) para crear todo el modelo.
-- ============================================================

-- Extensiones
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Tabla: landings
-- Cada fila es una landing de un evento. La URL pública es /<slug>.
-- El contenido editable vive en `content` (JSONB) para poder
-- gestionarlo todo desde el backoffice sin tocar el código.
-- ------------------------------------------------------------
create table if not exists public.landings (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  status        text not null default 'draft'
                  check (status in ('draft', 'published', 'archived')),
  city          text,
  region        text,
  event_date    timestamptz,
  content       jsonb not null default '{}'::jsonb,
  meta_pixel_id text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists landings_status_idx on public.landings (status);
create index if not exists landings_event_date_idx on public.landings (event_date);

-- ------------------------------------------------------------
-- Tabla: leads
-- Asistentes/leads captados desde una landing o desde Meta Ads.
-- ------------------------------------------------------------
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  landing_id   uuid references public.landings (id) on delete set null,
  full_name      text not null,
  email          text,
  phone          text,
  guests         integer not null default 1 check (guests >= 1),
  preferred_date text,
  party_type     text check (party_type in ('pareja', 'solo', 'amigos')),
  source       text not null default 'landing'
                 check (source in ('landing', 'meta_ads', 'manual')),
  status       text not null default 'new'
                 check (status in ('new', 'contacted', 'confirmed', 'attended', 'no_show', 'discarded')),
  utm          jsonb not null default '{}'::jsonb,
  meta_lead_id text unique,
  notes        text,
  created_at   timestamptz not null default now()
);

create index if not exists leads_landing_id_idx on public.leads (landing_id);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ------------------------------------------------------------
-- updated_at automático en landings
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists landings_set_updated_at on public.landings;
create trigger landings_set_updated_at
  before update on public.landings
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.landings enable row level security;
alter table public.leads enable row level security;

-- Landings publicadas: lectura pública (para renderizar la web).
drop policy if exists "landings_public_read_published" on public.landings;
create policy "landings_public_read_published"
  on public.landings
  for select
  to anon, authenticated
  using (status = 'published');

-- Landings: gestión completa para usuarios autenticados (backoffice).
drop policy if exists "landings_admin_all" on public.landings;
create policy "landings_admin_all"
  on public.landings
  for all
  to authenticated
  using (true)
  with check (true);

-- Leads: solo usuarios autenticados (backoffice) pueden leer/editar.
-- Las inserciones públicas (formulario y webhook de Meta) se hacen
-- desde el servidor con la service_role key, que se salta la RLS.
drop policy if exists "leads_admin_all" on public.leads;
create policy "leads_admin_all"
  on public.leads
  for all
  to authenticated
  using (true)
  with check (true);
