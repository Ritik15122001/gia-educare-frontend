# GIA Educare — website, API & admin panel

A three-part workspace:

| App | Folder | Dev URL | What it is |
|---|---|---|---|
| **Website** | `.` (repo root) | http://localhost:5183 | Public marketing site (React + Vite). All content comes from the API. |
| **API** | `backend/` | http://localhost:5001/api/v1 | Node + Express + MongoDB. Content, enquiries, auth, uploads. |
| **Admin panel** | `admin/` | http://localhost:5174 | React admin for content, leads and settings. |

---

## Prerequisites

- Node.js 20+
- MongoDB 6/7 running locally (`brew services start mongodb-community@7.0`)

> **Port note:** the API runs on **5001**, not 5000 — macOS AirPlay Receiver occupies 5000.

---

## First-time setup

```bash
# 1. API
cd backend
cp .env.example .env        # adjust secrets if you like
npm install
npm run seed                # loads the launch content + creates the admin user
npm run dev                 # → http://localhost:5001/api/v1

# 2. Website (from the repo root, in a second terminal)
npm install
npm run dev                 # → http://localhost:5183

# 3. Admin panel (third terminal)
cd admin
npm install
npm run dev                 # → http://localhost:5174
```

**Seeded admin login:** `admin@giaeducare.com` / `Admin@12345` — change it from *Profile* after signing in.

---

## How content flows

```
Admin panel ──PATCH──▶ API ──▶ MongoDB
                        │
Website ──GET /public/content──┘   (one request, all published rows)
```

- The website fetches `/public/content` once on boot into a Zustand store, so every
  section renders from the database.
- Each collection has a `published` flag; unpublished rows are invisible to the
  public API but stay editable in the admin.
- Rows carry an `order` value — drag them in the admin to reorder the live site.
- The site ships with the launch content bundled as a **fallback**
  (`src/data/fallback.js`), so if the API is unreachable the pages still render
  real copy instead of empty sections.

## What is editable

Destinations · Courses · Course fields · Services · Testimonials · Team · Values ·
Milestones · Stats · Process steps · Study levels · FAQs · Comparison table ·
plus **section copy** (every heading and intro paragraph) and **site settings**
(brand, logo, phones, emails, offices, socials, SEO).

Enquiries submitted on the website land in the admin inbox with status tracking,
internal notes and CSV export.

---

## Production build

```bash
cd backend && npm start      # serve the API (set NODE_ENV=production + real secrets)
npm run build                # website  → dist/
cd admin && npm run build    # admin    → admin/dist/
```

Serve the two `dist/` folders as static sites and point their
`VITE_API_BASE_URL` at the deployed API. Add both origins to `CORS_ORIGINS` in
the backend `.env`.
