-- Evidencia de aceptación al enviar solicitud de plaza
alter table public.leads
  add column if not exists consents jsonb not null default '{}'::jsonb;
