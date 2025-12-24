# FlashLearn v1 PRD (Drill ↔ Teach ↔ Re-drill Loop)

## 0) Summary

FlashLearn is an interview readiness trainer for developers. The v1 product is a closed loop:
**Drill (measure)** → **Teach Me (gap remediation)** → **Micro-quiz (verify)** → **Re-drill (re-measure)**
Users earn a **Readiness Score (0–100)** per preset. The product wins if users can reliably move from “not ready” to “ready” quickly and feel it.

**North Star Metric:** Readiness Rate = % of users who reach **Ready (≥80)** on a preset within a session or within 24h.

---

## 1) Goals, non-goals, success criteria

### Goals (v1)

- Get a user into their first drill attempt in **< 90 seconds** from landing.
- Deliver a credible **readiness score** that improves after remediation.
- Make “Teach Me” feel **gap-specific**, not generic content.
- Ship a working paid loop with quotas + Stripe.

### Non-goals (v1)

- Full courses, cohorts, community
- Open-ended chatbot as primary UI
- Teams/SSO/enterprise
- Deep personalization beyond bridge note + gap emphasis + targeted micro-quiz
- Complex skill graph across topics

### Success criteria (v1 alpha → beta)

- **TTFQA** (time-to-first-quiz-attempt): median < 90s
- **Repeat within 48h**: ≥20% of active users do a 2nd session within 48h
- **Teach Me usage**: ≥40% of sessions contain at least one Teach Me click after a miss/low confidence
- **Readiness lift**: among sessions using Teach Me, ≥60% show +10 readiness within 24h on that preset
- Paid beta: some users pay without manual selling; target trial→paid 25–35% once stable

---

## 2) Core entities

- **Topic**: “React Rendering,” “HTTP caching,” “Load balancing”
- **Preset**: Topic + Goal (Interview/Build/Concept) + Depth (Skim/Solid) + Tags + Level
- **Canonical Page**: cached blocks for Topic+Depth
- **Delta Overlay**: user/preset personalization and/or gap focus blocks
- **Quiz Items**: verified items tied to canonical page and optionally goal
- **Drill Session**: a set of quiz attempts for a preset
- **Readiness Snapshot**: latest readiness score per user+preset

---

## 3) User journeys & user stories

### Journey A: First-time user (core)

1. Land → Start free drill
2. Choose topic + goal + tags → Start drill
3. Answer 8–12 questions (MCQ + short rubric)
4. Miss/low confidence → click Teach Me
5. See gap-focused page + micro-quiz
6. Return to drill, improve readiness
7. Hit quota/paywall, upgrade

**User stories**

- As a user, I can start a drill quickly without reading a course.
- As a user, when I get something wrong, I can instantly learn _that exact gap_.
- As a user, I can prove improvement with a score that updates immediately.

### Journey B: Returning user (retention)

1. Open preset library
2. Continue drill OR Teach Me for last gap
3. Build a streak / keep readiness above threshold

---

## 4) Readiness scoring (v1 spec)

### Inputs per attempt

- `is_correct` (boolean) or rubric `score` (0–1)
- `confidence` (low/high)
- `question_difficulty` (optional v1; can default 1.0)
- timestamp

### v1 Readiness Score (simple + defensible)

Per preset, compute on last **N = 12** attempts (or fewer if new, but mark as “Provisional” until ≥8).

1. **Accuracy component**

- MCQ: `a = 1 if correct else 0`
- rubric: `a = score` (0–1)

2. **Confidence penalty**
   If `confidence=high` and answer incorrect, apply penalty:

- `penalty = 0.15` (subtract from `a`, floor at 0)

So adjusted attempt score:
`adj = max(0, a - (high && incorrect ? 0.15 : 0))`

3. **Readiness**
   `readiness = round(100 * average(adj over last N))`

4. **Provisional state**

- If attempts < 8: show “Provisional” badge + lighter meter UI
- Readiness Rate “Ready (≥80)” only counts when attempts ≥ 8

**Why this works for v1:** stable enough, rewards true accuracy, punishes confident misses, easy to explain.

---

## 5) Functional requirements by screen

## Screen 0: Landing

**Objective:** get into drill fast.

**Must**

- Hero + CTA “Start free drill”
- Demo embed (recorded)
- Pricing teaser + “See pricing”
- Minimal social proof placeholders

**Acceptance criteria**

- Clicking “Start free drill” routes to Setup screen with no auth wall (auth can be deferred until after first session start, but before saving presets/paid).

---

## Screen 1: Setup (Topic + Preset)

**Inputs**

- Topic search/typeahead from seeded topics
- Goal tabs: Interview (default) / Build / Concept
- Background tags chips (multi-select)
- Optional level (junior/mid/senior)

**Actions**

- Primary: Start Drill (5 min)
- Secondary: Generate Learning Page (Teach Me) (allowed but nudges to Drill)

**Acceptance criteria**

