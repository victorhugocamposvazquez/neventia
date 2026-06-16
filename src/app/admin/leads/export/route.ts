import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types";

function csvCell(value: unknown): string {
  const str = value == null ? "" : String(value);
  if (/[",\n;]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Protección extra: solo usuarios autenticados.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = request.nextUrl;

  const { data: landingsData } = await supabase
    .from("landings")
    .select("id, name");
  const landingMap = new Map(
    (landingsData ?? []).map((l) => [l.id as string, l.name as string])
  );

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const source = searchParams.get("source");
  const status = searchParams.get("status");
  const landing = searchParams.get("landing");
  if (source) query = query.eq("source", source);
  if (status) query = query.eq("status", status);
  if (landing) query = query.eq("landing_id", landing);

  const { data } = await query;
  const leads = (data as Lead[]) ?? [];

  const header = [
    "Nombre",
    "Telefono",
    "Email",
    "Personas",
    "Evento",
    "Origen",
    "Estado",
    "UTM Source",
    "UTM Campaign",
    "Fecha",
  ];

  const rows = leads.map((l) =>
    [
      l.full_name,
      l.phone,
      l.email,
      l.guests,
      l.landing_id ? (landingMap.get(l.landing_id) ?? "") : "",
      l.source,
      l.status,
      l.utm?.utm_source ?? "",
      l.utm?.utm_campaign ?? "",
      new Date(l.created_at).toLocaleString("es-ES"),
    ]
      .map(csvCell)
      .join(",")
  );

  const csv = "\uFEFF" + [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-neventia-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
