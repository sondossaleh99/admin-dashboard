# Handoff — Ecommerce Dashboard Reproduction

**Date:** 2026-09-17
**State:** Stages 1–6 implemented and pushed. Stage 6 is structurally done;
its pixel-fidelity pass is still blocked (see §2). Stages 7–9 remain.

---

## 1. Branches and PRs

Stacked — each PR targets the one above it, so every diff is reviewable alone.

| PR | Branch | Base | Contents |
|---|---|---|---|
| #1 | `claude/sleepy-fermat-ko7vfi` | `init` | Plan + handoff docs |
| #2 | `claude/stage-1-foundation` | #1 | Design tokens |
| #3 | `claude/stage-2-shell` | #2 | App shell |
| #4 | `claude/stage-3-primitives` | #3 | UI primitives |
| #5 | `claude/stage-4-data` | #4 | Data layer |
| #6 | `claude/stage-5-charts` | #5 | Charts |
| #7 (to open) | `claude/stage-6-page-assembly` | #6 | Page assembly components |

Merge in order, bottom of the stack first. `init` is the base branch — this
repo has no `main`.

---

## 2. Blocker — pixel fidelity, not structure

`dashboard-one-teal.vercel.app` is blocked by the session's network egress
policy (403 on CONNECT). The live page was never seen — still.

Stage 6's structural work (componentization, real PrimeNG table, functional
wiring, the activity-feed substitution) did not need the reference and is
done. What still needs it: exact widget proportions, real copy/figures,
ordering, and any decorative treatment — none of which was guessed.

**To clear it, do one of:**

1. Allow `dashboard-one-teal.vercel.app` in the environment's network policy; or
2. Save screenshots (desktop ~1440px + mobile ~390px) and/or the page's
   rendered HTML/CSS into `docs/reference/` and commit them. Works offline and
   is the more reliable option.

Everything tagged `[verify]` in the code and plan depends on this:

| Location | What needs confirming |
|---|---|
| `_variables.scss` | `$sidebar-width`, `$topbar-height` |
| `core/data/nav.data.ts` | Nav group labels and ordering |
| `core/data/ecommerce.data.ts` | Every figure — shaped like the reference, not copied from it |
| Plan §3.2 | Page region inventory and order |
| `EarningsHero` | No decorative background was added — nothing to base one on |
| `ActivityCard` | Built as a real-data activity feed, not a media/blog card — see its doc comment |

---

## 3. What exists now

Run it: `npm install && npm start` → http://localhost:4200/ecommerce

```
src/app/
  core/
    models/      nav, user, dashboard (Kpi, RevenuePoint, Order, …)
    data/        nav.data, user.data, ecommerce.data  [verify]
    services/    layout.service (chrome state), ecommerce.service (data)
  layout/        main-layout, sidebar (+ nav item), topbar
  shared/
    ui/          ui-card, stat-card, icon-chip, delta-badge,
                 section-header, skeleton-block, empty-state
    charts/      chart-theme, chart-combo, chart-area,
                 chart-donut, chart-sparkline
  features/
    ecommerce/
      ecommerce-page   ← thin orchestrator: fetch, derived state, formatting
      components/      earnings-hero, kpi-row, revenue-updates-card,
                        sales-breakdown-card, weekly-stats-card,
                        recent-orders-table, activity-card
    not-found/   404
```

**Working:** routing with lazy loading, sidebar collapse (persisted) and mobile
drawer, avatar dropdown with Escape/outside-click, loading skeletons, inline
error retry, revenue range filter with derived totals, six live charts, a
sortable/paginated/searchable orders table, and an activity feed.

**Still provisional:** section proportions, exact spacing and any decorative
treatment — the things Stage 9's visual-parity pass exists to catch once the
reference is reachable.

---

## 4. Decisions made, with reasons

| Decision | Why |
|---|---|
| Bootstrap via `bootstrap-grid`, not the full stylesheet | PrimeNG owns components; Bootstrap owns layout. Saved 179 kB. |
| Avatar dropdown hand-rolled, not PrimeNG `MenuModule` | Measured 131 kB for one dropdown. PrimeNG still owns the Stage 6 table. |
| Bundle budget 500 kB → 700 kB | App's floor is 478 kB before any feature. Plan's DoD updated to match. |
| ApexCharts | Per the plan's recommendation. Lands in the lazy chunk: +2.8 kB initial. |
| Chart palette validated, not chosen by eye | Adjacent CVD ΔE 14.9; first four clear all-pairs for the donut. |

---

## 5. Next actions

1. **Clear the blocker** (section 2). Nothing else unblocks Stage 9's exact
   parity pass, or reconciling the `[verify]` fixtures.
2. **Stage 7** — responsive pass. Already verified clean at 320/390/768/1440
   throughout Stage 6, including the orders table's own internal horizontal
   scroll (confirmed not to leak into page-level overflow), so this should be
   confirmation rather than repair.
3. **Stage 8** — accessibility. Landmarks, `aria-current`, focus ring and
   reduced-motion are already in; contrast audit and keyboard sweep remain.
4. **Stage 9** — visual parity against the reference, once reachable. Revisit
   `EarningsHero`'s missing decorative background and `ActivityCard`'s
   activity-feed substitution first — those are the two Stage 6 [verify]
   items most likely to change shape, not just figures.

`ChartArea` remains built and unused: no page section calls for a distinct
single-trend area chart beyond what `ChartSparkline` already covers (hero,
weekly stats), and forcing it in would mean inventing a placement.

---

## 6. Verifying UI changes

Headless Chromium's `--screenshot` renders at a wide canvas and crops, which
looks *identical* to horizontal overflow. It produced two false bug reports in
this session. Use a real browser viewport instead:

```bash
npm install --prefix /tmp/shots playwright-core
```

then drive it with `chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })`
and a real `viewport`, comparing `document.documentElement.scrollWidth` against
`clientWidth` to detect overflow for real.

When a chart looks wrong, read the SVG's `d` and `stroke` attributes before
theorising — that is what found the invisible-stroke bug in Stage 5, after a
wrong guess about container width.

---

## 7. Conventions

- Standalone components, `OnPush`, signal inputs (`input()` / `input.required()`).
- PrimeNG owns interactive components; Bootstrap owns layout only. Never both.
- Feature components arrange and bind — they never define colours, radii or
  shadows. Those come from `UiCard` and the tokens.
- Charts receive data only. Theme lives in `chart-theme.ts`.
- No `any`. 2-space indent, single quotes, 100-char width.
- Component SCSS has a 4 kB budget — keep page styles lean.
