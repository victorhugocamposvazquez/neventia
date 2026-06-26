"use client";

import { useState } from "react";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

const fieldClass =
  "rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300";

export function EditorSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-forest-900/10 bg-white p-6 shadow-card">
      <div className="mb-4">
        <h2 className="font-bold text-forest-950">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-forest-800/60">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  ...props
}: {
  label: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-forest-900">{label}</span>
      {hint && <span className="text-xs text-forest-800/55">{hint}</span>}
      <input className={fieldClass} {...props} />
    </label>
  );
}

export function TextArea({
  label,
  hint,
  ...props
}: {
  label: string;
  hint?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-forest-900">{label}</span>
      {hint && <span className="text-xs text-forest-800/55">{hint}</span>}
      <textarea className={`${fieldClass} min-h-[88px] resize-y`} {...props} />
    </label>
  );
}

export function Select({
  label,
  hint,
  children,
  ...props
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-forest-900">{label}</span>
      {hint && <span className="text-xs text-forest-800/55">{hint}</span>}
      <select className={fieldClass} {...props}>
        {children}
      </select>
    </label>
  );
}

export function ImageField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <ImageUploadButton
        onUploaded={(url) => {
          setBroken(false);
          onChange(url);
        }}
      />
      <Field
        label={label}
        hint={hint ?? "También puedes pegar una URL externa."}
        value={value}
        onChange={(e) => {
          setBroken(false);
          onChange(e.target.value);
        }}
        placeholder="https://…"
      />
      {value && !broken && (
        <div className="overflow-hidden rounded-xl border border-forest-900/10 bg-cream/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-36 w-full object-cover"
            onError={() => setBroken(true)}
          />
        </div>
      )}
      {value && broken && (
        <p className="text-xs text-amber-700">
          No se pudo cargar la imagen. Comprueba la URL.
        </p>
      )}
    </div>
  );
}

export function ItemCard({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-forest-900/10 bg-cream/20 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-forest-900">{title}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            Quitar
          </button>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function AddButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-dashed border-forest-900/25 px-4 py-2 text-sm font-semibold text-forest-800 transition hover:border-forest-700 hover:bg-cream/60"
    >
      {children}
    </button>
  );
}

export function StringListEditor({
  label,
  hint,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-forest-900">{label}</span>
      {hint && <span className="text-xs text-forest-800/55">{hint}</span>}
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-1 rounded-full bg-mint-200/80 px-3 py-1 text-sm text-forest-900"
          >
            {item}
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="ml-1 text-forest-700 hover:text-red-600"
              aria-label={`Quitar ${item}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          className={`${fieldClass} min-w-[140px] flex-1`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <ImageUploadButton
          label="Subir"
          onUploaded={(url) => onChange([...items, url])}
        />
        <button
          type="button"
          onClick={add}
          className="rounded-xl bg-forest-900 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
        >
          Añadir URL
        </button>
      </div>
    </div>
  );
}
