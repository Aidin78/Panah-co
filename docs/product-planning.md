# Panah Construction Group
## Website & Admin Panel Product Planning Document

**Status:** Draft for review — Discovery / Planning phase only. No implementation has begun.
**Date:** 2026-08-20
**Prepared as:** Source-of-truth planning document for design and engineering handoff.

---

## How to read this document

Every factual claim below is tagged:

- **[VERIFIED]** — directly observed from panah-co.com or the Instagram profile.
- **[ASSUMPTION]** — a reasonable inference based on industry norms, the local market, or partial evidence. Needs confirmation.
- **[NEEDS CONFIRMATION]** — a specific question Panah must answer before design starts.
- **[PLACEHOLDER]** — example content used only to illustrate structure; not real copy.

Do not treat ASSUMPTION or PLACEHOLDER content as final. Section 27 collects every open item in one place.

---

## 1. Executive Summary

Panah Construction Group ("Panah") is a construction, renovation, and development company operating in Rasht, Gilan, Iran [VERIFIED — Instagram bio: "ساخت و ساز در رشت و حومه"]. The company's primary digital presence today is a WordPress-based website (panah-co.com) rebuilt behind a custom JavaScript single-page application shell, plus an active Instagram account with ~2,000 followers [VERIFIED, as of 2026-08-20].

The current website has a critical technical and content problem: it renders as an essentially empty shell to any automated tool, crawler, or user with JavaScript disabled or slow — the entire page content loads client-side into a single `<div id="app">`, with no server-rendered fallback content, no discoverable sitemap, and a generic `<title>Panah Website</title>` and no meta description. This means the current site is very likely near-invisible to Google Search and to any link-preview tool (e.g., shared in Telegram/WhatsApp). This is the single most important problem the redesign must fix, independent of visual design.

This document proposes a full replacement: a fast, SEO-visible, bilingual-ready (Persian-first) marketing website built around a strong **Projects** system, paired with a purpose-built **Admin Panel** so Panah's own team can publish projects, news, and leads without a developer. The document defines information architecture, content models, admin requirements, design system direction, technical architecture options, a phased roadmap, and — critically — the full list of information and assets Panah must supply before visual design can start.

**Scope clarification (confirmed by Panah):** the website's job is to showcase completed and ongoing projects and provide a way to get in touch — it is not a transactional platform. No purchasing, checkout, booking, or unit-reservation flow happens on the site itself; every "inquiry" throughout this document resolves to a message or phone call, never a payment or transaction. This shapes the Projects system (Sections 8–9) and Contact system (Section 13) as portfolio and lead-capture tools, not e-commerce.

---

## 2. Research & Brand Analysis

### 2.1 What we could verify

**Website (panah-co.com)** [VERIFIED via HTTP source inspection]:
- Built on WordPress + Elementor Pro (page builder), with a custom Vue-based SPA layer injected on top (`<div id="app">`, bundled JS/CSS assets, `jquery` still loaded for legacy Elementor widgets).
- Site direction is `dir="rtl"`, confirming Persian as the primary/default language, even though `<html lang="en">` is incorrectly set on the tag itself — a bug.
- Custom font: **IranYekan** (a widely-used Persian webfont) is force-applied to all elements (`* { font-family: IranYekan !important }`), layered under Elementor's default Latin font stack (Jost, Space Grotesk, Roboto, Roboto Slab, Libre Franklin, Poppins) — evidence of theme bloat: many unused font families are still being loaded.
- Elementor global color tokens found in the stylesheet: primary `#6ec1e4` (light blue), secondary `#54595f` (slate gray), text `#7a7a7a`, accent `#61ce70` (green) — these are **Elementor's default demo theme colors**, not a custom brand palette. This strongly suggests the current site never had a deliberate color system applied; it's running close to page-builder defaults.
- Additional colors found in the compiled stylesheet: `#00bd7e` (a teal-green, appears twice, possibly an actual intentional accent), `#2c3e50` (dark navy-slate), plus grayscale `#181818`, `#222222`, `#282828`, `#f2f2f2`, `#f8f8f8`, `#ffffff`.
- The homepage, `robots.txt`, `sitemap.xml`, and WordPress REST API endpoints (`/wp-json/wp/v2/pages`, `/posts`, `/types`) **all return the identical SPA shell HTML** rather than real content or valid data — meaning the site has no functioning sitemap and no accessible structured content today. **[VERIFIED — this is a significant finding, not an assumption.]**
- Page `<title>` is the literal placeholder string **"Panah Website"** — not a real branded title. No meta description was found in the static HTML.
- We were unable to extract visible page copy, navigation labels, service names, or project names through static analysis, because all real content is rendered client-side by JavaScript after the page loads. A full content inventory will require a live browser session (see Section 26/28 recommendation) or content supplied directly by Panah.

**Instagram (@panah.construction.group)** [VERIFIED]:
- Display name: **گروه ساختمانی پناه** ("Panah Construction Group").
- Bio (verbatim, Persian): "ساخت و ساز در رشت و حومه / مشارکت، بازسازی، پیمانکاری / طراحی و اجرا / تلفن تماس: ۰۹۱۲۸۴۹۶۱۱۸"
  — Translation: "Construction in Rasht and surrounding areas / Partnership (joint-venture development), renovation, contracting / Design and execution / Phone: 0912-849-6118."
- Website link in bio: www.panah-co.com.
- ~2,029 followers / ~6,824 following at time of review — a following-heavy ratio typical of a small local business account that grows via manual outreach rather than paid/organic reach; a signal of limited social marketing investment so far, not a brand-strength indicator.
- Highlight categories observed include: "اسکلت تهران رشت" (Tehran–Rasht structural frame/skeleton work), "طراحی پلان" (floor plan design), "چالش تخریب" (demolition), plus highlights labeled with country names (South Korea, Russia, France, Poland) and generic ones (books, theater, "iran") — the international/lifestyle highlights suggest either travel/inspiration content or an owner-personality-driven account rather than a strictly corporate one. This needs interpretation from Panah directly.
- Recent posts (as visible) document construction project stages: structural/skeleton work, architectural/plan work, and progress photography, spanning content dated across roughly the last two years.

### 2.2 What this tells us (interpretation)

