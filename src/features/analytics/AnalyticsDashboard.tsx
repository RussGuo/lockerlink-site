import { withAnalyticsTable } from "@/lib/db";
import { AnalyticsDashboardClient } from "@/features/analytics/AnalyticsDashboardClient";

const DEFAULT_DAYS = 7;

const formatISO = (date: Date) => date.toISOString();

export const AnalyticsDashboard = async () => {
  const now = new Date();
  const from = new Date(now.getTime() - DEFAULT_DAYS * 24 * 60 * 60 * 1000);
  const range = { from: formatISO(from), to: formatISO(now) };

  const empty = {
    range,
    totals: [] as { eventId: string; total: number }[],
    timeline: [] as { bucket: string; eventId: string; total: number }[],
    latest: [] as {
      id: string;
      eventId: string;
      label: string | null;
      language: string | null;
      page: string | null;
      path: string | null;
      metadata: Record<string, unknown> | null;
      userAgent: string | null;
      createdAt: string;
    }[],
  } as const;

  try {
    const data = await withAnalyticsTable(async (client) => {
      const aggregatePromise = client.query<{ event_id: string; total: string }>(
        `SELECT event_id, COUNT(*)::text AS total
         FROM analytics_events
         WHERE created_at BETWEEN $1::timestamptz AND $2::timestamptz
         GROUP BY event_id
         ORDER BY total::int DESC`,
        [range.from, range.to]
      );

      const timelinePromise = client.query<{ bucket: string; event_id: string; total: string }>(
        `SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS bucket,
                event_id,
                COUNT(*)::text AS total
         FROM analytics_events
         WHERE created_at BETWEEN $1::timestamptz AND $2::timestamptz
         GROUP BY bucket, event_id
         ORDER BY bucket ASC`,
        [range.from, range.to]
      );

      const latestPromise = client.query<{
        id: string;
        event_id: string;
        label: string | null;
        language: string | null;
        page: string | null;
        path: string | null;
        metadata: Record<string, unknown> | null;
        user_agent: string | null;
        created_at: string;
      }>(
        `SELECT id::text, event_id, label, language, page, path, metadata, user_agent, created_at::text
         FROM analytics_events
         WHERE created_at BETWEEN $1::timestamptz AND $2::timestamptz
         ORDER BY created_at DESC
         LIMIT 50`,
        [range.from, range.to]
      );

      const [aggregateResult, timelineResult, latestResult] = await Promise.all([
        aggregatePromise,
        timelinePromise,
        latestPromise,
      ]);

      return {
        range,
        totals: aggregateResult.rows.map((row) => ({ eventId: row.event_id, total: Number(row.total) })),
        timeline: timelineResult.rows.map((row) => ({ bucket: row.bucket, eventId: row.event_id, total: Number(row.total) })),
        latest: latestResult.rows.map((row) => ({
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
      };
    });

    return <AnalyticsDashboardClient initialRange={range} initialData={data} />;
  } catch (error) {
    if ((error as Error).message === "ANALYTICS_DISABLED") {
      return <AnalyticsDashboardClient initialRange={range} initialData={empty} />;
    }
    throw error;
  }
};
