import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AdminLegalFooter } from "@/components/admin/AdminLegalFooter";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = { title: "Backoffice" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="hidden w-64 shrink-0 flex-col justify-between bg-forest-950 p-6 text-white lg:flex">
        <div>
          <Link href="/admin" className="mb-10 block">
            <Logo variant="light" />
          </Link>
          <AdminNav />
        </div>
        <div className="border-t border-white/10 pt-4">
          <AdminLegalFooter />
          <p className="mt-4 truncate text-xs text-white/40">{user?.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="mt-2 text-sm text-white/70 transition hover:text-white"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-forest-900/10 bg-white px-6 py-4 lg:hidden">
          <Logo />
          <form action={logout}>
            <button type="submit" className="text-sm text-forest-700">
              Salir
            </button>
          </form>
        </header>
        <div className="lg:hidden">
          <div className="border-b border-forest-900/10 bg-white px-4 py-2">
            <AdminNav variant="horizontal" />
          </div>
        </div>
        <main className="flex-1 overflow-x-hidden p-6 lg:p-10">
          {children}
          <div className="mt-10 border-t border-forest-900/10 pt-6 lg:hidden">
            <AdminLegalFooter variant="mobile" />
          </div>
        </main>
      </div>
    </div>
  );
}