- Topic must be selected to proceed.
- Start Drill creates (or reuses) a preset + creates a drill session.
- First quiz item loads within target latency (e.g., p95 < 2s for alpha).

---

## Screen 2: Drill Mode

**Header**

- Topic + goal + timer (optional) + readiness meter (live)
- Confidence selector (low/high) required before submit (or default low)

**Question types**

- MCQ
- Short structured answer graded by rubric checklist (LLM-graded or deterministic rubric matching; for v1, allow LLM rubric scoring but store critic + rubric points)

**After submit**

- Immediate feedback: correct/incorrect, short explanation
- Citations toggle “Show sources”
- If wrong OR low confidence: show “Teach me this”

**Session end**

- Summary: correctness, high-confidence wrong count, readiness score
- Recommendations: Teach Me top gap, Re-drill

**Acceptance criteria**

- Submit → feedback shown without page reload.
- “Teach me this” appears on wrong OR low confidence.
- Readiness meter updates after every attempt.
- Drill session ends after configurable number of questions (default 8–12) or user ends.

---

## Screen 3: Teach Me (Morphing Page)

**Inputs**

- Canonical page blocks (cached)
- Delta overlay blocks:
  - Bridge note (1 paragraph)
  - Emphasis/visibility rules (highlight relevant sections)
  - Gap-focused micro-quiz (2–3 items)

**Steering strip**

- Goal toggle (Interview/Build/Concept)
- Depth toggle: Skim/Solid (Deep later)
- Context tags editor
- Bridge Note toggle (on default)

**Behavior**

- Steering change should update only delta blocks (bridge note/emphasis/micro-quiz). Canonical remains stable.
- Micro-quiz is targeted to the gap; passing it should increase readiness slightly (or mark “gap closed” and the next drill should reflect it).

**Acceptance criteria**

- Teach Me loads within p95 < 2.5s (alpha) with canonical cached.
- Steering change does **not** refetch/regenerate canonical blocks.
- “Back to Drill” returns to Drill Mode for same preset.
- Micro-quiz attempts are recorded and contribute to readiness (even lightly).

---

## Screen 4: Preset Library

**List items**

- Preset title (topic + goal)
- Last readiness score + last attempted date
- CTA: Continue drill
- CTA: Teach Me

**Acceptance criteria**

- Only saved presets appear (free may be limited).
- Continue drill creates a new drill session for that preset.

---

## Screen 5: Pricing / Paywall

**Free**

- 1 drill session/day (8–12 Q)
- 3 Teach Me renders/week
- Saved presets: 1 (or 0 if you prefer harder gate)

**Pro**

- unlimited drills + Teach Me
- saved presets + advanced modes later

**Paywall triggers**

- After first drill summary (“Unlock unlimited drills”)
- On Teach Me click when quota exceeded
- On “Save preset” when blocked

**Acceptance criteria**

- Quotas enforced via `usage_ledger`
- Stripe checkout session created and returns success/cancel routes
- Subscription status gates quotas immediately after successful payment

---

## 6) API contract (v1 minimal)

(You already listed most; here’s a crisp contract + payload shape guidance.)

### `POST /api/topic/resolve`

Input: `{ query: string }`
Output: `{ topic_id, slug, title }`

### `POST /api/drill/start`

Input: `{ preset: { topic_id, goal, depth, tags, level } }`
Output: `{ preset_id, drill_session_id, readiness_snapshot }`

### `GET /api/page/canonical?topic_slug=&depth=`

Output: `{ canonical_page_id, blocks, sources, version, last_verified_at }`

### `POST /api/page/delta`

Input: `{ user_id, preset_id, canonical_page_id, gap_focus?, steering: { goal, depth, tags, bridge_note_on } }`
Output: `{ delta_id, bridge_note, visibility_rules, micro_quiz_items[] }`

### `GET /api/quiz/next?canonical_page_id=&goal=&exclude_attempted=true`

Output: `{ quiz_item_id, question_type, prompt, choices? }`

### `POST /api/quiz/attempt`

Input: `{ drill_session_id, quiz_item_id, answer, confidence }`
Output: `{ is_correct, score?, explanation, citations, readiness_snapshot, gap_focus? }`

### `GET /api/readiness?preset_id=`

Output: `{ readiness_score, correctness, high_conf_wrong, updated_at, provisional }`

### `POST /api/preset/save`

Input: `{ preset_id }`
Output: `{ preset_id, share_slug }`

### `POST /api/billing/create-checkout-session`

Input: `{ price_id, success_url, cancel_url }`
Output: `{ checkout_url }`

---

## 7) Acceptance criteria checklist (definition of “done” for v1)

### The loop (non-negotiable)

- [ ] User can pick topic+goal and start drill
- [ ] User answers at least 8 questions with immediate feedback
- [ ] On miss/low confidence, user can click Teach Me
- [ ] Teach Me page reflects the specific miss (gap focus) and shows targeted micro-quiz
- [ ] User can go Back to Drill and score changes based on new attempts
- [ ] Readiness reaches “Ready (≥80)” only after minimum attempts threshold
- [ ] Quota/paywall blocks further usage and Pro unlock removes blocks

