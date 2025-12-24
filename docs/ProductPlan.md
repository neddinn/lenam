# Product Plan Document

## Product name (working): **FlashLearn**

Tagline: **“Interview-ready in minutes: Drill it, learn it, prove it.”**

### North Star Metric

**Readiness Rate** = % of users who reach **Ready (≥80)** on a preset within a session or within 24 hours.

Support metrics:

- Time-to-first-quiz-attempt (target: <90 seconds)
- Repeat drills in 48h
- Trial → paid conversion
- Monthly churn (target: ≤6% once stable)

---

## 1) Core thesis & positioning

### The promise

- Users don’t want “content.” They want **readiness under pressure**.
- The differentiator is not that you “use AI,” but that you provide a **closed loop**:
  - **measurement (drill)**
  - **targeted teaching (morphing page)**
  - **verification (micro-quiz)**
  - **readiness score**

### Who it’s for (v1)

- Developers prepping for interviews (1–7 YOE works fine; start with frontend + system design topics).

### What you will not do in v1

- No full course platform
- No generic “learn anything” marketing
- No teams/SSO/enterprise admin
- No open-ended chatbot as the main interface

---

## 2) The product: two modes, one platform

### Mode A — **Drill Mode** (Plan 4)

A high-intensity, structured interview drill.

### Mode B — **Teach Me Mode** (Plan 2)

A morphing learning page generated from:

- the topic
- the user’s background tags
- the goal (Interview/Build/Concept)
- the exact gaps revealed by the drill

This is one product. Users bounce between modes continuously.

---

## 3) MVP scope (what to ship in 48–72 hours)

### MVP definition (non-negotiable)

A user can:

1. Pick a topic and a goal (Interview default)
2. Take a short drill (5–10 minutes)
3. Miss something
4. Click **Teach Me**
5. See a **morphing page** tailored to the miss
6. Take a micro-quiz
7. Return to drill and improve readiness
8. Hit a paywall after a free allowance

If you can ship that, you have a real product, not a demo.

### MVP constraints (keep it shippable fast)

- Limit to **~20–50 topics** initially (seeded)
- Question types: start with **MCQ + short structured answers**
- Citations: start with “official docs links per section” (not perfect, but visible trust layer)
- Only one depth: **Solid** (later add Skim/Deep)

---

## 4) UX / Screens (detailed spec)

### Screen 0 — Landing

**Goal:** conversion into first drill fast.

Sections:

- Hero: “Interview-ready in minutes.”
- Demo embed (recorded) showing Drill → Teach Me → score improves
- CTA: “Start a Drill”
- Social proof placeholders (even if minimal)
- Pricing teaser

Buttons:

- **Start free drill**
- **See pricing**

---

### Screen 1 — Topic + Preset Setup (Intent Capture)

Fields:

- Topic search (typeahead)
- Goal selector (tabs):
  - Interview (default)
  - Build
  - Concept
- Background tags (chips):
  - React, Node, Java, Python, AWS, etc.
- Optional: “Target level” (Junior/Mid/Senior)

Primary CTA:

- **Start Drill (5 min)**

Secondary CTA:

- **Generate Learning Page**

Implementation note: keep this to a single screen. Fast.

---

### Screen 2 — Drill Mode (Session)

Layout:

- Header: Topic + goal + timer + readiness meter (live)
- Main panel: one question at a time
- Answer input:
  - MCQ (fast)
  - Short answer with rubric (structured)
- Confidence selector (Low/High)

After each question:

- Immediate feedback:
  - correct/incorrect
  - short explanation
  - citations toggle (“show sources”)
- Buttons:
  - **Teach me this** (appears if wrong OR low confidence)
  - Next question

Session end:

- Score summary:
  - correctness
  - high-confidence wrong count
  - readiness score
- Recommendations:
  - “Teach Me the top gap”
  - “Re-drill (harder)”

---

### Screen 3 — Teach Me Mode (Magical Learning Page)

This is the Plan 2 magic.

Sticky **Steering Strip**:

- Goal: Interview / Build / Concept
- Depth: Skim / Solid (Deep later)
- Context tags editor
- “Bridge Note” toggle (on by default)

Body layout (Solid default):

1. Hook (1 sentence)
2. Bridge Note (1 paragraph tailored to tags)
3. Visual anchor (Mermaid diagram or structured bullets fallback)
4. 3–5 sections (goal-shaped)
5. “Stop & Think” micro-quiz (2–3 checks) targeted to the gap
6. CTA:
   - **Back to Drill**
   - **Save preset**

Important behavior:

- Changing steering strip should be **sub-second** by rewriting only delta blocks, not regenerating everything.

---

### Screen 4 — Preset Library (Retention)

Shows saved presets with:

- last readiness score
- last attempted date
- “Continue drill”
- “Teach Me”

Optional streak:

- “3-day readiness streak”

---

### Screen 5 — Paywall / Pricing

Simple tiers:

- Free: limited drills / day and limited Teach Me generations
- Pro: unlimited drills + unlimited Teach Me + saved presets + advanced modes

