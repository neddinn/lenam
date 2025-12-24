Lenam — Product Design Vision
Design Philosophy: Calm Confidence
Lenam is a tool for experts preparing for moments that matter. The design must feel like a trusted companion, not another anxious productivity app. Every screen earns its place. Every interaction increases the user's sense of capability.

The experience is built on three pillars:

Inevitability — The next action is always obvious
Trust — Progress is visible, scoring is transparent, sources are accessible
Flow — Zero visual noise. Motion that guides, never distracts.
Experience Overview
The Emotional Arc
Landing         → "This feels serious. I want to try it."
Setup           → "That was fast. I'm already starting."
Drill           → "I'm in the zone. No distractions."
Feedback        → "I understand what I missed."
Teach Me        → "Now I actually get it."
Summary         → "I can see my progress. I feel ready."
Library         → "My preparation has structure."
Screen-by-Screen Design Specification
Screen 0: Landing
Purpose: Establish credibility. Get into action in under 10 seconds of reading.

Layout:

┌─────────────────────────────────────────────────┐
│                                                 │
│         Lenam                              │
│                                                 │
│    Prove readiness. Not just preparation.       │
│                                                 │
│         ┌───────────────────────────┐           │
│         │   Start Free Drill   →    │           │
│         └───────────────────────────┘           │
│                                                 │
│    Already prepared? Log in                     │
│                                                 │
└─────────────────────────────────────────────────┘
Design Principles:

One-action hero: A single prominent CTA dominates. No competing calls to action above the fold.
Typography-driven hierarchy: The tagline is large (48-56px), the CTA is medium (16-18px), everything else whispers.
Generous whitespace: The page breathes. Nothing feels crowded or desperate.
Subtle polish:
The primary button has a barely-perceptible pulse animation — like a heartbeat, inviting but patient.
On hover, the button's background shifts gradient 2deg — unconscious magnetism.
Below the fold:
A silent autoplay video (muted, looped) showing the drill experience — not embedded in a device frame, just the raw interface
Three stats: "8,400 developers | 12 minutes average | 24% reach Ready in one session"
Pricing teaser (text link, not button): "See pricing"
Colors:

Background: hsl(240, 6%, 97%) — warm off-white
Text: hsl(240, 10%, 8%) — near-black with warmth
CTA: hsl(220, 72%, 48%) with hsl(220, 82%, 56%) hover — confident blue
Typography:

Tagline: Inter, 600 weight, -0.02em tracking
Body: Inter, 400 weight, 1.5 line-height
Micro-interactions:

CTA button: transform: scale(1.01) on hover, 150ms ease-out
Focus ring: 2px offset, matches button color at 50% opacity
Screen 1: Setup
Purpose: Get into drilling with minimum friction. Make choices feel consequential but not overwhelming.

Layout:

┌─────────────────────────────────────────────────┐
│  ← Back              Lenam           [?]   │
│                                                 │
│                                                 │
│         What do you want to drill?              │
│                                                 │
│         ┌───────────────────────────────┐       │
│         │  Search topics...        🔍   │       │
│         └───────────────────────────────┘       │
│                                                 │
│         React Rendering  ·  HTTP Caching        │
│         Load Balancing   ·  TypeScript          │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│         I'm preparing for...                    │
│                                                 │
│         ┌──────────┐ ┌───────┐ ┌─────────┐      │
│         │Interview │ │ Build │ │ Concept │      │
│         └──────────┘ └───────┘ └─────────┘      │
│                      ↑ selected                 │
│                                                 │
│         My background (optional)                │
│         [ React ] [ Node.js ] [ + Add ]         │
│                                                 │
│                                                 │
│         ┌───────────────────────────────┐       │
│         │      Start Drill (5 min)      │       │
│         └───────────────────────────────┘       │
│                                                 │
│         or   Generate Learning Page →           │
│                                                 │
└─────────────────────────────────────────────────┘
Design Principles:

Progressive disclosure: Topic selection comes first. Goal and tags follow naturally.
Smart defaults: "Interview" is pre-selected. No level picker unless user expands "More options" (v1 hides this).
Typeahead with presence: When searching, results appear immediately with keyboard navigation.
Selected state is obvious: Tab-style toggle for goals with full background fill on selection, not just underline or border.
Tags as chips: Background tags are multi-select chips that feel tactile. They press inward slightly on click.
Visual Treatment:

