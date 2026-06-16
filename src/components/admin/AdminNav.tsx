"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/landings", label: "Landings" },
  { href: "/admin/leads", label: "Leads" },
];

export function AdminNav({
  variant = "vertical",
}: {
  variant?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();

  return (
    <nav
      className={
        variant === "horizontal"
          ? "flex gap-2 overflow-x-auto"
          : "flex flex-col gap-1"
      }
    >
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              active
                ? variant === "horizontal"
                  ? "bg-forest-900 text-white"
                  : "bg-white/10 text-white"
                : variant === "horizontal"
                  ? "text-forest-800 hover:bg-forest-900/5"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
