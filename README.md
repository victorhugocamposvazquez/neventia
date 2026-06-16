# neventia

Plataforma de eventos con **landings de alta conversión** por evento y un
**backoffice** para gestionar las URLs de cada landing y los leads recibidos
(tanto desde la web como desde **Meta Ads**).

Stack: **Next.js 16** (App Router) · **Supabase** (Postgres + Auth) · **Vercel**.

---

## 1. Estructura

```
src/
  app/
    page.tsx                  Home corporativa de neventia
    [slug]/page.tsx           Landing pública de cada evento (URL = /slug)
    login/                    Acceso al backoffice
    admin/                    Backoffice (protegido)
      page.tsx                Resumen / métricas
      landings/               Alta y edición de landings
      leads/                  Listado, filtros y exportación CSV de leads
    api/meta/webhook/         Webhook de Meta Lead Ads
  components/                 UI de landing y de backoffice
  lib/
    supabase/                 Clientes (server, browser, admin) y sesión
    actions/                  Server Actions (leads, landings, auth)
  proxy.ts                    Refresca sesión y protege /admin (Next 16 = "proxy")
supabase/
  schema.sql                  Tablas, índices, RLS
  seed.sql                    Landing de ejemplo "comida-gratis"
```

## 2. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En el **SQL Editor**, ejecuta primero `supabase/schema.sql` y después
   `supabase/seed.sql`.
3. Crea el usuario del backoffice en **Authentication → Users → Add user**
   (email + contraseña, "Auto Confirm").

## 3. Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores (Supabase → Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...      # secreto, solo servidor
NEXT_PUBLIC_SITE_URL=http://localhost:3000
META_VERIFY_TOKEN=...              # lo defines tú para el webhook de Meta
META_APP_SECRET=                   # opcional, valida la firma del webhook
META_PAGE_ACCESS_TOKEN=           # opcional, recupera los datos del lead
```

## 4. Desarrollo

```bash
npm install
npm run dev
```

- Home: `http://localhost:3000`
- Landing de ejemplo: `http://localhost:3000/comida-gratis`
- Backoffice: `http://localhost:3000/admin` (redirige a `/login`)

## 5. Cómo funciona

### Landings
Cada fila de la tabla `landings` es un evento. La URL pública es `/<slug>`.
Todo el contenido (textos, imágenes, agenda, FAQ, formulario…) vive en el campo
`content` (JSON) y se edita desde **Backoffice → Landings → Editar**. Solo las
landings en estado `published` son visibles públicamente.

### Leads
- **Web:** el formulario de la landing usa un Server Action que guarda el lead
  con la `service_role` key (capturando también los UTM y `fbclid`).
- **Meta Ads:** configura el webhook de Lead Ads apuntando a
  `https://TU-DOMINIO/api/meta/webhook` con tu `META_VERIFY_TOKEN`. Los leads
  entran con origen `meta_ads`.
- En **Backoffice → Leads** puedes filtrar por origen/estado/evento, cambiar el
  estado de cada lead y exportar a CSV.

## 6. Despliegue en Vercel

1. Importa el repositorio en Vercel.
2. Añade las mismas variables de entorno del paso 3.
3. Deploy. Recuerda actualizar `NEXT_PUBLIC_SITE_URL` y la URL del webhook de
   Meta con el dominio de producción.

## 7. Seguridad

- RLS activada en `landings` y `leads`.
- Lectura pública solo de landings `published`.
- Los leads solo son accesibles para usuarios autenticados; las inserciones
  públicas se hacen desde el servidor con la `service_role` (nunca expuesta al
  navegador).
