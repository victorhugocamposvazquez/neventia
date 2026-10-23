"use client";

import { useRouter } from "next/navigation";
import { logLeadContact } from "@/lib/actions/leads-admin";

export function LeadContactButtons({
  leadId,
  tel,
  whatsapp,
  email,
  compact = false,
}: {
  leadId: string;
  tel: string | null;
  whatsapp: string | null;
  email: string | null;
  compact?: boolean;
}) {
  const router = useRouter();

  async function track(type: "call" | "whatsapp" | "email") {
    const fd = new FormData();
    fd.set("id", leadId);
    fd.set("type", type);
    await logLeadContact(fd);
    router.refresh();
  }

  if (!tel && !whatsapp && !email) {
    return (
      <p className="text-sm text-forest-800/50">Sin datos de contacto.</p>
    );
  }

  return (
    <div className={`admin-contact-btns ${compact ? "admin-contact-btns--compact" : ""}`}>
      {tel && (
        <a
          href={tel}
          onClick={() => void track("call")}
          className="admin-contact-btn admin-contact-btn--call"
        >
          <PhoneIcon />
          Llamar
        </a>
      )}
      {whatsapp && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => void track("whatsapp")}
          className="admin-contact-btn admin-contact-btn--wa"
        >
          <WaIcon />
          WhatsApp
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          onClick={() => void track("email")}
          className="admin-contact-btn admin-contact-btn--mail"
        >
          <MailIcon />
          Email
        </a>
      )}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 3.8c.4-.4 1.1-.5 1.6-.2l2.2 1.3c.5.3.7.9.5 1.4l-.8 2.1c-.1.4 0 .8.3 1.1l2.4 2.4c.3.3.7.4 1.1.3l2.1-.8c.5-.2 1.1 0 1.4.5l1.3 2.2c.3.5.2 1.2-.2 1.6l-1.1 1.1c-.5.5-1.2.7-1.9.5-1.7-.4-3.8-1.8-5.8-3.8S5.3 9.3 4.9 7.6c-.2-.7 0-1.4.5-1.9l1.2-1.9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.52 11.99c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m5 7.5 7 5.5 7-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