- **Services implied by the bio, not the website:** partnership/joint-venture development ("مشارکت" — a common Iranian real-estate model where the construction company partners with landowners), renovation ("بازسازی"), general contracting ("پیمانکاری"), and design + execution ("طراحی و اجرا"). These four are the only services we can currently treat as VERIFIED (from Instagram bio text). The website may list more, but we could not extract it — **[NEEDS CONFIRMATION]**.
- **No verified project names, addresses, unit counts, completion dates, square footage, or any quantifiable claims exist yet.** All such data must come from Panah directly. Nothing in this category should be invented.
- **No verified team names, company founding date, certifications, awards, or company history.**
- **No verified logo file, brand guideline, or official color palette** — what we found in the CSS are page-builder defaults, not a deliberate brand system. The redesign is a genuine opportunity (not just a technical rebuild) to define a real visual identity, ideally in partnership with Panah on brand fundamentals if none exist yet.

### 2.3 Strengths of the current presence

- Instagram shows real, ongoing construction activity and a habit of documenting projects photographically — this is a valuable content asset if we can access the original high-resolution images.
- The company already operates in a defined, focused geography (Rasht and surrounding Gilan province) with a clear, understandable service model (contracting + partnership development + renovation) — good conditions for clear IA and messaging.
- www.panah-co.com is already the established, memorized domain and is printed in their Instagram bio — no domain migration risk for the redesign.

### 2.4 Weaknesses / problems identified

**Technical / SEO:**
- Entire site is client-side rendered with no fallback content — effectively invisible to search engines and link previews. This alone likely suppresses organic discovery for a locally-searched business category ("ساخت و ساز رشت", "مشارکت در ساخت رشت", etc.) where local SEO should be a primary lead channel.
- Generic, unbranded page `<title>`, missing meta description, broken `lang` attribute vs. `dir="rtl"` mismatch.
- No working sitemap.xml — even if content were server-rendered, discovery would still be broken.
- Heavy, uncurated font loading (6+ font families requested) — likely hurts performance without corresponding design benefit, since only IranYekan is actually forced onto every element.
- Legacy WordPress/Elementor/jQuery stack layered under a custom SPA — an unusual and likely fragile hybrid architecture that is expensive to maintain and slow to extend.

**Brand / visual:**
- No evidence of a deliberate, documented color or type system — colors found are page-builder defaults, suggesting the visual identity was never fully designed, only assembled from a template.
- Given the CSS mismatch between the Persian IranYekan font (functionally used) and multiple Latin display fonts (loaded but likely unused for real content), the typographic system appears unresolved.

**Content / structure:**
- We could not verify a working Projects showcase, About page, Services page, or Contact page from static analysis — this may simply be a scraping limitation, but combined with the missing sitemap, it raises real doubt about whether the current site's content is complete, findable, or maintained.
- No blog/news/journal presence detected.

### 2.5 Opportunities

- Rebuilding as a **server-rendered (or statically generated) site** with a real Admin Panel would fix the SEO/discoverability problem outright and give Panah compounding organic value over time — very high leverage relative to cost.
- A dedicated, well-photographed **Projects** system is the highest-value content asset Panah can build, given they already produce construction photography organically via Instagram.
- Defining an actual brand color palette and type system (rather than inheriting page-builder defaults) is a low-cost, high-impact opportunity to differentiate from "generic construction template" positioning, directly addressing the brief's stated goal.
- A bilingual (Persian/English) structure could open the site to diaspora investors or partners in the future. **[CONFIRMED]** Panah wants the underlying architecture ready for this, but it is not a launch priority — see Section 18.

---

## 3. Business Objectives

Ranked by priority, based on the brief and research:

1. **Fix discoverability** — make the site indexable, crawlable, and shareable (P0, technical prerequisite to everything else).
2. **Establish credibility and premium positioning** — via design quality, photography, and clear information, replacing the generic-template impression.
3. **Showcase the project portfolio** — projects are the core trust-building asset and primary content type.
4. **Generate qualified leads** — for both property/unit inquiries and construction/partnership ("مشارکت") business development, via clear, low-friction contact paths.
5. **Give the Panah team independent content control** — via the Admin Panel, so new projects/news can be published without developer involvement.
6. **Support long-term marketing** — SEO foundation, shareable project pages, consistent brand assets for use in Instagram/print/offline materials.

---

## 4. Target Audiences

### Primary audiences

**A. Prospective property buyers / unit purchasers**
- Goals: find available or upcoming units, understand pricing tier, location, quality level, delivery timeline.
- Needs: real photos, floor plans, location context (neighborhood, proximity to amenities), trust signals (past completed work).
- Trust builders: photography quality, completed-project track record, transparent project status (under construction vs. delivered), real contact responsiveness.
- Primary CTA: "Contact about this project" / "Request more information" / phone call.
- Journey: Instagram or search → Homepage or direct project link → Project detail page → Contact.

