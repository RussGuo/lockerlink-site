import { Pool } from "pg";

type Queryable = Pool;

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  null;

export const analyticsEnabled = Boolean(connectionString);

let pool: Pool | null = null;
let tableInitPromise: Promise<void> | null = null;

const getPool = (): Pool => {
  if (!analyticsEnabled || !connectionString) {
    throw new Error("ANALYTICS_DISABLED");
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : undefined,
      max: 5,
    });
  }

  return pool;
};

const ensureTable = async (client: Queryable) => {
  await client.query(`
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
  `);
  await client.query(`CREATE INDEX IF NOT EXISTS analytics_events_event_id_idx ON analytics_events (event_id);`);
  await client.query(`CREATE INDEX IF NOT EXISTS analytics_events_created_at_idx ON analytics_events (created_at);`);
};

export const withAnalyticsTable = async <T>(fn: (client: Queryable) => Promise<T>): Promise<T> => {
  if (!analyticsEnabled) {
    throw new Error("ANALYTICS_DISABLED");
  }

  const client = getPool();

  if (!tableInitPromise) {
    tableInitPromise = ensureTable(client);
  }

  await tableInitPromise;

  return fn(client);
};
