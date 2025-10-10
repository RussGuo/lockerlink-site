import { sql } from "@vercel/postgres";

const DATABASE_ENV_VARS = [
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "DATABASE_URL",
  "POSTGRES_URL_NON_POOLING",
];

export const analyticsEnabled = DATABASE_ENV_VARS.some((key) => Boolean(process.env[key]));

const ensureTable = async () => {
  if (!analyticsEnabled) return;

  await sql`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id UUID PRIMARY KEY,
      event_id TEXT NOT NULL,
      label TEXT,
      language TEXT,
      page TEXT,
      path TEXT,
      metadata JSONB,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`CREATE INDEX IF NOT EXISTS analytics_events_event_id_idx ON analytics_events (event_id);`;
  await sql`CREATE INDEX IF NOT EXISTS analytics_events_created_at_idx ON analytics_events (created_at);`;
};

export const withAnalyticsTable = async <T>(fn: () => Promise<T>) => {
  if (!analyticsEnabled) {
    throw new Error("ANALYTICS_DISABLED");
  }
  await ensureTable();
  return fn();
};

export { sql };