**B. Landowners / potential "مشارکت" (joint-venture development) partners**
- This is a distinct and locally significant audience: landowners who want to partner with a builder to develop their land (very common business model in Iran, and explicitly named in Panah's Instagram bio).
- Goals: assess whether Panah is a credible, experienced, trustworthy partner for a multi-year commitment involving their property.
- Needs: evidence of completed partnership projects, clear explanation of how the partnership model works, company legitimacy signals (experience, scale, licensing if applicable).
- Trust builders: portfolio scale/consistency, clear "how it works" explanation, direct human contact.
- Primary CTA: "Discuss a partnership" / dedicated inquiry form distinguishing this from a general contact message.
- **[CONFIRMED]** Panah does not treat this audience as a higher priority than direct buyers — the two should be given equal navigational and content weight, not one elevated over the other.

**C. Renovation clients**
- Goals: understand if Panah handles smaller-scope renovation work, what that process looks like, rough scope/cost expectations.
- Needs: examples of renovation (vs. new-build) work, since these are visually and often commercially distinct project types.
- Trust builders: before/after photography, process clarity.
- Primary CTA: "Request a renovation consultation."

**D. General contracting clients**
- Goals: hire Panah as a contractor for a defined build (implied by "پیمانکاری" in the bio).
- Needs: scope of contracting services, capacity, past contracted work.
- Primary CTA: contact / request quote.

### Secondary audiences

- **Architects / designers** — may want to see design quality and potentially collaborate; interested in the "طراحی" (design) capability.
- **Contractors / suppliers** — potential B2B partners; interested in company scale and ongoing project pipeline.
- **Job candidates** — **[ASSUMPTION]** relevant if Panah is hiring; needs confirmation on whether careers content is wanted at all (Section 27).
- **General visitors / local community** — browsing awareness, possibly influenced by Instagram content.

---

## 5. Website Objectives (prioritized)

1. Be indexable and load fast — technical prerequisite (P0).
2. Present a clear, credible first impression within 5 seconds of landing (hero + positioning).
3. Make the project portfolio easy to browse and filter (by type/status/location).
4. Make contacting Panah trivially easy from any page (persistent contact access, not buried).
5. Clearly explain the four core services distinctly, especially separating "مشارکت" (partnership) from standard contracting, since they have different audiences and sales cycles.
6. Support content growth over time without developer involvement (Admin Panel).
7. Build long-term SEO equity for local search terms.
8. Provide a foundation for future bilingual expansion if confirmed necessary.

---

## 6. Website Information Architecture

### 6.1 Recommended sitemap

```
Home
├── Projects (index, filterable)
│   └── /projects/[slug] (Project Detail)
├── Services
│   └── /services/[slug] (Service Detail) — only if services justify individual pages; see Section 10
├── About
├── News / Journal (confirmed — see Section 12)
│   └── /journal/[slug] (Article Detail)
├── Contact
└── (Legal/utility, footer-only: Privacy Policy, Terms if applicable)
```

### 6.2 Reasoning — what changed from the brief's starting structure and why

- **Projects is elevated to the most structurally important section**, given it's the primary trust and conversion asset, and the one content type Panah already has raw material for (Instagram photography).
- **Services is kept as a real page, not merged into About**, because the two named service models (مشارکت/partnership vs. پیمانکاری/contracting vs. بازسازی/renovation) target meaningfully different audiences with different CTAs — collapsing them into About would bury important differentiation. Whether each service gets its own detail page or all three/four live on one page is addressed in Section 10 and depends on how much distinct content Panah can provide per service.
- **News/Journal is confirmed in scope** — see Section 12. Since sustaining it is what makes it valuable rather than a liability, recommend assigning clear ownership within the 3-person team from day one.
- A standalone **"Team" page is not included by default** — team/staff information was not verified and may not be something a company of this type wants to publish. If Panah wants it, it is proposed as a section within About rather than a separate top-level page, unless the team is large enough to justify one (**[NEEDS CONFIRMATION]**).
- No dedicated "Careers" page is included by default — add only if confirmed relevant (Section 27).

### 6.3 Per-page requirements

**Home**
- Purpose: Convert cold traffic into "I trust this company" within seconds; route visitors to Projects, Services, or Contact based on intent.
- Audience: All.
- Main content: Hero, featured projects, services summary, company credibility signals, CTA to contact.
- Primary CTA: "View Projects" — recommended over "Contact Us." A portfolio-first company should lead with proof, not an ask.
- Secondary CTA: Instagram follow / service-specific link.
- SEO purpose: Primary keyword target for company name + "ساخت و ساز رشت" (construction Rasht) type local queries.
- Required CMS content: hero media, featured project selection, stats, service summaries — all editable (see Section 7).

**Projects (index)**
- Purpose: Let all four audience types self-select relevant projects.
- Audience: Buyers, partners, contracting clients, architects.
- Main content: Filterable grid (by status, location), each card with cover image, title, location, status.
- Primary CTA: click into project detail.
- Secondary CTA: none needed; filters are the interaction.
- SEO purpose: Indexed list page; each project's metadata contributes to local search visibility.
- Required CMS content: full project list, each with the fields defined in Section 8.

**Project Detail**
- Purpose: Build deep trust in one specific project; convert to inquiry.
- Audience: Buyers, partners.
- Main content: gallery, key facts, description, location, related projects.
- Primary CTA: "Inquire about this project."
- Secondary CTA: "View similar projects" / share.
- SEO purpose: Long-tail local search, shareable link with correct Open Graph image (this is currently broken — no OG data was found on the live site).
- Required CMS content: all Section 8 fields.

**Services**
- Purpose: Explain what Panah does distinctly enough that a visitor self-identifies (buyer vs. partner vs. contracting client vs. renovation client).
- Audience: All primary audiences.
- Main content: service breakdown (structure depends on Section 10 decision).
- Primary CTA: contact, service-specific if possible.
- SEO purpose: Target service-specific local search terms (e.g., "مشارکت در ساخت رشت", "بازسازی ساختمان رشت").
- Required CMS content: service list with description, icon/image, related projects.

**About**
- Purpose: Establish company legitimacy, history, philosophy — critical for the partnership/مشارکت audience especially.
- Audience: Partners, buyers, contracting clients.
- Main content: company story, values, stats, (optional) team, (optional) certifications.
- Primary CTA: contact / view projects.
- SEO purpose: Brand + trust query support ("Panah construction who are they" type searches), supports E-E-A-T signals for SEO.
- Required CMS content: all fields in Section 11, most requiring company-supplied text.

**News / Journal** (conditional — see Section 12)
- Purpose: Demonstrate active operation, freshness, and expertise; incremental SEO value.
- Audience: All, especially returning visitors and search traffic.
- Main content: articles (project updates, company news, construction insights).
- Primary CTA: read more / related project link.
- SEO purpose: Long-tail content marketing, freshness signal.
- Required CMS content: article body, category, tags, cover image.

**Contact**
- Purpose: Convert any remaining intent into a message or call.
- Audience: All.
- Main content: phone, address, map, form (see Section 13).
- Primary CTA: submit form / call.
- Secondary CTA: Instagram / social links.
- SEO purpose: Local business schema (NAP consistency), Google Business Profile alignment.
- Required CMS content: contact details, map coordinates, form field configuration.

---

## 7. Homepage Structure

| # | Section | Purpose | Content | Required data | CTA | Interaction | Visual direction | Admin-editable |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | Immediate premium impression + positioning statement | Full-bleed project photo/video, headline, one-line positioning, primary CTA | Hero media, headline text, CTA link | "View Projects" | Optional subtle motion/parallax; static fallback required for perf | Large-format architectural photography, minimal text overlay, high contrast for legibility | Yes — media, headline, CTA target |
| 2 | Featured Projects | Prove capability immediately after hero | 3–6 curated projects, cover image, title, location, status | Manual "featured" flag per project | "View all projects" | Grid or horizontal scroll on mobile | Consistent card system, real photography only, no stock imagery | Yes — selection + order |
| 3 | Services Overview | Route each audience type to the right content | 3–4 service cards (partnership, contracting, renovation, design+execution) | Service name, one-line description, icon/image, link | Per-card "Learn more" | Static grid | Icon or photo-led cards, distinct visual identity per service to aid self-selection | Yes — text, order, links |
| 4 | Company Stats / Proof | Quantify credibility (years active, projects completed, area built, etc.) | 3–5 stat blocks | **[NEEDS CONFIRMATION]** real numbers from Panah — do not estimate | none (informational) | Optional count-up animation | Bold numerals, minimal supporting text | Yes — values + labels |
| 5 | About / Philosophy teaser | Humanize the company, build trust ahead of full About page | Short narrative (2–4 sentences) + photo (team, site, or founder) | Company-supplied text and photo | "Learn more about us" | Static | Editorial, warm, not corporate-generic | Yes — text, image |
| 6 | Featured Project Spotlight (optional, single large feature) | Deep-dive one flagship project for maximum trust impact | Large imagery, short story, key facts | One designated project | "View this project" | Large visual block | Editorial magazine-style layout | Yes — project selection |
| 7 | Instagram Feed | Show ongoing activity/freshness, bridge to existing audience | Latest 4–8 Instagram posts (via embed or manual curation) | Instagram API/embed or manual upload fallback | "Follow us" | Live embed if feasible, else manually curated grid | Consistent crop/grid | Partially — manual fallback yes; live embed is a technical decision (Section 23) |
| 8 | News/Journal teaser (if Journal is approved — Section 12) | Surface freshness and expertise | Latest 2–3 articles | Article list | "Read more" | Static cards | Consistent with project cards | Yes |
| 9 | Contact CTA (footer-adjacent) | Final conversion opportunity before footer | Phone, short CTA line, button | Contact details | "Contact us" / "Call now" | Sticky or high-contrast band | Simple, high-contrast closing section | Yes — text, phone, CTA link |

**Note:** Section 4 (Stats) must only ship with real, Panah-confirmed numbers. Under no circumstances should placeholder statistics (e.g., "10+ years," "50+ projects") be launched as if real — this violates the brief's rule against inventing company facts and is also a trust/legal risk once published.

---

## 8. Project Content Model

### Required fields

| Field | Type | Notes |
|---|---|---|
| Title | Text | Project name |
| Slug | Text (auto from title, editable) | URL identifier |
| Status | Select (admin-configurable list) | **[CONFIRMED]** Panah's real lifecycle: طراحی (Design) → اجرا (Execution) → بهره‌برداری (Operation/Handover). Model as an admin-managed list (name, order, color) rather than a hardcoded enum, seeded with these three stages, so Panah can rename/reorder/add a stage later without a developer. |
| Location | Text (+ optional map coordinates) | At minimum neighborhood/district in Rasht |
| Short description | Text (1–2 sentences) | Used in cards/listings |
| Full description | Rich text | Main narrative |
| Cover image | Media (image) | Primary card/hero image |
| Gallery | Media array (images) | Full photo set |
| SEO title | Text | Defaults to Title if empty |
| SEO description | Text | Defaults to Short description if empty |

### Optional fields

| Field | Type | Notes |
|---|---|---|
| Area (square meters) | Number | Only if Panah tracks/wants to disclose this |
| Number of units | Number | Relevant for multi-unit residential projects |
| Start date | Date | |
| Completion date | Date | |
| Architectural information | Rich text | Design approach, notable features |
| Construction information | Rich text | Materials, structural approach |
| Features / amenities | Tag list | e.g., parking, elevator, rooftop |
| Videos | Media array (video) or embed URL | |
| Tags | Tag list | Freeform, for filtering/related logic |
| Related projects | Reference array | Manual or auto (by type/location) |
| Client type | Select | e.g., private buyer, partnership landowner — useful internally, may not be public-facing |

**Fields deliberately excluded:** price/pricing tiers, checkout, booking, or reservation fields — confirmed out of scope; the site showcases projects and collects inquiries only, and any commercial conversation happens off-platform via phone or message. Unit-level floor plans as a separate entity (kept as gallery images/PDF attachments within a project instead, to avoid over-engineering a sub-entity for what may be very few multi-unit projects) — revisit if Panah's catalog has many large multi-unit developments needing per-unit tracking.

---

## 9. Project Detail Page Structure

1. **Hero** — full-width cover image/gallery lead image, project title, location, status badge.
2. **Key Info Bar** — compact row of the most important facts (status, location, area/units if available).
3. **Description** — full narrative text.
4. **Architecture & Construction Details** — only rendered if content exists for these optional fields (avoid empty sections).
5. **Gallery** — full photo set, lightbox-capable, optimized for large architectural images.
6. **Video** — if provided.
7. **Location** — map embed.
8. **Related Projects** — 2–3 cards (manually selected or same location/status).
9. **CTA band** — "Interested in this project?" contact prompt, scoped to reference this specific project in the resulting inquiry.

Sections with no content must not render as empty placeholders — the Admin Panel and template logic should hide any section lacking data (see Section 15 validation notes).

---

## 10. Services

**Recommendation: yes, a dedicated Services page is necessary**, given four distinct service concepts are already named in Panah's own Instagram bio and they address different audiences with different sales cycles (a landowner considering a partnership is a fundamentally different decision than someone hiring a renovation contractor).

**Verified service concepts (from Instagram bio only — [VERIFIED] as terms used, [NEEDS CONFIRMATION] as to exact scope/definition):**
1. مشارکت (Partnership / joint-venture development)
2. بازسازی (Renovation)
3. پیمانکاری (General contracting)
4. طراحی و اجرا (Design and execution)

**Structure recommendation:** one Services index page with a card per service (name, description, representative image, linked projects), each expanding to more detail either inline (accordion) or as its own detail page — the choice depends on how much distinct content Panah can supply per service. If descriptions stay short (1–2 paragraphs each), a single page with four sections is sufficient and simpler to maintain; only build four separate URLs if there's enough unique content and SEO value to justify it.

**Content model per service:**

| Field | Type | Required |
|---|---|---|
| Name | Text | Yes |
| Slug | Text | Yes |
| Short description | Text | Yes |
| Full description | Rich text | Optional |
| Icon or representative image | Media | Yes |
| Related projects | Reference array (manually selected) | Optional |
| Order | Number | Yes (controls display order) |

Do not invent additional services beyond these four without Panah's confirmation.

---

## 11. About Page Structure

| Element | Source | Status |
|---|---|---|
| Company introduction / story | Company-supplied | **[NEEDS CONFIRMATION]** — no verified founding date, history, or origin story exists yet |
| Philosophy / approach | Company-supplied | Not verified |
| Vision / mission | Company-supplied | Not verified |
| Values | Company-supplied | Not verified |
| Team | Company-supplied, optional | Not verified whether Panah wants to publish individual team members |
| Certifications / licenses | Company-supplied, optional | Common and often expected in Iranian construction (e.g., نظام مهندسی membership) — **[NEEDS CONFIRMATION]** whether Panah holds/wants to display these |
| Awards | Company-supplied, optional | Not verified |
| Statistics (years active, projects completed, etc.) | Company-supplied | Not verified — must not be estimated or invented |

All About page content is currently unverified and must be supplied by Panah before this page can be designed with real copy. A structural template can be designed now; content will be a placeholder until confirmed (see Section 27).

---

## 12. News / Journal

**[CONFIRMED] Yes — a blog/journal is wanted.** This is now an in-scope page in the sitemap (Section 6), not conditional.

**Use cases that fit Panah's actual activity (based on Instagram evidence of ongoing documented construction progress):**
- Project progress updates (e.g., "skeleton/structural phase complete on [project]") — this maps directly to what they already post on Instagram, so content reuse is realistic.
- Company announcements (new project launches, milestones).
- Light construction/architecture insight content (optional, lower priority).

**Still worth flagging:** A Journal section that goes stale (no posts for 6+ months) actively damages the "professional, active company" impression the brief wants to establish. With a 3-person team confirmed (Section 16), recommend assigning ownership of the Journal to one specific person from launch, at a light cadence — quarterly at minimum, ideally tied to project milestones already being photographed for Instagram — so it doesn't quietly go unmaintained.

**Structure:**
- Categories: Project Updates, Company News, (optional) Insights.
- Tags: freeform, project-linked where relevant.
- Article fields: title, slug, cover image, category, tags, body (rich text), published date, related project (optional reference), SEO title/description.
- Admin requirements: draft/publish workflow (see Section 17), same media handling as projects.

---

## 13. Contact System

**Content:**
- Phone number — **[VERIFIED, at least one number]:** 0912-849-6118 (from Instagram bio; confirm whether this is the correct primary business line for the website, or if a separate landline/office number exists — **[NEEDS CONFIRMATION]**).
- Email — **[NEEDS CONFIRMATION]**, none verified.
- Physical/office address — **[NEEDS CONFIRMATION]**, none verified.
- Map — pending address confirmation.
- Social links — Instagram verified; confirm if Telegram, WhatsApp Business, LinkedIn, or others should be included **[NEEDS CONFIRMATION]**.

**Forms — recommend two distinct intents rather than one generic form**, given the audience analysis in Section 4:

1. **General inquiry form** — name, phone, email (optional), message, optional "which project are you interested in" dropdown (auto-filled if arriving from a project page).
2. **Partnership (مشارکت) inquiry** — name, phone, land location, land area (if known), message. Kept distinct because this is a fundamentally different, higher-consideration business conversation than a general contact message, and routing/handling it separately (e.g., flagged differently in the Admin inbox) will help Panah triage faster.

**Post-submission behavior:**
- Confirmation message shown to user immediately.
- Message stored in Admin Panel "Messages/Leads" module (Section 14).
- **[NEEDS CONFIRMATION]** whether email notification to a Panah staff address is also required (recommended: yes, as a safety net so leads aren't only visible if someone logs into the admin panel).
- No automated SMS/WhatsApp integration assumed unless confirmed as a requirement.

---

## 14. Admin Panel — Information Architecture

### Dashboard
- Overview: counts of published/draft projects, unread messages, recent activity log.
- Quick actions: "New Project," "New Article," "View Messages."

### Projects
- List (filter/search by status, type), Create, Edit, Delete, Publish/Unpublish, Draft, Archive, Gallery manager, metadata fields per Section 8.

### Services
- List, Create, Edit, Delete, Reorder (drag-and-drop), Publish/Unpublish.

### Pages (static content)
- About, Contact, and any other one-off pages — structured content blocks matching Sections 7 and 11, editable without touching layout code.

### News / Journal (if approved)
- Articles, Categories, Tags, Draft/Publish workflow.

### Media Library
- Upload, delete, search, folder/category organization, alt text field (mandatory for accessibility/SEO), captions, usage tracking (which project/page uses a given file) — important given how many large images this system will hold.

### Messages / Leads
- Inbox split by type (General / Partnership), read/unread state, status (New/Contacted/Closed), archive, delete, export.

### Website Settings
- General info (company name, tagline), logo upload, contact info, social links, SEO defaults (default meta title/description pattern, default OG image), footer content, navigation menu management, language settings (if multilingual is approved).

---

## 15. Content Models — Summary Tables

### Project (see full detail in Section 8)

| Field | Type | Required | Description |
|---|---|---|---|
| Title | Text | Yes | Project name |
| Slug | Text | Yes | URL identifier |
| Status | Select (admin-configurable) | Yes | Project lifecycle stage — the only categorization axis; no separate project-type field |
| Location | Text | Yes | District/area in Rasht |
| Cover Image | Media | Yes | Main listing/hero image |
| Short description | Text | Yes | Card/listing summary |
| Full description | Rich text | Yes | Detail page body |
| Gallery | Media[] | No | Full photo set |
| Area | Number | No | Square meters |
| Units | Number | No | Unit count |
| Start/Completion dates | Date | No | |
| Architecture/Construction info | Rich text | No | |
| Features | Tag[] | No | |
| Video | Media/URL | No | |
| Tags | Tag[] | No | |
| Related projects | Reference[] | No | |
| SEO title/description | Text | No (defaults) | |

### Service

| Field | Type | Required |
|---|---|---|
| Name | Text | Yes |
| Slug | Text | Yes |
| Short description | Text | Yes |
| Full description | Rich text | No |
| Image/icon | Media | Yes |
| Related projects | Reference[] | No |
| Order | Number | Yes |

### Article (Journal)

| Field | Type | Required |
|---|---|---|
| Title | Text | Yes |
| Slug | Text | Yes |
| Cover image | Media | Yes |
| Category | Select | Yes |
| Tags | Tag[] | No |
| Body | Rich text | Yes |
| Related project | Reference | No |
| Status | Select (Draft/Published) | Yes |
| Published date | Date | Yes |
| SEO title/description | Text | No (defaults) |

### Message/Lead

| Field | Type | Required | Description |
|---|---|---|---|
| Type | Select | Yes | General / Partnership |
| Name | Text | Yes | |
| Phone | Text | Yes | |
| Email | Text | No | |
| Related project | Reference | No | Auto-filled if from project page |
| Message body | Text | Yes | |
| Land location/area | Text/Number | No | Partnership inquiries only |
| Status | Select | Yes | New / Contacted / Closed |
| Submitted date | Date | Auto | |

### Site Settings (singleton entity)

| Field | Type | Required |
|---|---|---|
| Company name | Text | Yes |
| Tagline | Text | No |
| Logo | Media | Yes |
| Phone(s) | Text[] | Yes |
| Email | Text | No |
| Address | Text | No |
| Map coordinates | Geo | No |
| Social links | URL[] | No |
| Default SEO title/description | Text | Yes |
| Default OG image | Media | Yes |

---

## 16. Roles & Permissions

**Confirmed by Panah:** the team is 3 people, and all three log in with **one shared username/password** — a single account, not individual logins. No multi-role or permission system is wanted; keep the Admin Panel simple.

**Single shared Admin account** — one login, full access to everything: content, settings, media, messages. No role model, no permission matrix, no user-management screen, no per-user accountability tracking. This is the simplest possible model and matches what Panah asked for directly.

Note for the technical phase: since three people share one credential, there's no way to attribute "who changed what" from login identity alone. If that ever becomes a problem in practice, a lightweight activity log (timestamped change history without user attribution) is a cheap addition — but it is not part of this scope unless requested.

---

## 17. Content Workflow

Recommended: **Draft → Published → Archived** — no Review/approval gate, since the single shared Admin login (Section 16) has no separate identities to route approval between.

- **Draft:** default state for new content; not visible on the public site.
- **Published:** live on the site.
- **Archived:** removed from public listings but retained in the admin for record-keeping (e.g., a sold-out or long-completed project Panah no longer wants featured but doesn't want to delete).

Anyone using the shared Admin login can create, edit, publish, archive, and delete freely. Archive is still recommended over hard-delete as the default action for retiring content, simply as a lightweight safety rail against accidental data loss.

---

## 18. Multilingual Strategy

**Current state:** site direction is RTL Persian; no English version was detected. Instagram content is Persian-only.

**[CONFIRMED] by Panah:** build the infrastructure for bilingual support, but it is not a launch priority. Persian-only content ships first.

Practically: use locale-aware fields/slugs in the content model from day one (Project, Service, Article, Page entities all get a locale dimension even though only `fa` is populated at launch), and build every template to support both RTL and LTR at the CSS level from the start. This is exactly the "architect now, populate later" approach that avoids the common trap of bolting on translation after the fact at high cost — English can be turned on by adding content and enabling the locale, not by rebuilding pages.

When English is prioritized:
- URL structure: `/en/...` prefix recommended (clear, standard, SEO-safe) vs. subdomain.
- Translation workflow: manual (company-provided or professionally translated) — do not machine-translate customer-facing content for a premium-positioned brand.
- SEO: separate meta title/description per locale, hreflang tags.

---

## 19. SEO Strategy

Given the current site's near-total lack of crawlable content, this is a high-priority, high-leverage area.

**Requirements:**
- Server-rendered or statically-generated HTML for every public page (directly addresses the core flaw found in research) — see Section 23.
- Per-page: title, meta description, canonical URL, Open Graph image/title/description, Twitter Card tags.
- Auto-generated, always-current `sitemap.xml` and correct `robots.txt` (both currently broken).
- Structured data (JSON-LD): `LocalBusiness` schema on Contact/homepage, `Article` schema on Journal posts if built, potentially `Product`/`RealEstateListing`-adjacent schema for project pages if applicable to local SEO best practice.
- Meaningful, descriptive slugs for every project/service/article (not auto-numbered IDs).
- Image alt text required at upload time in the Admin Panel (not optional) — critical given how image-heavy this site will be.

**Admin-editable SEO fields:** per-entity SEO title, SEO description, OG image override, plus global defaults in Site Settings (Section 15) so nothing ships without at least a fallback.

---

## 20. Media Management

Construction/architecture photography is the site's primary asset class, so this deserves explicit requirements:

- Support large source images (architectural photography is often shot at high resolution) with automatic server-side resizing/optimization into responsive srcsets — never serve one full-resolution file to all devices.
- Support modern formats (WebP/AVIF) with fallback, generated automatically on upload rather than requiring manual export by the admin user.
- Gallery reordering (drag-and-drop) per project.
- Mandatory alt text field at upload or at time of attaching to a project (accessibility + SEO, not optional).
- Optional caption field.
- Featured/cover image designation distinct from gallery membership.
- Basic video support: either direct file hosting (with size limits and background transcoding) or embed-based (YouTube/Vimeo unlisted links) — embed-based is recommended initially for simplicity and cost, revisit direct hosting only if volume/quality needs exceed what embeds provide.
- Reasonable file size limits enforced at upload with clear error messaging (exact limits are a technical/hosting decision, Section 23).

---

## 21. Design System Direction (planning only — no final UI)

This section defines the *categories* to design later, not final values, since no verified brand palette exists yet (Section 2).

**Colors to define:** Primary, Secondary, Background, Surface, Text (primary/muted), Border, Accent, Success, Error/Warning. Recommendation: do not inherit the Elementor default colors found in research (`#6ec1e4` blue / `#61ce70` green) — these are demo-theme defaults, not a deliberate choice, and carry no brand equity worth preserving. A genuinely new palette should be proposed at the visual design phase.

**Material signal from received photography (Section 26):** the 15 project photos now in hand show a consistent, premium material language worth grounding the palette in directly, rather than an abstract "construction premium" placeholder: warm travertine/stone facade cladding, dark bronze/charcoal window and door framing, clean white interior walls, arched window openings as a recurring architectural motif, wood-tone flooring, and marble countertops. This points toward a palette built on warm stone neutrals with a dark bronze/charcoal accent, rather than the cool light-blue/green currently on the live site — a much stronger match to what Panah's actual buildings look like. Confirm this reading against the logo file once its true colors are verified (Section 26).

**Typography to define:** Persian typeface (IranYekan is already in use and is a solid, professional, widely-supported choice — recommend keeping it unless Panah wants a distinct brand typeface) with a clear heading/body/label/button hierarchy; drop the currently-loaded unused Latin display fonts (Jost, Space Grotesk, Poppins, Libre Franklin) unless a specific Latin typographic need is confirmed (e.g., for a future English version).

**Spacing:** a consistent scale (e.g., 4px or 8px base unit) to be defined at the design-system phase.

**Component inventory to plan for:** buttons, form inputs/selects, project cards, filter controls, pagination, image gallery/lightbox, navigation (header + mobile menu), modal/drawer, tabs, data tables (admin), image uploader, toasts/alerts, empty states, loading states.

---

## 22. UX Principles

1. **Content and photography first** — the design system should showcase real project imagery, not compete with it.
2. **Clear audience self-selection** — a visitor should immediately understand which of the four service paths applies to them.
3. **Minimal friction to contact** — contact access should never be more than one click away from any page.
4. **Fast, indexable, resilient** — performance and SEO are treated as UX, not afterthoughts.
5. **Consistent card and layout systems** — projects, services, and articles should feel like one coherent system, not separately designed modules.
6. **Accessible by default** — alt text, color contrast, keyboard navigation, RTL-correct layout.
7. **Admin usability equals public usability** — the Admin Panel is a product for non-technical users and should be designed with the same care as the public site.

---

## 23. Technical Architecture

The scope confirmed through this review — a single shared admin login, no multi-role permissions, no transactional/checkout logic, a modest content volume (dozens of projects, not thousands), and bilingual-ready-but-Persian-only at launch — points toward a small, low-operational-overhead stack rather than an enterprise CMS platform. The recommendation below is a decided stack, not a menu of options, so Phase 3 can start building against it directly; deviations should have a specific reason.

### Frontend — Next.js (React), App Router
Server-rendered/statically-generated by default. This directly fixes the core flaw found in research (Section 2): the current site is invisible to crawlers because it renders client-side only. Next.js gives per-page control over rendering strategy — static generation for rarely-changing pages (About, Services), incremental static regeneration for Projects/Journal (fast, but reflects new Admin Panel publishes without a full rebuild), and this is the most mature option for the SSR/SEO/RTL requirements in Sections 18–19. React's ecosystem also has the deepest bench of contributors available if Panah needs to bring in outside help later.

### Styling / Design system implementation
Tailwind CSS, with design tokens (Section 21's colors/type/spacing) defined as CSS variables/Tailwind theme config — keeps the eventual design system enforceable in code rather than drifting per-component, and gives fast RTL/LTR logical-property support (`ms-`, `me-`, `text-start`, etc.) which matters given Section 18's bilingual-ready requirement.

### Backend / CMS — Headless CMS (Sanity or Strapi), not a fully custom admin build
Given a single shared login and no role/permission requirements (Section 16), building a fully custom Admin Panel from scratch is not worth the development time — a headless CMS gets Panah a working, non-technical-friendly editing interface immediately, customized to the exact content models in Section 15 (Project, Service, Article, Message, Site Settings). Recommend **Sanity** specifically: strong image pipeline (automatic responsive/optimized delivery, directly addresses Section 20's large-photography requirement), a real free/low-cost tier appropriate to this project's scale, and a structured-content model that maps cleanly onto Section 15's tables without fighting the tool. **Strapi** (self-hosted) is the fallback if Panah needs the data to live entirely on infrastructure they control rather than a third-party service — worth a direct conversation before committing, since it shifts hosting/maintenance responsibility onto whoever manages the project after launch.

### Database
Whichever the chosen CMS uses internally (Sanity: its own hosted content lake; Strapi: PostgreSQL) — not a separate architectural decision once the CMS choice above is made.

### Media storage & delivery
Handled by the CMS's built-in asset pipeline (Sanity's CDN-backed image API, or Strapi + S3-compatible storage behind a CDN if self-hosted) — satisfies Section 20's responsive-image and format requirements without custom infrastructure.

### Authentication
Admin Panel: the CMS's own built-in authentication, configured for the single shared login confirmed in Section 16 — no custom auth system needs to be built. Public site: no user accounts, consistent with the non-transactional scope confirmed in Section 1.

### API
Consume the CMS's native API (Sanity's GROQ/Content Lake API, or Strapi's REST/GraphQL) directly from Next.js server components — no separate custom API layer is needed between the CMS and the frontend for this scope.

### Forms / lead capture
Contact and partnership inquiry forms (Section 13) post to a lightweight serverless function (a Next.js API route) that writes the submission into the CMS as a Message entity and optionally triggers an email notification — no separate form-handling service needed.

### Domain &amp; hosting
**[CONFIRMED]** Domain is `panah-co.com`, client-owned — kept, no migration to a new domain. **[CONFIRMED]** Hosting will be newly provisioned rather than reused from the current host, which removes any legacy-hosting constraint on the technical choices above.

### Deployment
Frontend on **Vercel** (native Next.js hosting, global CDN, zero-config preview deployments for reviewing changes before they go live) or an equivalent CDN-backed Next.js host. Since hosting is being newly set up rather than migrated, recommend a direct, practical connectivity test from within Iran to the chosen provider before committing — global CDN reachability from Iran varies by provider and isn't something to assume works well without checking.

### Why not WordPress again
The current site's core problem (Section 2) is a fragile WordPress + Elementor + custom-SPA hybrid that broke server-side rendering entirely. A from-scratch WordPress rebuild would still carry WordPress's structural tendency toward plugin sprawl and would fight, not help, the SSR/performance requirements driving this whole redesign — not recommended as an option.

---

## 24. Future Development Phases

- **Phase 0 — Discovery & Research (this document):** brand research, requirements gathering, planning. ✅ In progress/complete pending review.
- **Phase 1 — Product & UX Planning refinement:** finalize open questions (Section 27), user flow diagrams, wireframe-level page structures based on confirmed content.
- **Phase 2 — Visual Design:** design system (real palette/type), full desktop + mobile UI for public site and Admin Panel.
- **Phase 3 — Backend & CMS:** database, API, authentication, Admin Panel build.
- **Phase 4 — Website Development:** public site implementation against the design system and content models.
- **Phase 5 — Content Migration & Population:** load confirmed real project/company data; this cannot start meaningfully until Section 27's "required before design" items are resolved.
- **Phase 6 — QA:** functional, responsive, accessibility, SEO, performance testing (should explicitly re-verify the sitemap/indexability fixes from Section 19).
- **Phase 7 — Launch:** deployment, monitoring, Google Search Console/Business Profile setup and verification.

---

## 25. Open Questions

### Resolved during review

| Question | Resolution |
|---|---|
| Homepage primary CTA — browsing vs. contact? | View Projects. A portfolio-first company should lead with proof before asking for contact. (Section 7) |
| Is مشارکت a bigger priority than direct buyers? | No — confirmed equal weight for both audiences, no elevation of one over the other. (Section 4) |
| Can the team sustain a News/Journal? | Confirmed: yes, wanted. Recommend assigning clear ownership within the 3-person team so it doesn't go stale. (Section 12) |
| Is English/multilingual a business priority? | Infrastructure only, not launch scope — build locale-aware data model and RTL/LTR-ready templates now; populate English later. (Section 18) |
| Real project lifecycle stages? | طراحی (Design) → اجرا (Execution) → بهره‌برداری (Operation), modeled as an admin-editable list rather than hardcoded. (Section 8) |
| Admin Panel team size / login model? | 3 people, sharing one single login (username/password) — no multi-account, no role system. (Section 16) |
| Domain / hosting? | Domain confirmed as panah-co.com (client-owned, keep it). Hosting will be newly provisioned — not a migration from the current host. (Section 23) |
| Project type taxonomy? | Confirmed: there isn't one. Status (the three-phase lifecycle) is the only categorization axis for projects — no separate "project type" field. (Section 8) |

### Still open

None outstanding from this review round. Remaining unknowns are the actual content items listed in Section 26 (project list, service copy, company story, verified contact details, statistics) rather than open product decisions.

---

## 26. Information Required From Panah

### Received

- **Logo file** — `logo-8e44dffe.png`, provided in `/pics`. Transparent PNG, 909×290px (wide horizontal lockup). Note: renders as blank against a plain white background in at least one viewer used during this review, suggesting the artwork itself may be light-colored/white or rely on transparency in a way that needs verifying against an actual dark and light background before use — confirm the file displays correctly, and request a vector/source version (AI, SVG, or EPS) if one exists, since a 909×290 raster PNG will not scale cleanly to all the sizes a logo needs (favicon, large hero lockups, print).
- **Project photography** — 15 images provided in `/pics`, genuine high-quality architectural photography (verified by direct inspection): travertine/stone facade cladding with dark-framed windows on exteriors, and clean white interiors with arched window openings, wood-look flooring, and marble countertops on interiors. This is real, usable material and confirms a premium material palette (warm stone, dark metal trim, marble, arched openings) worth carrying into the visual design system (Section 21) rather than defaulting to a generic construction palette.
- **[NEEDS CONFIRMATION]** Which project(s) do these 15 photos belong to, and do they represent a launch-ready project entry (with name, location, status, description) or are they sample/placeholder material for structure purposes only? Until confirmed, they should be treated as strong stand-in content for design and layout work, not published as a "real" project page.
- **Domain** — `panah-co.com`, confirmed client-owned, no migration needed.
- **Hosting decision** — confirmed new hosting will be provisioned rather than reused from the current provider (see Section 23).

### Content workflow — confirmed

**[CONFIRMED]** For anything not yet supplied by Panah, we (the build team) will populate the site with sample/placeholder content ourselves so design and development can proceed without waiting on every piece of company copy. Panah will later log into the Admin Panel and replace this sample content with real content directly — this is the intended, expected way real content enters the system, not a stopgap. Practically, this means:

- Every content model in this document (Section 15) must be fully editable through the Admin Panel with no field requiring developer involvement, since Panah — not us — will be the one entering final content.
- Sample content should be clearly realistic in *structure* (right field lengths, realistic image aspect ratios, plausible Persian copy) so the layouts it validates hold up once swapped for real content, but must never be mistaken for real company facts (see the hard rule on statistics in Section 7 — sample stats must be obviously placeholder, not plausible-looking invented numbers).
- The 15 received project photos and the logo (below) can be used directly as sample content now, since they are real assets — not invented ones — even before we know exactly which project they represent.

### Still to be entered by Panah (via Admin Panel, once built)

- Official company description / positioning statement (in Panah's own words).
- Confirmation of whether the logo's actual colors should anchor the new palette (Section 21), once the file's display issue below is resolved.
- Real project list: names, locations, statuses, and descriptions for each project — including which project(s) the 15 received photos belong to.
- Confirmed, accurate service definitions for the four identified services (مشارکت، بازسازی، پیمانکاری، طراحی و اجرا) — scope and any additional services not visible on Instagram.
- Company history/story content for About page.
- Verified contact information: primary phone (confirm 0912-849-6118 is correct for the site), email, physical address if applicable.
- Any real, factual statistics (years in business, projects completed, etc.).
- Team member details/photos, certifications/awards, News/Journal articles, careers content, English-language content — all can be entered whenever Panah is ready, none of these block launch.

---

## 27. Recommended Next Steps

1. Review this document with Panah's stakeholders and resolve any remaining questions.
2. Proceed with design and development using our own sample content everywhere Panah's real content isn't yet available (Section 26) — this is the confirmed workflow, not a fallback. The logo and 15 project photos already in hand can be used directly.
3. Build the Admin Panel so every field in Section 15's content models is editable without developer involvement — this is what makes the "Panah enters their own content later" workflow actually work at launch.
4. Optionally, commission a live-browser (JavaScript-rendered) audit of the current panah-co.com to extract any existing copy that static analysis could not reach, as additional sample-content material rather than starting from zero — this was outside the reach of the tools used for this document.
5. Once the Admin Panel is live, hand it to Panah so they can begin replacing sample content with real content on their own schedule.
