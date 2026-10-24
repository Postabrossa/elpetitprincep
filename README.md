# My App

An app built with [Builder.io](https://www.builder.io) on the
[Agent-Native](https://agent-native.com?utm_source=github&utm_medium=referral&utm_content=fusion-starter-readme) framework. Replace this paragraph with
what the app does and who it's for.

## Develop locally

```bash
cp .env.example .env
corepack enable
pnpm install
pnpm dev
```

`.env.example` sets `AUTH_DISABLED=true` as a commented-out option; uncomment it
to skip sign-in while developing.

## Project layout

- `app/`: routes and UI components
- `actions/`: operations shared by the UI and the app's agent
- `server/`: server plugins and the database client
- `drizzle/`: schema and migrations; start with `drizzle/START_HERE.md`

Framework docs: [agent-native.com/docs](https://agent-native.com/docs?utm_source=github&utm_medium=referral&utm_content=fusion-starter-readme).

## Netlify deployment

The app uses `@netlify/database` to resolve the database for the current deploy.
The connection is passed to the framework's existing SQL and authentication
clients at runtime and in release migrations. This keeps previews on their own
database branch. Existing PostgreSQL connection settings remain supported when
Netlify Database is unavailable; local development can still use PGlite.
The framework's SQL client disables prepared statements and query pipelining
for the native connection to work with Netlify's transaction proxy.

Framework release migrations run after compilation for every deploy, including
previews, and must succeed before publishing. A missing PostgreSQL connection
fails the release instead of migrating a disposable local database and leaving
the deployed session endpoint without its tables.
