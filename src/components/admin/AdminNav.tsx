"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/admin",
    label: "Resumen",
    short: "Inicio",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/admin/landings",
    label: "Landings",
    short: "Landings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/admin/leads",
    label: "Leads",
    short: "Leads",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M19 11v4M21 13h-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
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
        horizontal
          ? "flex gap-1.5 overflow-x-auto pb-0.5"
          : "flex flex-col gap-0.5"
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
            aria-current={active ? "page" : undefined}
          >
            <span className="admin-nav-icon">{link.icon}</span>
            {horizontal ? link.short : link.label}
          </Link>
        );
      })}
    </nav>
  );
}
