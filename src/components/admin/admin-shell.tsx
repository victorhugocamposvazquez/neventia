import Link from "next/link";
import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  backHref,
  backLabel = "Volver",
  actions,
}: {
  title: string;
  description?: ReactNode;
  backHref?: string;
  backLabel?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="admin-page-header">
      <div className="min-w-0 flex-1">
        {backHref && (
          <Link href={backHref} className="admin-back-link">
            ← {backLabel}
          </Link>
        )}
        <h1 className="admin-page-title">{title}</h1>
        {description && <p className="admin-page-desc">{description}</p>}
      </div>
      {actions && <div className="admin-page-actions shrink-0">{actions}</div>}
    </header>
  );
}

export function AdminCard({
  title,
  description,
  action,
  children,
  className = "",
  bodyClassName = "",
  noPadding,
}: {
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  noPadding?: boolean;
}) {
  return (
    <section className={`admin-card ${className}`.trim()}>
      {(title || description || action) && (
        <div className="admin-card-head">
          <div className="admin-card-head-row">
            <div className="min-w-0">
              {title && <h2 className="admin-card-title">{title}</h2>}
              {description && <p className="admin-card-desc">{description}</p>}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        </div>
      )}
      <div
        className={`${noPadding ? "" : "admin-card-body"} ${bodyClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}

export function AdminAlert({
  variant,
  children,
}: {
  variant: "error" | "success";
  children: ReactNode;
}) {
  return (
    <p
      className={`admin-alert ${variant === "error" ? "admin-alert--error" : "admin-alert--success"}`}
      role="status"
    >
      {children}
    </p>
  );
}

export function AdminToolbar({ children }: { children: ReactNode }) {
  return <div className="admin-toolbar">{children}</div>;
}

export function AdminEmpty({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="admin-empty">
      <p className="admin-empty-title">{title}</p>
      {description && <p className="admin-empty-desc">{description}</p>}
      {action && <div className="admin-empty-action">{action}</div>}
    </div>
  );
}

export function AdminStatLink({
  href,
  label,
  value,
  hint,
}: {
  href: string;
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <Link href={href} className="admin-stat admin-stat--link">
      <p className="admin-stat-value">{value}</p>
      <p className="admin-stat-label">{label}</p>
      {hint && <p className="admin-stat-hint">{hint}</p>}
    </Link>
  );
}
