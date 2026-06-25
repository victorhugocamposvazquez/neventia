import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { LeadDetailView } from "@/components/admin/LeadDetailView";
import type { LeadActivity, LeadWithLanding } from "@/lib/types";

export default async function LeadDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  let supabase;
  try {
    supabase = createAdminClient();
  } catch {
    notFound();
  }

  const { data: leadData } = await supabase
    .from("leads")
    .select(
      `
      *,
      landings (
        id,
        name,
        slug,
        city,
        event_date
      )
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (!leadData) notFound();

  const lead = leadData as LeadWithLanding;

  const { data: activitiesData } = await supabase
    .from("lead_activities")
    .select("*")
    .eq("lead_id", id)
    .order("created_at", { ascending: false })
    .limit(100);

  const activities = (activitiesData as LeadActivity[]) ?? [];

  // Si no hay actividades pero el lead existe, mostrar al menos la fecha de alta.
  if (activities.length === 0) {
    activities.push({
      id: "synthetic-created",
      lead_id: id,
      type: "created",
      body: "Lead registrado en el sistema.",
      meta: {},
      created_at: lead.created_at,
    });
  }

  const returnParams = new URLSearchParams();
  const returnTo = `/admin/leads`;

  return (
    <LeadDetailView
      lead={lead}
      activities={activities}
      returnTo={returnTo}
      saved={sp.saved}
      error={sp.error}
    />
  );
}
