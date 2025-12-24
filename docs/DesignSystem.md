# FlashLearn Design System Documentation

## Design Philosophy: *Calm Confidence*

FlashLearn is designed for developers preparing for interviews. Every screen earns its place. Every interaction increases the user's sense of capability.

### Core Principles

1. **Inevitability** — The next action is always obvious
2. **Trust** — Progress is visible, scoring is transparent, sources are accessible
3. **Flow** — Zero visual noise. Motion that guides, never distracts

---

## Color System

### Light Mode (Default)

| Token              | Value                | Usage                        |
| ------------------ | -------------------- | ---------------------------- |
| `--bg-primary`     | `hsl(240, 6%, 97%)`  | Page background              |
| `--bg-elevated`    | `hsl(0, 0%, 100%)`   | Cards, modals                |
| `--bg-sunken`      | `hsl(240, 6%, 94%)`  | Inset elements, chips        |
| `--text-primary`   | `hsl(240, 10%, 8%)`  | Headings, body text          |
| `--text-secondary` | `hsl(240, 5%, 45%)`  | Supporting text              |
| `--text-muted`     | `hsl(240, 5%, 60%)`  | Captions, hints              |
| `--accent-primary` | `hsl(220, 72%, 48%)` | Primary buttons, links       |
| `--status-success` | `hsl(142, 65%, 38%)` | Correct answers, ready state |
| `--status-error`   | `hsl(0, 60%, 50%)`   | Wrong answers, errors        |
| `--status-warning` | `hsl(38, 92%, 50%)`  | Warming up state             |

---

## Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: 600 weight, tight tracking (-0.02em)
- **Body**: 400 weight, relaxed line-height (1.5-1.7)

| Class         | Size | Usage           |
| ------------- | ---- | --------------- |
| `.heading-1`  | 48px | Hero titles     |
| `.heading-2`  | 32px | Page titles     |
| `.heading-3`  | 24px | Section titles  |
| `.heading-4`  | 20px | Card titles     |
| `.body-large` | 18px | Lead paragraphs |
| `.body-base`  | 16px | Body text       |
| `.body-small` | 14px | Supporting text |
| `.caption`    | 12px | Labels, hints   |

---

## Spacing Scale

| Token        | Value |
| ------------ | ----- |
| `--space-1`  | 4px   |
| `--space-2`  | 8px   |
| `--space-3`  | 12px  |
| `--space-4`  | 16px  |
| `--space-6`  | 24px  |
| `--space-8`  | 32px  |
| `--space-10` | 40px  |
| `--space-12` | 48px  |
| `--space-16` | 64px  |

---

## Motion

| Token                | Value                               | Usage                |
| -------------------- | ----------------------------------- | -------------------- |
| `--duration-fast`    | 100ms                               | Hover states         |
| `--duration-normal`  | 200ms                               | Standard transitions |
| `--duration-slow`    | 300ms                               | Page transitions     |
| `--duration-slowest` | 800ms                               | Score animations     |
| `--ease-out`         | `cubic-bezier(0.16, 1, 0.3, 1)`     | Default easing       |
| `--ease-spring`      | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy feedback      |

---

## Components

### Button

```jsx
<Button variant="primary" size="large">Start Drill</Button>
<Button variant="secondary">Teach Me</Button>
<Button variant="ghost">Cancel</Button>
```

### Card

```jsx
<Card variant="interactive">Content</Card>
<Card variant="elevated" padding="large">Content</Card>
```

### ReadinessMeter

```jsx
<ReadinessMeter score={78} size="large" animate />
```

### ProgressBar

```jsx
<ProgressBar value={4} max={12} variant="success" />
```

### ToggleGroup

```jsx
<ToggleGroup
  options={[
    { value: 'interview', label: 'Interview' },
    { value: 'build', label: 'Build' },
  ]}
  value={goal}
  onChange={setGoal}
/>
```

### Chip

```jsx
<Chip selected={true} onClick={handleClick}>React</Chip>
```

### OptionCard

```jsx
<OptionCard optionLabel="A" selected={true} state="correct">
  Answer text here
</OptionCard>
```

---

## Screens

### Landing (`/`)
- Hero with tagline and primary CTA
- Stats section (social proof)
- How it works (4-step flow)
- Popular topics
- Pricing teaser

### Setup (`/setup`)
- Topic search with typeahead
- Goal toggle (Interview / Build / Concept)
- Background tags (multi-select chips)
- Start Drill CTA

### Drill (`/drill`)
- Question display (centered, large)
- Option cards (A, B, C, D)
- Confidence toggle (Not sure / Confident)
- Submit button
- Feedback panel (correct/incorrect with explanation)
- Readiness meter (top-right)
- Progress bar (top)

### Teach Me (`/teach`)
- Bridge note (personalized gap explanation)
- Content sections with headings
- Code blocks (dark theme)
- Key points list
- Micro-quiz (embedded)
- Sources and verification date

### Summary (`/summary`)
- Large readiness score (animated)
- Delta indicator (+/- points)
- Session stats (questions, correct, missed)
- Top gap recommendation
- Re-drill and Teach Me CTAs

### Library (`/library`)
- Preset cards with:
  - Topic name and goal
  - Readiness progress bar
  - Status badge (Ready / Warming up / Just started)
  - Last attempted date
  - Continue and Teach Me buttons
- Empty state for new users

---

## Keyboard Shortcuts (Drill Mode)

| Key     | Action                         |
| ------- | ------------------------------ |
| `1-4`   | Select answer option           |
| `Enter` | Submit answer                  |
| `Space` | Next question (after feedback) |

---

## Accessibility

- All interactive elements are keyboard accessible
- Focus states use brand blue ring with 2px offset
- ARIA labels on buttons and toggles
- Semantic HTML structure (headings, landmarks)
- Role attributes on progress indicators

---

## Animation Classes

| Class                 | Effect                     |
| --------------------- | -------------------------- |
| `.animate-fade-in`    | Simple fade                |
| `.animate-fade-in-up` | Fade + slide up            |
| `.animate-scale-in`   | Fade + scale from 0.95     |
| `.animate-slide-up`   | Slide from bottom          |
| `.stagger-children`   | Staggered child animations |

---

## File Structure

```
src/
├── app/
│   ├── globals.css       # Design system tokens + utilities
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Landing page
│   ├── setup/page.tsx    # Setup/configuration page
│   ├── drill/page.tsx    # Drill mode (quiz)
│   ├── teach/page.tsx    # Teach Me (remediation)
│   ├── summary/page.tsx  # Session summary
│   └── library/page.tsx  # Preset library
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Chip.tsx
│   ├── OptionCard.tsx
│   ├── ProgressBar.tsx
│   ├── ReadinessMeter.tsx
│   ├── ToggleGroup.tsx
│   └── index.ts          # Barrel export
└── lib/
    └── dummy-data.ts     # Sample data and utilities
```

---

## Running the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

---

*Designed with calm confidence.*
