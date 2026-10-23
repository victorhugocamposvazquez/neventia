"use client";

import { useRouter } from "next/navigation";
import { logLeadContact } from "@/lib/actions/leads-admin";

export function LeadContactButtons({
  leadId,
  tel,
  whatsapp,
  email,
}: {
  leadId: string;
  tel: string | null;
  whatsapp: string | null;
  email: string | null;
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
    <div className="flex flex-wrap gap-2">
      {tel && (
        <a
          href={tel}
          onClick={() => void track("call")}
          className="admin-btn-primary py-2"
        >
          Llamar
        </a>
      )}
      {whatsapp && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => void track("whatsapp")}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          WhatsApp
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          onClick={() => void track("email")}
          className="inline-flex items-center justify-center rounded-full border border-forest-900/15 bg-white px-4 py-2 text-sm font-semibold text-forest-900 transition hover:bg-cream"
        >
          Email
        </a>
      )}
    </div>
  );
}
