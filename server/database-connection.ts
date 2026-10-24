/**
 * Database connection for Vercel / Neon / generic Postgres.
 * Uses DATABASE_URL from the environment (already set by Vercel + Neon).
 */
export function configureDatabaseConnection(): void {
  process.env.DATABASE_URL ||=
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.NETLIFY_DATABASE_URL ||
    process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
    "";
}

configureDatabaseConnection();
