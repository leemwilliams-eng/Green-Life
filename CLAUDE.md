## Design System

**Primary source:** https://v0-design-system-eta-jade.vercel.app/
**GitHub:** https://github.com/leemwilliams-eng/greenlife-design-system
**Local bible:** DESIGN.md — read it first before any UI work.

The design system was built in parallel with the app using the same guidance. It is the
authoritative reference for all visual decisions. The app references it by convention (not
as a published npm package). Do not deviate without explicit user approval.

### Icons
- **Lucide React Native exclusively** — no Ionicons, no Feather, no other libraries
- Sizes: xs=12, sm=16, md=20, lg=24 (default), xl=32

### Typography (Plus Jakarta Sans)
- Display/H1: Light (300), 32px
- H2: Regular (400), 20px
- H3/Title: Medium (500), 18px
- Body: Regular (400), 16px
- Label: SemiBold (600), 14px
- Caption: Medium (500), 12px
- **Never use Bold (700) for display or H1**

### Colors
- Background: `#0D1F12` (Forest)
- Surface elevated: `#132B1A`
- Text primary: `#F0FDF4`
- Text muted: `#86EFAC`
- Primary action: `#10B981` (Emerald 500), pressed: `#059669`
- Gold/Spark accent: `#F59E0B` (Amber 400) — reserved for emphasis only
- Danger: `#F87171`
- Info: `#38BDF8`

### Spacing (4pt base grid)
xs=4, sm=8, md=12, lg=16, xl=24, xxl=32, xxxl=40, xxxxl=48, xxxxxl=64
Screen horizontal padding: 32px (xxl). Never use arbitrary pixel values.

### Border Radius
sm=8, md=12, lg=16, xl=24, pill=999

### Badge variants (core product pattern)
Exact Match (emerald tint), Probable (blue tint), Estimate (amber tint), Material (muted)

### Motion
- Micro: 80–100ms ease-out (button press)
- Short: 150–200ms (modals)
- Medium: 250–350ms (tab switches)
- Long: 400–600ms (onboarding)

### Current app / design system gaps to close before launch
- App uses Ionicons — should migrate to Lucide React Native
- App uses `#2F6B3B`/`#4A9B5F` greens — design system primary is `#10B981`
- Spacing is partially hardcoded — should use token values

## Workflow Orchestration

### 1. Plan Node Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One tack per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

## Known Patterns & Lessons

### HomeScreen wordmark revert (learned March 2026)
**Problem:** Every time HomeScreen.tsx is freshly copied from an upload, the wordmark reverts to the pre-fix state: single-color `Green Life` with `letterSpacing: -0.4`.

**Required state after ANY copy/edit of HomeScreen.tsx:**
- JSX: `<Text style={styles.wordmark}>Green<Text style={styles.wordmarkSpacer}>{" "}</Text><Text style={styles.wordmarkAccent}>Life</Text></Text>`
- Style `wordmark`: `letterSpacing: 0` (not -0.4)
- Style `wordmarkSpacer`: `{ letterSpacing: 4 }`
- Style `wordmarkAccent`: `{ color: colors.greenLight }`

**Rule:** After copying any version of HomeScreen.tsx from uploads, ALWAYS grep for `wordmark` and verify these four conditions before delivering. If any are wrong, apply the fix before zipping.
