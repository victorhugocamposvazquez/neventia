"use client";

import { useRef } from "react";
import { useLandingImageUpload } from "@/components/admin/useLandingImageUpload";

type Props = {
  onUploaded: (url: string) => void;
  variant?: "admin" | "inline";
  label?: string;
  disabled?: boolean;
};

export function ImageUploadButton({
  onUploaded,
  variant = "admin",
  label = "Subir desde ordenador",
  disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, uploading, error } = useLandingImageUpload();

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const url = await uploadFile(file);
    if (url) onUploaded(url);
    if (inputRef.current) inputRef.current.value = "";
  };

  const className =
    variant === "inline"
      ? "landing-inline-upload-btn"
      : "rounded-xl border border-forest-900/15 bg-cream/50 px-4 py-2.5 text-sm font-semibold text-forest-900 transition hover:bg-cream disabled:opacity-60";

  return (
    <div className={variant === "inline" ? "landing-inline-upload" : "space-y-1.5"}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        disabled={disabled || uploading}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <button
        type="button"
        className={className}
        disabled={disabled || uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? "Subiendo…" : label}
      </button>
      {error && (
        <p
          className={
            variant === "inline"
              ? "landing-inline-upload-error"
              : "text-xs text-red-600"
          }
        >
          {error}
        </p>
      )}
    </div>
  );
}
