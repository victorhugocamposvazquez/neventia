import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente con service_role. SOLO para el servidor.
 * Se salta la RLS: úsalo para inserciones públicas controladas
 * (formulario de leads, webhook de Meta Ads).
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
