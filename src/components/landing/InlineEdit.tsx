"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

type InlineEditProps = {
  value: string;
  onChange: (value: string) => void;
  enabled?: boolean;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  as?: ElementType;
  style?: React.CSSProperties;
};

export function InlineEdit({
  value,
  onChange,
  enabled,
  multiline,
  className = "",
  placeholder = "Clic para editar",
  as: Tag = "span",
  style,
}: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (!editing) return;
    if (multiline) {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    } else {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing, multiline]);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onChange(draft);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const stop = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
  };

  if (!enabled) {
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    );
  }

  if (editing) {
    const shared = {
      value: draft,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => setDraft(e.target.value),
      onBlur: commit,
      onClick: stop,
      onKeyDown: (e: KeyboardEvent) => {
        stop(e);
        if (e.key === "Escape") {
          e.preventDefault();
          cancel();
        }
        if (e.key === "Enter" && (multiline ? e.metaKey || e.ctrlKey : true)) {
          e.preventDefault();
          commit();
        }
      },
      className: `landing-inline-input ${className}`.trim(),
      style,
      "data-landing-inline": true as const,
    };

    return multiline ? (
      <textarea
        {...shared}
        ref={textareaRef}
        rows={Math.max(2, draft.split("\n").length)}
      />
    ) : (
      <input type="text" {...shared} ref={inputRef} />
    );
  }

  return (
    <Tag
      className={`landing-inline-text ${className}`.trim()}
      style={style}
      data-landing-inline
      title="Clic para editar"
      onClick={(e: MouseEvent<HTMLElement>) => {
        stop(e);
        setDraft(value);
        setEditing(true);
      }}
      onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          stop(e);
          setDraft(value);
          setEditing(true);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {value || <span className="landing-inline-ph">{placeholder}</span>}
    </Tag>
  );
}

type InlineImageProps = {
  src: string;
  fallback: string;
  alt: string;
  enabled?: boolean;
  onChange: (url: string) => void;
  className?: string;
  imgClassName?: string;
};

export function InlineImage({
  src,
  fallback,
  alt,
  enabled,
  onChange,
  className,
  imgClassName,
}: InlineImageProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(src);
  const display = src || fallback;

  useEffect(() => {
    setDraft(src);
  }, [src]);

  if (!enabled) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={display} alt={alt} className={imgClassName} />
    );
  }

  return (
    <div
      className={`landing-inline-image${className ? ` ${className}` : ""}`}
      data-landing-inline
      onClick={(e) => e.stopPropagation()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={display}
        alt={alt}
        className={`${imgClassName ?? ""} landing-inline-img-target`.trim()}
        onClick={() => {
          setDraft(src);
          setOpen(true);
        }}
      />
      {!src && (
        <button
          type="button"
          className="landing-inline-img-add"
          onClick={() => {
            setDraft("");
            setOpen(true);
          }}
        >
          + Cambiar imagen
        </button>
      )}
      {open && (
        <div className="landing-inline-popover" role="dialog">
          <label className="landing-inline-popover-label">URL de la imagen</label>
          <input
            type="url"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="https://…"
            autoFocus
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                onChange(draft.trim());
                setOpen(false);
              }
              if (e.key === "Escape") setOpen(false);
            }}
          />
          <div className="landing-inline-popover-actions">
            <button
              type="button"
              className="landing-inline-popover-apply"
              onClick={() => {
                onChange(draft.trim());
                setOpen(false);
              }}
            >
              Aplicar
            </button>
            <button
              type="button"
              className="landing-inline-popover-cancel"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function InlineAddButton({
  children,
  enabled,
  onClick,
}: {
  children: React.ReactNode;
  enabled?: boolean;
  onClick: () => void;
}) {
  if (!enabled) return null;

  return (
    <button
      type="button"
      className="landing-inline-add"
      data-landing-inline
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
