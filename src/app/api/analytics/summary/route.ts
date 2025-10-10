import { NextResponse } from "next/server";
import { z } from "zod";
import { analyticsEnabled, sql, withAnalyticsTable } from "@/lib/db";

const SummaryQuerySchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

const formatISO = (date: Date) => date.toISOString();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const parsed = SummaryQuerySchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const now = new Date();
    const defaultFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const from = parsed.data.from ? new Date(parsed.data.from) : defaultFrom;
    const to = parsed.data.to ? new Date(parsed.data.to) : now;

    const fromISO = formatISO(from);
    const toISO = formatISO(to);

    if (!analyticsEnabled) {
      return NextResponse.json({
        range: { from: fromISO, to: toISO },
        totals: [],
        timeline: [],
        latest: [],
        disabled: true,
      });
    }

    const summary = await withAnalyticsTable(async () => {
      const aggregatePromise = sql<{
        event_id: string;
        total: string;
      }>`
        SELECT event_id, COUNT(*)::text AS total
        FROM analytics_events
        WHERE created_at BETWEEN ${fromISO}::timestamptz AND ${toISO}::timestamptz
        GROUP BY event_id
        ORDER BY total::int DESC;
      `;

      const timelinePromise = sql<{
        bucket: string;
        event_id: string;
        total: string;
      }>`
        SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS bucket,
               event_id,
               COUNT(*)::text AS total
        FROM analytics_events
        WHERE created_at BETWEEN ${fromISO}::timestamptz AND ${toISO}::timestamptz
        GROUP BY bucket, event_id
        ORDER BY bucket ASC;
      `;

      const latestPromise = sql<{
        id: string;
        event_id: string;
        label: string | null;
        language: string | null;
        page: string | null;
        path: string | null;
        metadata: Record<string, unknown> | null;
        user_agent: string | null;
        created_at: string;
      }>`
        SELECT id::text, event_id, label, language, page, path, metadata, user_agent, created_at::text
        FROM analytics_events
        WHERE created_at BETWEEN ${fromISO}::timestamptz AND ${toISO}::timestamptz
        ORDER BY created_at DESC
        LIMIT 50;
      `;

      const [aggregateResult, timelineResult, latestResult] = await Promise.all([aggregatePromise, timelinePromise, latestPromise]);

      return {
        events: aggregateResult.rows,
        timeline: timelineResult.rows,
        latest: latestResult.rows,
      };
    });

    const { events, timeline, latest } = summary;

    return NextResponse.json({
      range: { from: fromISO, to: toISO },
      totals: events.map((row) => ({ eventId: row.event_id, total: Number(row.total) })),
      timeline: timeline.map((row) => ({ bucket: row.bucket, eventId: row.event_id, total: Number(row.total) })),
      latest: latest.map((row) => ({
        id: row.id,
        eventId: row.event_id,
        label: row.label,
        language: row.language,
        page: row.page,
        path: row.path,
        metadata: row.metadata,
        userAgent: row.user_agent,
        createdAt: row.created_at,
      })),
    });
  } catch (error) {
    if ((error as Error).message === "ANALYTICS_DISABLED") {
      return NextResponse.json({
        range: { from: "", to: "" },
        totals: [],
        timeline: [],
        latest: [],
        disabled: true,
      });
    }
    console.error("[analytics][summary]", error);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