### Trust layer

- [ ] “Show sources” exists for drill explanations and Teach Me sections (links list is fine)
- [ ] “Last verified” timestamp shown on Teach Me page (canonical)

### Reliability

- [ ] All quiz attempts are persisted and retrievable
- [ ] Readiness snapshot updates after each attempt and is consistent across refresh

---

## 8) Event taxonomy (PostHog/Mixpanel)

### Naming convention

Use snake_case events. Include `user_id` implicitly via analytics identity. All events include:

- `app_version`
- `environment` (dev/staging/prod)
- `session_id` (web session)
- `device_type` (desktop/mobile)
- `utm_source`, `utm_campaign` when present

### Acquisition & onboarding

**`landing_viewed`**
Props: `referrer`, `utm_*`

**`cta_clicked`**
Props: `cta_id` (start_free_drill / see_pricing), `location` (hero/footer)

**`setup_viewed`**
Props: `from` (landing/pricing/library)

**`topic_selected`**
Props: `topic_slug`, `topic_domain`

**`goal_selected`**
Props: `goal`

**`tags_updated`**
Props: `tags_count`, `tags` (optional), `level`

**`drill_started`**
Props: `preset_id`, `topic_slug`, `goal`, `depth`, `tags_count`, `level`, `is_new_preset`

### Drill engagement

**`quiz_item_viewed`**
Props: `quiz_item_id`, `question_type`, `topic_slug`, `goal`, `attempt_index_in_session`

**`quiz_submitted`**
Props: `quiz_item_id`, `question_type`, `confidence`, `time_on_question_ms`

**`quiz_feedback_shown`**
Props: `quiz_item_id`, `is_correct`, `score` (0–1), `high_conf_wrong` (bool)

**`sources_toggled`**
Props: `context` (drill/teach), `is_open`

**`teach_me_clicked`**
Props: `trigger` (wrong/low_conf/quota_block), `quiz_item_id`, `gap_focus_type` (concept/misconception/skill)

**`drill_completed`**
Props: `drill_session_id`, `questions_answered`, `readiness_start`, `readiness_end`, `delta_readiness`, `high_conf_wrong_count`

### Teach Me engagement

**`teach_page_viewed`**
Props: `preset_id`, `canonical_page_id`, `delta_id`, `gap_focus_present` (bool)

**`steering_changed`**
Props: `changed_field` (goal/depth/tags/bridge_note), `goal`, `depth`, `tags_count`, `bridge_note_on`

**`delta_generated`**
Props: `delta_reason` (steering_change/gap_remediation), `gen_latency_ms`

**`micro_quiz_started`**
Props: `delta_id`, `items_count`

**`micro_quiz_submitted`**
Props: `micro_item_id`, `is_correct`, `score`, `confidence`

**`back_to_drill_clicked`**
Props: `preset_id`, `from_gap_focus` (bool)

### Retention / library

**`preset_saved`**
Props: `preset_id`, `topic_slug`, `goal`, `depth`

**`preset_library_viewed`**
Props: `presets_count`

**`preset_continue_clicked`**
Props: `preset_id`

### Monetization

**`paywall_viewed`**
Props: `trigger` (drill_complete/teach_quota/save_preset), `plan` (pro), `current_usage_state`

**`checkout_started`**
Props: `price_id`, `trigger`

**`checkout_completed`**
Props: `price_id`, `billing_period` (monthly/annual)

**`subscription_status_changed`**
Props: `status` (active/past_due/canceled), `source` (stripe_webhook/app_refresh)

### Quality signals

**`report_issue_clicked`**
Props: `context` (quiz/teach), `quiz_item_id?`, `canonical_page_id?`

**`issue_submitted`**
Props: `type` (wrong_answer/unclear/question_bug/source_problem), `context`

### Computed metrics (derived)

- **TTFQA** = time between `setup_viewed` (or `landing_viewed`) and first `quiz_submitted`
- **Readiness Rate** = % users with `readiness_end >= 80` within session or 24h
- **Teach conversion** = `teach_me_clicked` / sessions with at least one miss or low confidence

---

## 9) Build order (2–3 days)

1. Setup → drill start → quiz item → submit → feedback → readiness update
2. Teach Me screen: canonical render + delta render + micro-quiz
3. Quota ledger + paywall + Stripe checkout + subscription gating
4. Preset saving + library
5. Instrumentation + basic dashboards

---

## 10) Dashboards to create on day 1

- Funnel: landing → setup → drill_started → quiz_submitted → drill_completed → teach_me_clicked → back_to_drill → ready
- TTFQA distribution
- Readiness lift distribution (Teach vs no Teach)
- Quota hits → paywall → checkout_started → checkout_completed
- Topic-level retention: repeats by topic/preset

---
