"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Resumen", short: "Inicio" },
  { href: "/admin/landings", label: "Landings", short: "Landings" },
  { href: "/admin/leads", label: "Leads", short: "Leads" },
];

export function AdminNav({
  variant = "vertical",
}: {
  variant?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();
  const horizontal = variant === "horizontal";

  return (
    <nav
      className={
        horizontal ? "flex gap-2 overflow-x-auto pb-0.5" : "flex flex-col gap-0.5"
      }
      aria-label="Menú del backoffice"
    >
      {!horizontal && <p className="admin-nav-label">Menú</p>}
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-nav-link ${
              horizontal ? "admin-nav-link--horizontal" : ""
            } ${active ? "admin-nav-link--active" : "admin-nav-link--idle"}`}
          >
            {horizontal ? link.short : link.label}
          </Link>
        );
      })}
    </nav>
  );
}
