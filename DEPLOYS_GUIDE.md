# Sirona Detergents Website — Deployment Guide

This guide explains how to run the Sirona Detergents Ltd. corporate website
(and its built-in Admin CMS) on your own machine for development, and how to
deploy it to production with a custom domain and SSL.

---

## 1. Project Overview

| Layer     | Technology                                   |
| --------- | -------------------------------------------- |
| Framework | Next.js 16 (App Router) + React 19           |
| Language  | TypeScript                                   |
| Styling   | Tailwind CSS v4 (RTL-first, Hebrew content)  |
| Database  | PostgreSQL via Drizzle ORM (node-postgres)   |
| CMS       | Built-in lightweight CMS at `/admin`         |
| Images    | Files uploaded through the CMS are stored in `public/uploads/` |

All editable site copy lives in the `site_content` table (falls back to
built-in Hebrew defaults), incoming B2B inquiries live in the `inquiries`
table, and admin accounts live in the `admins` table.

---

## 2. Prerequisites

- **Node.js 20 or newer** (recommended: the current LTS release)
- **npm** (comes with Node.js)
- **PostgreSQL 14+** — either a local installation, a Docker container, or a
  hosted database (Neon, Supabase, Railway, AWS RDS, etc.)

Quick local Postgres via Docker (optional):

```bash
docker run --name sirona-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=app_db \
  -p 5432:5432 -d postgres:16
```

---

## 3. Environment Variables

Create a file named `.env` in the project root (or configure the same
variables in your hosting provider's dashboard):

```bash
# Required — PostgreSQL connection string
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db

# Admin CMS — initial account (used once, the first time /admin is opened)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=sirona-2025

# Secret used to sign admin session cookies.
# Generate your own, e.g. with: openssl rand -hex 32
ADMIN_SECRET=replace-with-a-long-random-string
```

> **Security note:** After the first login, immediately change the password
> inside the Admin panel (**Settings / הגדרות** tab). The `ADMIN_PASSWORD`
> environment variable is only used to *seed* the very first admin account;
> afterwards the password stored (scrypt-hashed) in the database is used.

---

## 4. Running Locally (Development)

From the project root:

```bash
# 1. Install dependencies
npm install

# 2. Create the database tables (reads drizzle.config.json / DATABASE_URL)
npx drizzle-kit push

# 3. Start the development server
npm run dev
```

Then open:

- Public website: **http://localhost:3000**
- Admin CMS: **http://localhost:3000/admin**
  (log in with `ADMIN_USERNAME` / `ADMIN_PASSWORD` from your `.env`)

To verify everything works end-to-end:

1. Submit a test inquiry via **צור קשר** (Contact page).
2. Log in to `/admin` → the inquiry appears under **פניות** (Inquiries).
3. Edit any text under **עריכת תוכן** (Content) → hard-refresh the public
   page → the new text appears immediately.

### Production-mode smoke test on localhost

```bash
npm run build
npm run start
```

The site is now served exactly as it would be in production on
http://localhost:3000.

### Useful commands

| Command                | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Development server with hot reload        |
| `npm run build`        | Production build                          |
| `npm run start`        | Serve the production build                |
| `npm run typecheck`    | TypeScript check (`tsc --noEmit`)         |
| `npx drizzle-kit push` | Apply schema changes to the database      |

---

## 5. Deploying to Production

### Option A — Vercel (recommended, zero-config)

1. **Provision a hosted PostgreSQL database.**
   Create a database at [Neon](https://neon.tech), Supabase, Railway or any
   Postgres provider and copy its connection string
   (e.g. `postgresql://user:pass@host/dbname?sslmode=require`).

2. **Push the schema to the production database** (from your machine):

   ```bash
   DATABASE_URL="postgresql://<prod-connection-string>" npx drizzle-kit push
   ```

3. **Import the repository into Vercel**
   ([vercel.com/new](https://vercel.com/new)) — no build settings need to be
   changed; Vercel detects Next.js automatically.

4. **Add the environment variables** in
   *Project → Settings → Environment Variables*:
   `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SECRET`
   (use a fresh random secret, and expose them to Production + Preview).

5. **Deploy.** Vercel builds and publishes the site to a `*.vercel.app` URL.

6. **Bind your custom domain** (e.g. `www.sirona.co.il`):
   - In Vercel: *Project → Settings → Domains → Add* and enter the domain.
   - At your DNS registrar create:
     - `A` record for the apex domain (`sirona.co.il`) → `76.76.21.21`
     - `CNAME` record for `www` → `cname.vercel-dns.com`
   - Wait for DNS propagation (usually minutes, up to 48 hours).
   - **SSL is automatic** — Vercel issues and renews a free Let's Encrypt
     certificate for the domain.

> **Uploaded images & persistence:** Vercel's filesystem is ephemeral, so
> files uploaded via the CMS (`public/uploads/`) do not survive redeploys on
> serverless platforms. For production on Vercel, either (a) re-upload images
> after each deploy and keep originals on the admin's PC, or (b) mount a
> persistent object store (e.g. S3/Vercel Blob) by adapting
> `src/app/api/admin/upload/route.ts`. If you need zero-maintenance uploads,
> prefer Option B below (a VPS with a persistent disk).

### Option B — VPS / Dedicated server (persistent uploads)

1. Install Node.js 20+, PostgreSQL, and clone the repository.
2. Create `.env` with the production values (see §3).
3. Run:

   ```bash
   npm install
   DATABASE_URL=... npx drizzle-kit push
   npm run build
   ```

4. Run the app with a process manager:

   ```bash
   npm install -g pm2
   pm2 start "npm run start" --name sirona-web
   pm2 save && pm2 startup
   ```

5. Put Nginx (or Caddy) in front as a reverse proxy on ports 80/443 and
   obtain an SSL certificate (e.g. `certbot --nginx`).
6. Point your DNS `A` record at the server's IP address.

### Option C — Netlify / other Node hosts

Any host that supports a **Node.js runtime for Next.js** will work. The
build command is `npm run build` and the start command is `npm run start`
(or the platform's Next.js adapter). Make sure the platform provides a
persistent filesystem or use an external object store for uploaded images.

---

## 6. Post-Deployment Checklist

- [ ] `/api/health` returns `{ "ok": true }` (confirms the DB connection).
- [ ] You can log in to `/admin` with the seeded credentials.
- [ ] You changed the default admin password (Settings tab).
- [ ] A test inquiry from the Contact page appears in **פניות**.
- [ ] A text edit in **עריכת תוכן** is immediately visible on the live site.
- [ ] A logo upload in **תמונות ולוגו** is reflected in the header.
- [ ] The custom domain loads over **https://** with a valid certificate.

---

## 7. Backups

Two things are worth backing up regularly:

1. **The database** (content overrides, inquiries, admin accounts):
   `pg_dump <DATABASE_URL> > backup-$(date +%F).sql`
2. **The `public/uploads/` folder** (admin-uploaded images and logo).

Factory defaults for all text and images are baked into the codebase, so a
fresh installation always renders a complete website even with an empty
database.