Input field: Large (52px height), minimal border, strong focus state with brand blue glow
Goal tabs: Pill-shaped, horizontally arranged, selected shows solid background + checkmark icon that scales in
Background tags: Rounded chips with soft gray background, brand color when selected
CTA: Full-width on mobile, 400px max on desktop, high-contrast
Motion:

When a topic is selected from dropdown, the search field "settles" into a selected state with the topic name replacing the search text, and a subtle checkmark appears (fade + scale, 200ms)
Goal tabs: Underline indicator slides horizontally between options (spring animation, ~300ms)
Tags: Scale to 1.02 on hover, press to 0.98 on active
Error Prevention:

"Start Drill" is disabled until a topic is selected. The button shows reduced opacity (0.5) and a subtle shake if clicked while disabled.
Screen 2: Drill Mode
Purpose: Create flow state. Minimize cognitive load. Every element serves the question.

Layout:

┌─────────────────────────────────────────────────┐
│                                                 │
│  React Rendering · Interview                    │
│  ▓▓▓▓▓▓▓▓░░░░░░░░░░░░   4/12                   │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│     What happens when setState is called        │
│     inside a useEffect cleanup function?        │
│                                                 │
│                                                 │
│                                                 │
│     ┌─────────────────────────────────────┐     │
│     │ A) The state update is ignored       │     │
│     └─────────────────────────────────────┘     │
│     ┌─────────────────────────────────────┐     │
│     │ B) The component schedules a render  │     │
│     └─────────────────────────────────────┘     │
│     ┌─────────────────────────────────────┐     │
│     │ C) React throws an unmount warning   │     │
│     └─────────────────────────────────────┘     │
│     ┌─────────────────────────────────────┐     │
│     │ D) The effect runs again             │     │
│     └─────────────────────────────────────┘     │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│     How confident are you?                      │
│                                                 │
│     ◯ Not sure    ● Confident                  │
│                                                 │
│         ┌─────────────────────────────────┐     │
│         │           Submit                │     │
│         └─────────────────────────────────┘     │
│                                                 │
│                                      Score: 72  │
│                                                 │
└─────────────────────────────────────────────────┘
Design Principles:

The question dominates: Question text is 24-28px, dark, centered in the visual field. Everything else is smaller and muted.
Options are scannable: Each option is a card, not a radio button list. Full-width, 56px height, rounded corners.
Confidence is required but fast: Binary choice (Not sure / Confident), inline, below options. Defaults to "Not sure" to reduce overconfidence.
Readiness score is ambient: Small, bottom-right, updates after each question with a subtle number-tick animation.
Progress is visible but quiet: Thin progress bar near top, muted color, fills with each question.
States:

Option hover: Light background lift (2% brighter)
Option selected: Solid border (2px brand blue), interior background shifts to brand blue at 8% opacity
Submitting: Button shows spinner, options become non-interactive (opacity 0.7)
After Submit — Feedback Modal (inline, not overlay):

┌─────────────────────────────────────────────────┐
│                                                 │
│     ✓ Correct                                   │
│                                                 │
│     When setState is called during cleanup,     │
│     React logs a warning because the component  │
│     is no longer mounted...                     │
│                                                 │
│     [Show sources ↓]                            │
│                                                 │
│     ─────────────────────────────────────────   │
│                                                 │
│     ┌─────────────────────────────────┐         │
│     │        Next Question       →    │         │
│     └─────────────────────────────────┘         │
│                                                 │
│     or   Teach me this →                        │
│                                                 │
└─────────────────────────────────────────────────┘
Wrong Answer State:

Red-tinted result indicator (not aggressive red, more like hsl(0, 60%, 50%))
The selected wrong answer shows a subtle red border
The correct answer is revealed with green highlight
"Teach me this" CTA is promoted (larger, primary treatment)
Motion:

Feedback slides in from bottom (150ms, deceleration curve)
Correct/incorrect icon scales in with bounce (250ms spring)
Readiness score update: Number "ticks" up or down like a counter (each digit rolls)
Screen 3: Teach Me (Gap Remediation Page)
Purpose: Close the specific gap. Not a wall of text. Targeted, digestible, actionable.

Layout:

