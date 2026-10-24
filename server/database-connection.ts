/**
 * Safe DB bootstrap for Builder / Vercel / Netlify.
 * Does not import @netlify/database (that breaks Builder preview).
 */
export function configureDatabaseConnection(): void {
  try {
    const existing =
      process.env.DATABASE_URL ||
      process.env.DATABASE_URL_UNPOOLED ||
      process.env.NETLIFY_DATABASE_URL ||
      process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
      "";

    if (existing) {
      process.env.DATABASE_URL = existing;
      return;
    }

    // No database URL yet — leave empty; framework may use local fallback in dev.
    process.env.DATABASE_URL = process.env.DATABASE_URL || "";
  } catch {
    // Never crash the app during bootstrap.
  }
}

configureDatabaseConnection();
