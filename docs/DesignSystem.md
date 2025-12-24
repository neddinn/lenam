# Lenam Design System Contract v1.0

## 0) Purpose

This contract ensures Lenam stays:

- **Deep Focus** (calm, readable, high signal)
- **Tactile** (physics + object permanence)
- **Technical** (pro tool, not a game)
- **Semantically consistent** (colors/motion mean specific things)

Any UI addition must **increase**:

1. speed to answer, 2) error comprehension, 3) readiness confidence, or 4) return likelihood.
   If not, it does not ship.

---

## 1) Brand primitives

### Theme

- **Default**: Dark mode (“Obsidian/Charcoal”)
- **Tone**: Sharp, technical, minimal. No “fantasy AI magic.”

### Typography

- **UI**: Inter
- **Code/Data**: JetBrains Mono
- **Sizing rule**: Favor readability over density (no ultra-tight line heights).

### Layout

- **Primary mode (Flow State)**: single central card, minimal HUD.
- **Secondary mode (Teach overlay)**: legible long-form content, minimal distractions.

---

## 2) Semantic color contract (non-negotiable)

Colors are not decoration; they are meaning. **Never repurpose a semantic color for aesthetics.**

### Semantic roles

- **Success / Correctness / Positive progress** → **Neon Green**
- **Gap / Error / Warning / Decay / Risk** → **Electric Red**
- **AI Guidance / Assist / Highlighting / “Teach Me”** → **Cool Blue**
- **Neutral UI / Inactive / Secondary** → grayscale only

### Rules

1. **Green and Red never appear simultaneously at equal prominence** on the same focal element. One must dominate.
2. **Blue never indicates correctness.** Blue is guidance only.
3. **Red is used sparingly** and only for actionable risk states (wrong, decay, blocked).
4. **Charts**: positive trend uses Green, warnings use Red, guidance overlays use Blue; baseline/axes are neutral.

---

## 3) Motion contract (physics, not fireworks)

### Motion intent

Motion exists to reinforce:

- object permanence
- state change clarity
- momentum through the drill loop

### Global motion rules

- **Rule M1: One primary motion per interaction.**
  - If an element moves significantly, do not also do big glow + sound + shake.

- **Rule M2: Spatial continuity.**
  - Elements slide/transform; they do not vanish/reappear unless loading/failure.

- **Rule M3: Respect Deep Focus.**
  - No constant “breathing” UI except extremely subtle background mesh.

- **Rule M4: Reduce motion support.**
  - If OS “Reduce Motion” is enabled, animations become fades/instant state swaps.

### Motion vocabulary (allowed)

- **Slide in/out** (primary)
- **Scale subtly** (secondary)
- **Morph** (limited to Teach Me content transforms)
- **Shake** (only on wrong submission; minimal; can be disabled)

### Motion vocabulary (disallowed in v1)

- Explosive particle effects
- Excessive 3D spins
- Persistent pulsing on multiple elements at once

---

## 4) Sound & haptics budget

### Default stance

- **Sound is OFF by default** (or “minimal”).
- Provide a simple toggle: `Sound: Off / Minimal`.

### Allowed sounds (minimal set)

- **Correct**: a short “click”
- **Milestone**: a soft chime (only on crossing thresholds like 80)
- **No “thud” by default** (thud can be a themed alternative, opt-in later)

### Haptics (mobile)

- Wrong answer: short, subtle tap
- No haptics for correct (avoid fatigue)

**Rule S1:** If sound plays, don’t also do heavy motion + glow. Choose one.

---

## 5) Component system (v1 components + state machines)

### A) Drill Card (core)

**Purpose:** the single focus object in Drill Mode.

**States**

- `idle` → question shown, awaiting input
- `armed` → confidence selected + answer ready
- `submitted_correct_high_conf`
- `submitted_correct_low_conf`
- `submitted_wrong`
- `locked_for_teach` (wrong OR “teach triggered”)
- `transition_out` (to next question)

**Behavior**

- Correct + high confidence: card exits upward (subtle), readiness updates
- Correct + low confidence: card exits sideways, toast appears (“We’ll verify later”)
- Wrong: card locks, background dims slightly, Teach drawer opens automatically

**Non-negotiables**

