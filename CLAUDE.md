## Design System
DESIGN.md is the bible for all visual and UI decisions. Always read it first.
Primary source: https://v0-design-system-eta-jade.vercel.app/
GitHub: https://github.com/leemwilliams-eng/greenlife-design-system

Rules:
- Never use Bold (700) for display or h1 — the design system specifies Light (300)
- Icons are Lucide React only — no other icon libraries
- Always use the defined spacing tokens — never arbitrary pixel values
- Badge variants (Exact Match, Probable, Estimate, Material) are a core product pattern
- Do not deviate from any of the above without explicit user approval
- In QA mode, flag any code that doesn't match DESIGN.md

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