---

## 5) Content + Question design (what makes it “interview-grade”)

### Question types (start here)

1. **Concept discriminators (MCQ)**
   Good for speed and reliable grading.
2. **Trade-off questions (choose best explanation)**
   “Which statement best captures why RSC helps…”
3. **Debug reasoning (choose what breaks)**
   “Given this snippet, what happens?”
4. **Short answer with rubric**
   You grade by checking for required points (structured evaluation).

Avoid in v1:

- fully open-ended “roleplay interviews” (costly + hard to grade reliably)

### Grading approach (robust MVP)

For short answers, grade via rubric checklist:

- Required points list (3–6 bullets)
- Score = points hit / total
- Provide “what you missed” and link to Teach Me

This produces consistent scoring and supports remediation.

---

## 6) Monetization plan (designed for $1M ARR)

### Pricing (recommended)

- **Pro $39/mo** (high willingness to pay for interview prep)
- Annual: $299/yr

Free tier:

- 1 drill session/day (e.g., 8 questions)
- 3 Teach Me pages/week
- No saved presets (or limited to 3)

Paywall triggers (in-product, not just pricing page)

- After finishing first drill summary: “Unlock unlimited drills”
- When clicking “Teach Me” after quota: “Unlock to fix gaps instantly”
- When saving preset: “Save & track readiness with Pro”

Revenue math target:

- $39/mo → $1M ARR ≈ 2,137 subscribers
  This is realistic if you nail retention via the Drill↔Teach loop.

---

## 7) Release plan (what to do when)

### Phase 0 — 2–3 days: “Working loop” private alpha

Ship the smallest real loop.

- 20 topics
- Solid pages
- 200–400 vetted quiz items total (generated + critic)
- Stripe test mode working

Recruit 10–20 users (friends, X, ex-colleagues).
Goal: observe if people repeat drills and feel improvement.

### Phase 1 — Week 1: Paid beta (small)

Open to 50–200 users.

- Turn on Pro payments
- Offer “Founding Pro” discount for first 100

Success criteria:

- ≥20% of active users do a second session within 48h
- Some users pay without heavy persuasion

### Phase 2 — Weeks 2–4: Retention + quality hardening

- Better quiz critic
- Better citations
- Better “Teach Me gap targeting”
- Preset sharing
- Improve latency

Success criteria:

- Trial→paid ≥ 25–35% (depending on trial design)
- Churn signals low: people keep using until they “get the job”

### Phase 3 — Month 2+: Add growth channel (optional Plan 3 slice)

Only after conversion/retention looks good:

- Public “Skim” pages for acquisition (minimal SEO)
- Programmatic topic publishing
- Sitemap + OG images
- CTA: “Drill this topic”

(You can do this later without changing the product’s core.)

---

## 8) Architecture (Canonical + Delta, optimized for speed + cost)

### Core idea

- **Canonical content**: shared, cached, stable blocks
- **Delta overlay**: cheap personalized blocks (bridge note, emphasis, targeted micro-quiz)
- **Verification**: quiz items pass a critic; key claims have citations

### Runtime flow

1. User chooses preset (topic + goal + tags)
2. Fetch canonical page (cached)
3. Render delta overlay (cheap generation)
4. Show quiz items (precomputed + verified)
5. Save attempts and compute readiness
6. If user fails, generate a “gap page” delta

---

## 9) Database model (Postgres/Supabase)

Below is a schema that supports the full v1 loop without overbuilding.

### `users`

- `id` uuid pk
- `email` text unique
- `created_at` timestamptz

### `topics`

- `id` uuid pk
- `slug` text unique
- `title` text
- `domain` text (e.g., `frontend`, `system_design`)
- `created_at`

Indexes:

- unique(`slug`)

### `canonical_pages`

- `id` uuid pk
- `topic_id` uuid fk -> topics
- `depth` text enum (`skim`,`solid`)
- `version` int
- `blocks` jsonb _(structured content blocks)_
- `sources` jsonb _(list of citations/urls)_
- `last_verified_at` timestamptz
- `created_at`

Indexes:

- (`topic_id`, `depth`, `version desc`)

Example `blocks` shape:

- `hook`
- `sections[]` (title, body, optional code)
- `diagram` (mermaid string or null)
- `pitfalls[]`
- `glossary[]`

### `presets`

- `id` uuid pk
- `topic_id` fk
- `goal` enum (`interview`,`build`,`concept`)
- `depth` enum (`skim`,`solid`,`deep`)
- `background_tags` text[]
- `level` enum nullable (`junior`,`mid`,`senior`)
- `share_slug` text unique nullable
- `owner_user_id` uuid nullable (null = system preset)
- `created_at`

### `page_deltas`

Personalized overlay for a given user+preset+canonical.

- `id` uuid pk
- `user_id` fk
- `preset_id` fk
- `canonical_page_id` fk
- `bridge_note` text
- `visibility_rules` jsonb _(what to show/hide/emphasize)_
- `gap_focus` jsonb nullable _(what concept this delta targets)_
- `created_at`

