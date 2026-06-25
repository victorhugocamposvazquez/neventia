"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { submitLead } from "@/lib/actions/leads";
import { LEGAL_LINKS } from "@/lib/legal";

type Party = { value: string; label: string };
const PARTY: Party[] = [
  { value: "pareja", label: "En pareja" },
  { value: "solo", label: "Solo/a" },
];

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

interface Msg {
  who: "bot" | "me";
  html: string;
  time: string;
}

type InputMode =
  | { kind: "none" }
  | {
      kind: "text";
      placeholder: string;
      type?: string;
      inputmode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
      autocomplete?: string;
      validate: (v: string) => boolean;
    }
  | { kind: "chips"; items: Party[] }
  | { kind: "restart" };

const nowHHMM = () => {
  const d = new Date();
  return `${`0${d.getHours()}`.slice(-2)}:${`0${d.getMinutes()}`.slice(-2)}`;
};

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const makeRef = () => "NV-" + Math.random().toString(36).slice(2, 7).toUpperCase();

function buildWhatsAppShareHref(city: string, dateLabel: string) {
  const url = window.location.href.split("#")[0];
  const text =
    `¡Hola! Te paso una comida gratuita de Neventia en ${city} (${dateLabel}). ` +
    `Puedes reservar plaza aquí: ${url}\n\n` +
    `Importante: el evento es para mayores de 45 años.`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.52 11.99c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function ChatReserve({
  landingId,
  city,
  eventDate,
  dateLabel,
  whatsappUrl,
}: {
  landingId: string;
  city: string;
  /** YYYY-MM-DD del evento de esta landing */
  eventDate: string;
  /** Etiqueta legible, p. ej. "Sábado, 28 de junio · 13:30 h" */
  dateLabel: string;
  whatsappUrl?: string;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<InputMode>({ kind: "none" });
  const [textValue, setTextValue] = useState("");
  const [shareHref, setShareHref] = useState("");

  const bodyRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const resolver = useRef<((v: string | Party) => void) | null>(null);
  const started = useRef(false);
  const utm = useRef<Record<string, string>>({});

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing, mode]);

  const addBot = useCallback(
    (html: string) => setMessages((m) => [...m, { who: "bot", html, time: nowHHMM() }]),
    []
  );
  const addMe = useCallback(
    (html: string) => setMessages((m) => [...m, { who: "me", html, time: nowHHMM() }]),
    []
  );

  const botSay = useCallback(
    async (html: string) => {
      setTyping(true);
      await sleep(Math.min(1100, 350 + html.replace(/<[^>]+>/g, "").length * 22));
      setTyping(false);
      addBot(html);
    },
    [addBot]
  );

  const askText = useCallback((opts: Extract<InputMode, { kind: "text" }>) => {
    setTextValue("");
    setMode(opts);
    return new Promise<string>((res) => {
      resolver.current = res as (v: string | Party) => void;
    });
  }, []);

  const askChips = useCallback((items: Party[]) => {
    setMode({ kind: "chips", items });
    return new Promise<Party>((res) => {
      resolver.current = res as (v: string | Party) => void;
    });
  }, []);

  const submitText = () => {
    if (mode.kind !== "text") return;
    const v = textValue.trim();
    if (!mode.validate(v)) return;
    addMe(esc(v));
    setMode({ kind: "none" });
    const r = resolver.current;
    resolver.current = null;
    r?.(v);
  };

  const pickChip = (item: Party) => {
    addMe(esc(item.label));
    setMode({ kind: "none" });
    const r = resolver.current;
    resolver.current = null;
    r?.(item);
  };

  const sendLead = useCallback(
    async (lead: { name: string; phone: string; party: string }) => {
      const formData = new FormData();
      formData.set("landingId", landingId);
      formData.set("fullName", lead.name);
      formData.set("phone", lead.phone);
      formData.set("party", lead.party);
      formData.set("preferredDate", eventDate);
      formData.set("consent", "on");
      formData.set("_hp", "");
      for (const key of UTM_KEYS) {
        const value = utm.current[key];
        if (value) formData.set(key, value);
      }

      const result = await submitLead({ ok: false }, formData);
      return result.ok ? makeRef() : null;
    },
    [eventDate, landingId]
  );

  const run = useCallback(async () => {
    await botSay("¡Hola! 👋 Soy el asistente de reservas de Neventia.");
    await botSay(
      `Te apunto a la comida gratuita en <b>${esc(city)}</b> (${esc(dateLabel)}) en menos de un minuto. ¿Cómo te llamas?`
    );

    const name = await askText({
      kind: "text",
      placeholder: "Escribe tu nombre…",
      autocomplete: "name",
      validate: (v) => v.length >= 2,
    });
    await botSay(`Muy bien, <b>${esc(name.split(" ")[0])}</b> 🙂`);
    await botSay("¿A qué teléfono te llamamos para confirmar si hay plaza?");

    const phone = await askText({
      kind: "text",
      type: "tel",
      inputmode: "tel",
      placeholder: "Tu teléfono…",
      autocomplete: "tel",
      validate: (v) => v.replace(/\D/g, "").length >= 9,
    });

    await botSay('Y para terminar: ¿cómo vienes? <b>Las parejas tienen preferencia</b> para entrar.');
    const party = await askChips(PARTY);

    if (!(await sendLead({ name, phone, party: party.value }))) {
      await botSay("Ups, algo falló al enviar la solicitud. Inténtalo de nuevo en un momento.");
      setMode({ kind: "restart" });
      return;
    }

    await botSay(
      `🎉 <b>¡Solicitud recibida!</b><br>` +
        `🍽 <b>Comida Neventia · ${esc(city)}</b><br>` +
        `📅 ${esc(dateLabel)}<br>👤 ${esc(name)} · ${esc(party.label)}<br>📞 ${esc(phone)}`
    );
    await botSay(
      "Te llamaremos para confirmar si hay plaza. Se asignan por <b>orden de solicitud</b> y en pareja tiene preferencia."
    );
    setMode({ kind: "restart" });
  }, [askChips, askText, botSay, city, dateLabel, sendLead]);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    run();
  }, [run]);

  const restart = () => {
    started.current = false;
    setMessages([]);
    setMode({ kind: "none" });
    start();
  };

  useEffect(() => {
    setShareHref(buildWhatsAppShareHref(city, dateLabel));
  }, [city, dateLabel]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const a: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const v = p.get(key);
      if (v) a[key] = v;
    }
    utm.current = a;

    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [start]);

  return (
    <div
      className="chat"
      id="chat"
      aria-label="Chat de solicitud"
      ref={rootRef}
      onPointerDown={start}
    >
      <div className="chat-header">
        <div className="chat-avatar">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path
              d="M 48.94 25.90 A 18 18 0 1 1 38.10 15.06"
              fill="none"
              stroke="#F6F4ED"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="44.7" cy="19.3" r="6" fill="#6CAE8C" />
          </svg>
        </div>
        <div className="chat-id">
          <div className="chat-name">Neventia · Reservas</div>
          <div className="chat-status">
            <span className="dot" /> Asistente · responde al instante
          </div>
        </div>
        {whatsappUrl && (
          <a
            className="chat-wa"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir WhatsApp"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.52 11.99c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
            </svg>
          </a>
        )}
      </div>

      <div className="chat-body" id="chat-body" role="log" aria-live="polite" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.who}`}>
            <span dangerouslySetInnerHTML={{ __html: m.html }} />
            <span className="time">{m.time}</span>
          </div>
        ))}
        {typing && (
          <div className="chat-typing">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      <div className="chat-input" id="chat-input">
        {mode.kind === "text" && (
          <>
            <div className="chat-textrow">
              <input
                type={mode.type || "text"}
                inputMode={mode.inputmode || "text"}
                autoComplete={mode.autocomplete}
                placeholder={mode.placeholder}
                value={textValue}
                autoFocus
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitText();
                  }
                }}
              />
              <button className="chat-send" type="button" aria-label="Enviar" onClick={submitText}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="chat-consent">
              Al continuar aceptas la{" "}
              <Link href={LEGAL_LINKS.privacidad}>política de privacidad</Link>.
            </div>
          </>
        )}

        {mode.kind === "chips" && (
          <div className="chat-quick">
            {mode.items.map((it) => (
              <button key={it.value} type="button" className="chat-chip" onClick={() => pickChip(it)}>
                {it.label}
              </button>
            ))}
          </div>
        )}

        {mode.kind === "restart" && (
          <div className="chat-quick chat-quick--stack">
            {shareHref && (
              <>
                <a
                  href={shareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chat-share-btn chat-share-btn--inline"
                >
                  <WhatsAppIcon />
                  Compartir este evento con amigos
                </a>
                <p className="chat-share-note chat-share-note--inline">
                  Recuerda avisarles: el evento es para mayores de 45 años. Las parejas tienen preferencia.
                </p>
              </>
            )}
            <button type="button" className="chat-restart" onClick={restart}>
              Enviar otra solicitud
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