┌─────────────────────────────────────────────────┐
│  ← Back to Drill                      [⚙ Steer] │
│                                                 │
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │  The gap we're closing...                    ││
│  │                                              ││
│  │  You answered that setState in cleanup       ││
│  │  would be ignored. Actually, React           ││
│  │  permits the call but warns because the      ││
│  │  component is unmounting.                    ││
│  └─────────────────────────────────────────────┘│
│                                                 │
│  Understanding Effect Cleanup                   │
│  ─────────────────────────────────────────────  │
│                                                 │
│  When a component unmounts, React calls the     │
│  cleanup function returned by useEffect. This   │
│  is your opportunity to cancel subscriptions,   │
│  clear timers, and prevent memory leaks...      │
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │ function Example() {                         ││
│  │   useEffect(() => {                          ││
│  │     const timer = setInterval(...);          ││
│  │     return () => clearInterval(timer);       ││
│  │   }, []);                                    ││
│  │ }                                            ││
│  └─────────────────────────────────────────────┘│
│                                                 │
│  Key Points                                     │
│  • Cleanup runs before re-running effects       │
│  • Cleanup runs when component unmounts         │
│  • setState during cleanup logs warning         │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│  Quick Check                                    │
│                                                 │
│  [Micro-quiz question here...]                  │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │       Back to Drill             │           ││
│  └─────────────────────────────────────────────┘│
│                                                 │
│  Verified: Dec 24, 2025 · Sources (3) ↓         │
│                                                 │
└─────────────────────────────────────────────────┘
Design Principles:

Bridge note is prominent: The personalized "gap closing" note at top is in a distinct card with subtle left-border accent (brand color). This is the first thing users read.
Content is hierarchical: Headings are clear (20px, 600 weight). Body is comfortable to read (18px, 1.7 line-height). Code blocks have generous padding and darker background.
Key points are scannable: Bulleted list, not paragraphs. Each point is one line.
Micro-quiz is embedded: Not a separate page. Inline at the bottom, 2-3 questions in card format.
Trust signals are visible but quiet: "Verified" date and source count anchor the bottom.
Steering Panel (collapsed by default):

┌─────────────────────────────────────────────────┐
│  Adjust Focus                                   │
│                                                 │
│  Goal:     ◯ Interview  ● Build  ◯ Concept     │
│  Depth:    ● Skim  ◯ Solid                      │
│  Bridge:   [✓] Include personalized summary     │
│                                                 │
│  [Apply Changes]                                │
└─────────────────────────────────────────────────┘
Motion:

Page content fades in section by section (staggered 50ms, 200ms duration)
Bridge note card slides in from left (subtle, 150ms)
Micro-quiz questions appear with scale animation when user scrolls to them
Screen 4: Session Summary
Purpose: Reinforce progress. Recommend next action. Don't let the user wonder "now what?"

Layout:

┌─────────────────────────────────────────────────┐
│                                                 │
│         Session Complete                        │
│                                                 │
│         ┌───────────────────────────────┐       │
│         │                               │       │
│         │           78                  │       │
│         │       Readiness              │       │
│         │      ▲ +12 this session       │       │
│         │                               │       │
│         └───────────────────────────────┘       │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│         12 questions answered                   │
│         9 correct · 3 missed                    │
│         1 high-confidence miss                  │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│         Top gap: Effect cleanup timing          │
│         ┌───────────────────────────────┐       │
│         │       Teach Me This     →     │       │
│         └───────────────────────────────┘       │
│                                                 │
│         ┌───────────────────────────────┐       │
│         │       Re-drill (5 min)        │       │
│         └───────────────────────────────┘       │
│                                                 │
│         Save Preset  ·  Pricing                 │
│                                                 │
└─────────────────────────────────────────────────┘
Design Principles:

Score is the hero: Large, centered number with subtle gradient or glow. The delta (+12) has positive color (green-tinted) and animates counting up.
Stats are simple: Three key numbers, not a dashboard. Avoid charts on v1.
Next action is clear: "Teach Me" is primary if there was a gap. "Re-drill" is secondary.
Soft upsell: If quotas are approaching, show "2 drills remaining" with link to pricing. Not modal, not aggressive.
Motion:

Readiness score counts up from 0 to current value (800ms, ease-out)
Delta appears after main number settles (fade in, 200ms delay)
CTA buttons stagger in (100ms apart)
Screen 5: Preset Library
Purpose: Show preparation structure. Enable quick continuation. Build habit.

