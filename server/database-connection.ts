import {
  getConnectionString,
  MissingDatabaseConnectionError,
} from "@netlify/database";

/** Bridge Netlify's branch-scoped database to the framework's SQL client. */
/**
 * Database connection for Vercel / Neon / generic Postgres.
 * Uses DATABASE_URL from the environment (already set by Vercel + Neon).
 */
export function configureDatabaseConnection(): void {
  try {
    const url = new URL(getConnectionString());
    // The framework uses postgres.js. Netlify's transaction proxy cannot
    // retain prepared statements or pipeline them across backend connections.
    url.searchParams.set("prepare", "false");
    url.searchParams.set("max_pipeline", "1");
    const connection = url.toString();
    // guard:allow-env-mutation — bootstrap only; one Netlify database branch per function process, never user/request state.
    process.env.DATABASE_URL = connection;
    // guard:allow-env-mutation — bootstrap only; migrations use the same fixed deployment branch as request functions.
    process.env.DATABASE_URL_UNPOOLED = connection;
    // guard:allow-env-mutation — bootstrap only; the framework also reads this legacy direct-connection name.
    process.env.NETLIFY_DATABASE_URL_UNPOOLED = connection;
  } catch (error) {
    if (!(error instanceof MissingDatabaseConnectionError)) throw error;
    // guard:allow-env-mutation — bootstrap only; retain fixed host PostgreSQL settings and local PGlite.
    process.env.DATABASE_URL ||=
      process.env.NETLIFY_DATABASE_URL ||
      process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
      process.env.DATABASE_URL_UNPOOLED ||
      "";
  }
  process.env.DATABASE_URL ||=
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.NETLIFY_DATABASE_URL ||
    process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
    "";
}

configureDatabaseConnection();
