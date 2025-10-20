# Classical Music Discovery

An interactive classical music catalogue built with React. The public experience lets visitors browse works by genre, composer,
and piece, while a dedicated admin studio (optional in production builds) helps maintainers curate the underlying JSON catalog.

> **Note**
> This branch captures the static, catalog-driven rewrite. If you are migrating from the earlier Supabase prototype, follow the
> configuration and deployment steps below to adopt the new workflow. Set this branch (`catalog-rewrite`) as the default in
> GitHub before deploying so future pull requests target the rebuilt stack by default.

## Prerequisites

- Node.js 18+
- npm 9+

## Getting started

Install dependencies and launch the development server:

```bash
npm install
npm run dev
```

The public site runs at <http://localhost:5173/>. The admin studio lives at <http://localhost:5173/admin> when enabled.

To create an optimized production build run:

```bash
npm run build
```

## Configuration

Copy the example environment file if you need to customize runtime settings:

```bash
cp .env.example .env.local
```

Available variables:

- `VITE_BASE_PATH` &mdash; set this when deploying under a sub-path such as GitHub Pages (for example `/classical-app-v2/`).
- `VITE_CATALOG_URL` &mdash; optionally point to a remote `catalog.json`. When omitted, the bundled static catalog is used.
- `VITE_ENABLE_ADMIN` &mdash; set to `true` to include the admin studio in the build. Leave unset/`false` for public deployments.

## Catalog data model

The repertoire is stored as a structured JSON document (`public/catalog.json`). It captures a hierarchy of genres, composers,
and works:

```json
{
  "schemaVersion": 1,
  "generatedAt": "2024-01-01T00:00:00.000Z",
  "genres": [
    {
      "id": "baroque-1600-1750",
      "name": "Baroque",
      "period": "1600-1750",
      "composers": [
        {
          "id": "johann-sebastian-bach",
          "name": "Johann Sebastian Bach",
          "birthYear": 1685,
          "deathYear": 1750,
          "works": [
            {
              "id": "johann-sebastian-bach-brandenburg-concerto-no-3",
              "title": "Brandenburg Concerto No. 3",
              "year": 1721,
              "youtubeId": "pdsyNwUoON0",
              "searchTerm": "Bach Brandenburg Concerto No 3 full"
            }
          ]
        }
      ]
    }
  ]
}
```

During runtime the app loads the configured catalog (either the bundled file or the remote URL), validates its structure, and
renders the browsing interface. If the live catalog is unavailable the public experience falls back to the built-in data and
surfaces a friendly status message.

## Admin studio

Setting `VITE_ENABLE_ADMIN=true` enables the `/admin` route, which hosts an offline-friendly catalog editor:

- Load the currently configured catalog, start from the bundled default, or upload a previously exported JSON file.
- Add, edit, or remove genres, composers, and works with inline validation for common mistakes.
- Download the updated catalog as `catalog.json` for publication (commit it to version control or upload it to your preferred
  object store).

Because the studio runs entirely in the browser, it is safe to disable it for public deployments by leaving
`VITE_ENABLE_ADMIN` unset.

## Deployment checklist

1. Decide whether to serve the catalog from the bundled `public/catalog.json` or a remote JSON endpoint. If using a remote
   endpoint, upload the exported file and set `VITE_CATALOG_URL` during the build.
2. When hosting from a sub-path (e.g., GitHub Pages), set `VITE_BASE_PATH` before running `npm run build` so generated asset
   URLs resolve correctly.
3. Build the site with `npm run build` and deploy the `dist/` folder to any static host.
4. Omit `VITE_ENABLE_ADMIN` in production to hide the admin studio, unless you intend to expose it deliberately behind
   separate authentication.

## Quality checks

Run linting, type-checking, and a production build in one step:

```bash
npm run validate
```

## Project structure

- `public/catalog.json` &mdash; default repertoire data served in static builds.
- `src/catalog/` &mdash; catalog loading, parsing, and default dataset.
- `src/components/AdminStudio.tsx` &mdash; browser-based catalog editor.
- `src/pages/PublicExperience.tsx` &mdash; audience-facing experience using the loaded catalog.
- `src/lib/basePath.ts` &mdash; helpers for base-path aware routing and asset URLs.

## Support

If you encounter issues loading a custom catalog, check the browser console for validation errors. The admin studio always
validates uploaded documents before applying changes, helping you catch structural mistakes before publication.
