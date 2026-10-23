"use client";

import { useState } from "react";

export function CopyButton({
  value,
  label = "Copiar",
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  }

  return (
    <button type="button" className="admin-copy-btn" onClick={() => void onCopy()}>
      {copied ? "Copiado" : label}
    </button>
  );
}
