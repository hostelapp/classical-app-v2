# Classical Music Discovery

An interactive catalogue of classical repertoire powered by Supabase and React. The public site lets visitors explore works by
genre, composer, and piece, while a protected `/admin` surface allows authorized editors to manage the catalogue.

## Prerequisites

- Node.js 18+
- npm 9+
- Supabase CLI (for applying migrations) and access to a Supabase project

## Environment configuration

1. Copy the example environment file and fill in the values for your Supabase project:

   ```bash
   cp .env.example .env.local
   ```

2. Ensure the following variables are set before building the app:

   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

   When running the admin seeding script (see below) you will also need:

   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

The app validates these variables at runtime and will fail fast if any are missing.

## Database setup

This repository includes Supabase migrations that create and harden the schema. Apply them with the Supabase CLI:

```bash
supabase db push
```

The migrations will:

- Create the `videos` table, seed the canonical repertoire entries, and maintain `updated_at` via a trigger.
- Enable row-level security so the public site has read-only access while only admin accounts (identified by
  `app_metadata.is_admin = true`) can insert, update, or delete records.
- Enforce basic data integrity (YouTube ID length, non-null constraints, etc.).

## Creating an administrator

Run the provided script once per environment to create or update a privileged CMS user:

```bash
ADMIN_EMAIL="you@example.com" \
ADMIN_PASSWORD="use-a-strong-password" \
SUPABASE_URL="https://your-project.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="service-role-key" \
npm run seed:admin
```

The script either creates the user or updates an existing account, ensuring `app_metadata.is_admin` is set to `true` so the
account can use the `/admin` tools. Email confirmations remain enabled—Supabase marks the seeded admin as confirmed without
disabling confirmations globally.

## Running the project locally

```bash
npm install
npm run dev
```

The public catalogue lives at `http://localhost:5173/`. The CMS is intentionally hidden behind the dedicated
`http://localhost:5173/admin` route.

### Quality gates

Run all static checks in one step:

```bash
npm run validate
```

This command executes ESLint, TypeScript type-checking, and a production build.

## Deployment checklist

1. Ensure Supabase migrations have been applied to the target project (`supabase db push`).
2. Run `npm run seed:admin` with production credentials to provision at least one admin user.
3. Provide the frontend with the production `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables.
4. Build the site with `npm run build` and deploy the generated assets (e.g., to Vercel, Netlify, or any static host).
5. Confirm that `/admin` is reachable only by accounts where `app_metadata.is_admin` is `true` and that public visitors can
   browse the catalogue without authentication.

## Security notes

- Never ship Supabase service-role keys to the browser. The admin script is meant to run locally or in secure CI/CD contexts.
- All destructive CMS actions require explicit confirmation and are logged to the browser console to aid debugging.
- If you onboard additional admins manually via the Supabase dashboard, remember to set `app_metadata.is_admin` to `true` so
  they can authenticate against the CMS.

## Project structure highlights

- `src/pages/PublicExperience.tsx` renders the audience-facing experience using the live `videos` table as the single source
  of truth.
- `src/pages/AdminApp.tsx` gates the CMS, checking both authentication status and the `is_admin` claim before loading the
  editor surface.
- `src/components/AdminCMS.tsx` provides the CRUD interface with client-side validation layered on top of Supabase RLS.
- `supabase/migrations` contains repeatable schema and data migrations; use the Supabase CLI to keep environments in sync.

## Support

If you encounter issues while configuring Supabase policies or provisioning admin users, review the CLI output first. Most
errors stem from missing environment variables or insufficient Supabase API permissions when running the seeding script.
