import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Aplica a todas las rutas excepto estáticos, imágenes y assets.
     * Necesario para refrescar la sesión y proteger /admin.
     */
    "/((?!_next/static|_next/image|favicon.ico|logo-web.png|api/meta|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
