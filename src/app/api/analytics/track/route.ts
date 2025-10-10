import { NextResponse } from "next/server";
import { z } from "zod";
import { analyticsEnabled, sql, withAnalyticsTable } from "@/lib/db";

const TrackEventSchema = z.object({
  id: z.string().uuid(),
  eventId: z.string().min(1),
  label: z.string().optional(),
  language: z.string().optional(),
  page: z.string().optional(),
  path: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  occurredAt: z.string().datetime().optional(),
});

export async function POST(request: Request) {
  try {
    if (!analyticsEnabled) {
      return NextResponse.json({ error: "Analytics disabled" }, { status: 503 });
    }

    const payload = await request.json();
    const parsed = TrackEventSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const {
      id,
      eventId,
      label,
      language,
      page,
      path,
      metadata,
      occurredAt,
    } = parsed.data;

    const userAgent = request.headers.get("user-agent") ?? "unknown";
    const createdAt = occurredAt ?? new Date().toISOString();
    const metadataJson = metadata ? JSON.stringify(metadata) : null;

    await withAnalyticsTable(async () => {
      await sql`
        INSERT INTO analytics_events (id, event_id, label, language, page, path, metadata, user_agent, created_at)
        VALUES (${id}::uuid, ${eventId}, ${label ?? null}, ${language ?? null}, ${page ?? null}, ${path ?? null}, ${metadataJson}::jsonb, ${userAgent}, ${createdAt}::timestamptz)
      `;
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if ((error as Error).message === "ANALYTICS_DISABLED") {
      return NextResponse.json({ error: "Analytics disabled" }, { status: 503 });
    }
    console.error("[analytics][track]", error);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