- Confidence input is required or defaults to “Unsure” (explicitly visible).
- Wrong state must be visually distinct (red border + dim), not punitive.

**Do not**

- “Crack” or “fracture” the card in v1 (too punitive). Use “lock/anchor” instead.

---

### B) Teach Drawer (from Drill Card)

**Purpose:** instant remediation without navigation.

**Trigger**

- Always appears on wrong
- Optional on low confidence (configurable)

**Visual semantics**

- Primary accent: **Cool Blue**
- If triggered by wrong: a subtle red context cue is allowed, but blue dominates content.

---

### C) Teach Overlay (Glassmorphism Overlay)

**Purpose:** “Aha moment” while maintaining context.

**Rules**

- Overlay is not a new page.
- Underlying drill question remains visible but blurred enough to avoid distraction.
- Text contrast must be high; code blocks on solid panels.

**Sections**

1. Delta Block (gap-specific answer) highlighted in **Cool Blue**
2. Explanation body (neutral)
3. Micro-quiz interleaved (2–3 items)
4. CTA: “Got it” + “Back to Drill”

---

### D) Steering Strip (sticky bottom)

**Tabs:** Concept / Code / Interview (or Speech)

**Contract**

- Changing tabs must be instant-feeling.
- Tab change morphs content (no page reload).
- Blue accent indicates “guided transformation.”

**Do not**

- Add more than 3 tabs in v1.
- Add complex nested settings in the strip.

---

### E) Readiness Meter (HUD)

**Purpose:** continuous, credible progress signal.

**States**

- `provisional` (if not enough attempts) → neutral styling, small label
- `active` → fills with Green as score rises
- `threshold_crossed` (≥80) → single pulse (once), optional sound

**Rules**

- Never animate continuously; only on updates.
- Must never imply precision if the score is provisional.

---

### F) Summary Screen (end of session)

**Required elements**

- Readiness score (counts up)
- Trend line (today vs previous)
- Next step button (single recommended action)

**Rule**

- Recommendation color must match meaning:
  - “Re-drill misses” → Red (risk action)
  - “Lock in score” → Green (progress action)
  - “Guided review” → Blue (assist action)

---

### G) Library (v1-lite)

**Do v1**

- Grid or list is acceptable; keep it simple.
- Status chips/labels:
  - Not started (neutral)
  - In progress (blue subtle)
  - Ready (green)
  - Needs review (red)

**Optional interaction**

- “Repair session” launches a 3–5 question micro-drill.

**Do not v1**

- Complex “constellation graphs” or dependency networks until retention proves it.

---

## 6) Accessibility contract (non-negotiable)

1. **Color is never the only signal.**
   - Use icons/labels for correct/wrong/guide.

2. **Contrast must meet WCAG AA** for body text.
3. **Keyboard-first drill support**
   - `1-4` answer selection
   - `Space` submit
   - `T` open Teach
   - `Esc` close overlay

4. **Reduce Motion** support (see Motion contract).
5. **Screen reader basics**
   - Announce correctness + next action
   - Teach overlay must trap focus when open

---

## 7) Anti-drift rules (what not to do)

### Forbidden patterns

- Adding new accent colors without semantic role
- Multiple simultaneous pulses across UI
- “Damage” metaphors (cracks/fissures) as default feedback
- AI branding that feels mystical instead of assistive
- Background animations that compete with card content
- Anything that slows Time-to-first-answer

### Allowed evolution

- New components only if they attach to the loop:
  Drill → Teach → Verify → Re-drill → Score

---

## 8) Design review checklist (ship gate)

A feature cannot ship unless it passes:

### Semantics

- [ ] Uses only the 3 semantic accents correctly (Green/Red/Blue)
- [ ] Blue never indicates correctness
- [ ] Red only appears for actionable risk states

### Focus

- [ ] In Drill Mode, only one primary focal element (the card)
- [ ] No persistent animations competing with answering

### Motion & Sound

- [ ] One primary motion per interaction
- [ ] Sound respects the budget and can be disabled
- [ ] Reduce Motion supported

### Readability & Trust

- [ ] Teach overlay is more readable than a documentation page
- [ ] Provisional score is clearly labeled and visually distinct

### Performance

- [ ] No animation blocks input latency
- [ ] Interactions feel immediate (no “waiting on flair”)

---
