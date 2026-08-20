# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This repository currently contains **planning artifacts only** — no application code, no `package.json`, no framework scaffold. It is not yet a git repository. Do not assume any build/lint/test tooling exists; there is none to run.

- `docs/product-planning.md` — the source-of-truth product planning document for Panah Construction Group's website + admin panel rebuild. Read this first for any product, content-model, IA, or scope question.
- `pics/` — real reference assets from the client: `logo-8e44dffe.png` (transparent PNG, 909×290, horizontal lockup — verify it renders correctly against both light and dark backgrounds before use; request a vector source if available) and 15 architectural photos (exteriors: travertine/stone cladding, dark-framed windows; interiors: white walls, arched openings, wood-tone flooring, marble counters). Treat these as strong stand-in content for structural/design work — which specific project they belong to is still unconfirmed (see planning doc Section 26).
- Wireframes & user flows (Phase 1) exist as a published artifact, not a file in this repo — low-fidelity grayscale wireframes for Home, Projects Index, Project Detail, Services, Contact, Admin Dashboard, and Admin Project Editor, plus three user-flow diagrams (buyer journey, partnership/مشارکت journey, admin content-entry flow). Ask the user for the link if a future session needs to reference it; it is not checked into the repo.

When implementation begins, this file should be rewritten to describe the actual codebase (commands, architecture) rather than pointing at the planning doc.

## What's being built

Two products for a construction/development company in Rasht, Iran:
1. **Public website** — a portfolio/lead-generation site. Showcases projects and provides a way to make contact. **Not transactional** — no purchasing, checkout, booking, or reservation flow. Every "inquiry" resolves to a message or phone call.
2. **Admin panel** — lets the 3-person Panah team manage content without a developer. All three log in with **one shared username/password** — no multi-user accounts, no roles/permissions system, no approval workflow. Keep this simple; do not add role/permission complexity that wasn't asked for.

## Decided technical stack

Chosen and confirmed — not open options. See `docs/product-planning.md` Section 23 for full reasoning.

- **Frontend:** Next.js (React, App Router), SSR/SSG by default. This is the fix for the previous site's core flaw: it was a client-side-only SPA invisible to search engines (no server-rendered content, broken sitemap/robots.txt).
- **Styling:** Tailwind CSS, with design tokens as CSS variables/Tailwind theme config. Use logical properties (`ms-`, `me-`, `text-start`) for RTL/LTR readiness.
- **CMS/Admin:** Headless CMS, not a custom-built admin UI — **Sanity** is the primary recommendation (image pipeline, cost fit); **Strapi** (self-hosted) is the fallback if data must live entirely on infrastructure Panah controls.
- **Database/media:** Whatever the chosen CMS uses internally — not a separate decision.
- **Auth:** The CMS's built-in auth, configured for the single shared admin login. No custom auth system.
- **Forms:** Next.js API route writes submissions into the CMS as a Message entity; no separate form service.
- **Deployment:** Vercel (or equivalent CDN-backed Next.js host). Domain is `panah-co.com` (client-owned); hosting will be newly provisioned, not migrated from the current host.
- **Explicitly rejected:** WordPress (the current site's stack) — its plugin-sprawl tendency fights the SSR/performance requirements driving this rebuild.

## Content model essentials

Full field-level detail is in `docs/product-planning.md` Sections 8 and 15. Key points that are easy to get wrong:

- **Project status** is the *only* categorization axis for projects — there is no separate "project type" taxonomy. Status must be an **admin-configurable list** (name, order, color), not a hardcoded enum, seeded with Panah's real three-stage lifecycle: طراحی (Design) → اجرا (Execution) → بهره‌برداری (Operation/Handover).
- **Services** are exactly four, confirmed from the client's own Instagram bio — do not invent additional ones: مشارکت (partnership/joint-venture development), بازسازی (renovation), پیمانکاری (general contracting), طراحی و اجرا (design and execution).
- **Multilingual:** architect the content model with locale-aware fields/slugs from day one (Project, Service, Article, Page all get a locale dimension), and build every template RTL/LTR-ready — but populate Persian only at launch. English is infrastructure-ready, not launch scope.
- **No pricing fields** anywhere in the project model — confirmed non-transactional scope.
- **Journal/blog** is confirmed in scope (not conditional) — assign content ownership so it doesn't go stale.

## Design direction

No verified brand palette existed before this project (the old site ran on Elementor page-builder defaults, not a deliberate system). A concrete palette + type direction has since been explored (client asked explicitly for "modern, chic"): warm stone/plaster neutrals (`#efe9df` background, `#1c1a17` ink) with a travertine-tan accent (`#a67c52`) and deep umber secondary (`#3a3229`), pulled directly from Panah's own facade photography rather than a generic modern default. Type: Fraunces (display serif) + Inter (body/UI) + IranYekan (Persian body, kept from the current site). Published as an artifact, not a repo file — ask the user for the link. Still a proposal pending client reaction; do not treat as final until confirmed. Confirm the logo's actual colors against this direction once the logo file's display issue (CLAUDE.md above) is resolved.

## Content workflow — confirmed

We (the build team) populate the site with our own sample/placeholder content wherever Panah's real content isn't available yet — this is the intended workflow, not a stopgap. Panah will later log into the Admin Panel and replace it with real content themselves. Practical consequence: **every field in every content model must be editable through the Admin Panel with no developer involvement** — that's what makes the handoff work. Sample content should be structurally realistic (correct field lengths, plausible Persian copy, real image aspect ratios) but must never look like a real, invented company fact — sample statistics especially must read as obviously placeholder. The logo and 15 project photos in `pics/` can be used as sample content immediately.
