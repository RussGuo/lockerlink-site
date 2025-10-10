import { createClient } from "@vercel/postgres";

type VercelClient = ReturnType<typeof createClient>;
type SqlClient = VercelClient["sql"];

const DATABASE_ENV_VARS = [
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL_NON_POOLING",
  "DATABASE_URL",
  "POSTGRES_DATABASE_URL",
  "POSTGRES_USER",
];

export const analyticsEnabled = DATABASE_ENV_VARS.some((key) => Boolean(process.env[key]));

let clientPromise: Promise<VercelClient> | null = null;

const getClient = async (): Promise<VercelClient> => {
  if (!analyticsEnabled) {
    throw new Error("ANALYTICS_DISABLED");
  }

  if (!clientPromise) {
    const connectionString =
      process.env.POSTGRES_URL || process.env.POSTGRES_DATABASE_URL || process.env.DATABASE_URL;

    const client = connectionString ? createClient({ connectionString }) : createClient();
    clientPromise = client.connect().then(() => client);
  }

  return clientPromise;
};

const getSql = async (): Promise<SqlClient> => {
  const client = await getClient();
  return client.sql;
};

const ensureTable = async (sql: SqlClient) => {
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

export const withAnalyticsTable = async <T>(fn: (sql: SqlClient) => Promise<T>) => {
  if (!analyticsEnabled) {
    throw new Error("ANALYTICS_DISABLED");
  }

  const sql = await getSql();
  await ensureTable(sql);
  return fn(sql);
};