Indexes:

- (`user_id`, `preset_id`, `canonical_page_id`)

### `quiz_items`

Pre-generated verified questions tied to a canonical page and optionally a goal.

- `id` uuid pk
- `canonical_page_id` fk
- `goal` enum nullable
- `question_type` enum (`mcq`,`short_rubric`)
- `prompt` text
- `choices` jsonb nullable
- `correct_answer` jsonb _(for mcq: choice id; for rubric: required points list)_
- `explanation` text
- `citations` jsonb
- `critic_report` jsonb
- `verified` boolean
- `version` int
- `created_at`

Indexes:

- (`canonical_page_id`, `goal`, `verified`)

### `drill_sessions`

- `id` uuid pk
- `user_id` fk
- `preset_id` fk
- `started_at` timestamptz
- `ended_at` timestamptz nullable

### `quiz_attempts`

- `id` uuid pk
- `user_id` fk
- `drill_session_id` fk
- `quiz_item_id` fk
- `answer` jsonb
- `confidence` enum (`low`,`high`)
- `is_correct` boolean
- `score` numeric nullable _(for rubric grading)_
- `created_at`

Indexes:

- (`user_id`, `created_at`)
- (`drill_session_id`)

### `readiness_snapshots`

Materialized “current state” per user+preset.

- `id` uuid pk
- `user_id` fk
- `preset_id` fk
- `readiness_score` numeric
- `correctness` numeric
- `high_conf_wrong` int
- `self_report_confidence` int nullable (1–5)
- `updated_at`

Unique:

- unique(`user_id`, `preset_id`)

### `subscriptions`

(Stripe mapping)

- `id` uuid pk
- `user_id` fk
- `stripe_customer_id` text
- `stripe_subscription_id` text
- `status` text
- `current_period_end` timestamptz
- `created_at`

### `usage_ledger` (for quotas)

- `id` uuid pk
- `user_id` fk
- `event_type` enum (`drill_question`,`teach_page_render`,`tutor_message`)
- `quantity` int
- `created_at`

---

## 10) API endpoints (minimal contract)

- `POST /api/topic/resolve` → topic_id, slug
- `POST /api/drill/start` (preset params) → drill_session_id
- `GET /api/page/canonical?topic_slug=&depth=` → canonical page blocks
- `POST /api/page/delta` (user+preset+canonical+gap) → delta blocks
- `GET /api/quiz/next?canonical_page_id=&goal=` → quiz item
- `POST /api/quiz/attempt` → grading + updated readiness
- `GET /api/readiness?preset_id=` → snapshot
- `POST /api/preset/save` → preset_id + share_slug
- `POST /api/billing/create-checkout-session`

---

## 11) LLM pipelines (what to generate vs cache)

### Generate once (cache hard)

- Canonical pages (Skim/Solid)
- Quiz items (verified)
- Diagram (optional)

### Generate per user (cheap deltas)

- Bridge Note (1 paragraph)
- Gap-focused remediation delta
- Section visibility/emphasis rules

### Verification (critical)

- Quiz critic pass: reject ambiguous distractors, check correctness
- Citation linker: attach at least 1–3 sources per key section

---

## 12) What to build _today_ (ultra-concrete build order)

### Day 1: ship the loop skeleton

1. Next.js app + Supabase auth
2. `topics`, `canonical_pages`, `quiz_items` tables
3. “Topic setup” screen → creates a preset
4. Drill screen with:
   - fetch quiz item
   - submit answer
   - show correct/incorrect
5. Basic readiness score

### Day 2: add the magic (Teach Me mode)

6. Teach Me screen rendering:
   - canonical blocks
   - delta bridge note
7. Steering strip that triggers delta regeneration only
8. Micro-quiz on the teach page
9. Stripe paywall + quota ledger

### Day 3: make it demoable and sellable

10. Preset saving + share link
11. Landing page + pricing page
12. Add 20–50 topics and generate canonicals + quizzes in batch
13. Instrument events (PostHog/Mixpanel)

---

## 13) Risks & mitigations (pragmatic)

### Risk: wrong info kills trust

Mitigation:

- citations toggle visible by default (or one-click)
- “last verified” timestamp
- critic pipeline for quizzes
- allow “Report issue” on any question; queue for regeneration

### Risk: Drill feels generic → churn

Mitigation:

- remediation page is gap-specific (not generic topic tutorial)
- readiness score visibly improves after Teach Me
- saved presets + streaks

### Risk: cost/latency

Mitigation:

- cache canonicals + quiz items
- deltas only on steering changes/failures
- stream responses

---

## Final directive (the path forward)

**Start building FlashLearn today as Plan 4 + Plan 2 integrated.**
Ship the Drill↔Teach↔Re-drill loop in 48–72 hours.
Get 20 users on it immediately. Charge early. Iterate on trust + remediation quality.

If/when you want an additional growth lever, add a _small_ slice of Plan 3 later (public skim pages), but don’t let it delay the core loop.

---