Layout:

┌─────────────────────────────────────────────────┐
│  Your Presets                     [+ New Drill] │
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │ React Rendering                              ││
│  │ Interview · Last drilled 2h ago              ││
│  │                                              ││
│  │ ▓▓▓▓▓▓▓▓▓░░   78  →  Ready                   ││
│  │                                              ││
│  │ [Continue]  [Teach Me]                       ││
│  └─────────────────────────────────────────────┘│
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │ HTTP Caching                                 ││
│  │ Build · Last drilled 3d ago                  ││
│  │                                              ││
│  │ ▓▓▓▓░░░░░░░   42  →  Warming up              ││
│  │                                              ││
│  │ [Continue]  [Teach Me]                       ││
│  └─────────────────────────────────────────────┘│
│                                                 │
└─────────────────────────────────────────────────┘
Design Principles:

Cards, not list items: Each preset is a card with all relevant info. Not a table.
Status is colorized:
Ready (≥80): Green accent
Warming up (40-79): Amber accent
Cold (<40): Neutral gray
Progress bar with score: Horizontal bar fills proportionally, score number at end.
Actions are always visible: "Continue" and "Teach Me" are visible, not in overflow menu.
Empty State:

┌─────────────────────────────────────────────────┐
│                                                 │
│         No presets yet                          │
│                                                 │
│         Complete your first drill to save       │
│         a preset and track your readiness.      │
│                                                 │
│         [Start a Drill →]                       │
│                                                 │
└─────────────────────────────────────────────────┘
System-Wide Design Tokens
Colors
css
:root {
  /* Background */
  --bg-primary: hsl(240, 6%, 97%);
  --bg-elevated: hsl(0, 0%, 100%);
  --bg-sunken: hsl(240, 6%, 94%);

  /* Text */
  --text-primary: hsl(240, 10%, 8%);
  --text-secondary: hsl(240, 5%, 45%);
  --text-muted: hsl(240, 5%, 60%);

  /* Brand */
  --accent-primary: hsl(220, 72%, 48%);
  --accent-primary-hover: hsl(220, 82%, 56%);
  --accent-primary-subtle: hsl(220, 72%, 95%);

  /* Status */
  --status-success: hsl(142, 65%, 38%);
  --status-success-bg: hsl(142, 65%, 95%);
  --status-error: hsl(0, 60%, 50%);
  --status-error-bg: hsl(0, 60%, 96%);
  --status-warning: hsl(38, 92%, 50%);
  --status-warning-bg: hsl(38, 92%, 95%);

  /* Borders */
  --border-default: hsl(240, 6%, 90%);
  --border-strong: hsl(240, 6%, 80%);
}
Typography
css
:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 2rem;      /* 32px */
  --text-4xl: 2.5rem;    /* 40px */
  --text-5xl: 3rem;      /* 48px */

  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;

  --tracking-tight: -0.02em;
  --tracking-normal: 0;
}
Spacing
css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
Motion
css
:root {
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
Shadows
css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.03);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08);
  --shadow-focus: 0 0 0 3px var(--accent-primary-subtle);
}
Interaction Patterns
Keyboard Navigation
All interactive elements are keyboard accessible
Clear focus states (brand blue ring, 2px offset)
Arrow keys navigate options within groups
Enter/Space activate selections
Escape closes panels and modals
Loading States
Skeleton screens, not spinners
Content appears section-by-section, not all at once
If loading takes >500ms, show a subtle progress indicator
Error States
Inline validation, not blocking modals
Errors are specific ("Topic required" not "Invalid input")
Recovery actions are always visible ("Try again", "Choose a different topic")
Transitions Between Screens
Page transitions: 200ms fade + subtle scale (0.99 → 1.0)
No jarring jumps — content areas maintain consistent position
When returning to drill from Teach Me, the next question is already loaded
Summary: How It Should Feel
When a user finishes their first session with Lenam, they should feel:

Capable — "I can actually measure my readiness now"
Focused — "That felt efficient, not overwhelming"
Trusting — "The scoring makes sense, the sources are there"
Improved — "I closed a real gap, not just reviewed content"
Curious — "I want to come back tomorrow and get to 80"
The product doesn't dazzle or distract. It does its job and gets out of the way. It feels inevitable — like this is obviously how interview preparation should work.