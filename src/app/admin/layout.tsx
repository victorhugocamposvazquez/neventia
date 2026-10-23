import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AdminLegalFooter } from "@/components/admin/AdminLegalFooter";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import "./admin.css";

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
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <Link href="/admin" className="admin-sidebar-brand">
            <Logo variant="light" />
            <span className="admin-sidebar-badge">Backoffice</span>
          </Link>
          <AdminNav />
        </div>
        <div className="admin-sidebar-foot">
          <AdminLegalFooter />
          <div className="admin-sidebar-user">
            <p className="admin-sidebar-email" title={user?.email ?? undefined}>
              {user?.email}
            </p>
            <form action={logout}>
              <button type="submit" className="admin-sidebar-logout">
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-mobile-bar">
          <Logo />
          <form action={logout}>
            <button type="submit" className="admin-btn-ghost">
              Salir
            </button>
          </form>
        </header>
        <div className="admin-mobile-nav">
          <AdminNav variant="horizontal" />
        </div>
        <main className="admin-main">
          {children}
          <div className="admin-mobile-legal">
            <AdminLegalFooter variant="mobile" />
          </div>
        </main>
      </div>
    </div>
  );
}
