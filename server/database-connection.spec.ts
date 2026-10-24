import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const native = vi.hoisted(() => ({ read: vi.fn() }));
vi.mock("@netlify/database", () => ({
  getConnectionString: native.read,
  MissingDatabaseConnectionError: class MissingDatabaseConnectionError extends Error {},
}));

describe("Netlify database bootstrap", () => {
  beforeEach(() => {
    vi.resetModules();
    for (const key of [
      "DATABASE_URL",
      "DATABASE_URL_UNPOOLED",
      "NETLIFY_DATABASE_URL",
      "NETLIFY_DATABASE_URL_UNPOOLED",
    ])
      vi.stubEnv(key, "");
    native.read.mockReset();
  });

  afterEach(() => vi.unstubAllEnvs());

  it("keeps runtime and migrations on the native preview branch with proxy-compatible settings", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://legacy.invalid/production");
    vi.stubEnv(
      "NETLIFY_DATABASE_URL_UNPOOLED",
      "postgres://legacy.invalid/production",
    );
    native.read.mockReturnValue("postgres://preview.invalid/app");
    await import("./database-connection.js");
    const url = new URL(process.env.DATABASE_URL!);
    expect(url.hostname).toBe("preview.invalid");
    expect(url.searchParams.get("prepare")).toBe("false");
    expect(url.searchParams.get("max_pipeline")).toBe("1");
    expect(process.env.DATABASE_URL_UNPOOLED).toBe(url.toString());
    expect(process.env.NETLIFY_DATABASE_URL_UNPOOLED).toBe(url.toString());
  });

  it("preserves an existing PostgreSQL deployment when native DB is absent", async () => {
    const { MissingDatabaseConnectionError } =
      await import("@netlify/database");
    native.read.mockImplementation(() => {
      throw new MissingDatabaseConnectionError();
    });
    vi.stubEnv("DATABASE_URL", "postgres://legacy.invalid/app");
    await import("./database-connection.js");
    expect(process.env.DATABASE_URL).toBe("postgres://legacy.invalid/app");
  });

  it("supports a legacy deployment with only a direct connection", async () => {
    const { MissingDatabaseConnectionError } =
      await import("@netlify/database");
    native.read.mockImplementation(() => {
      throw new MissingDatabaseConnectionError();
    });
    vi.stubEnv(
      "NETLIFY_DATABASE_URL_UNPOOLED",
      "postgres://direct.invalid/app",
    );
    await import("./database-connection.js");
    expect(process.env.DATABASE_URL).toBe("postgres://direct.invalid/app");
  });

  it("does not hide unexpected native database failures", async () => {
    native.read.mockImplementation(() => {
      throw new Error("Unavailable");
    });
    await expect(import("./database-connection.js")).rejects.toThrow(
      "Unavailable",
    );
  });
});
