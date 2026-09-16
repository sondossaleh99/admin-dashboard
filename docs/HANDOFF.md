# Handoff — Ecommerce Dashboard Reproduction

**Date:** 2026-09-16
**Branch:** `claude/sleepy-fermat-ko7vfi` (clean, pushed, in sync with origin)
**HEAD:** `3c47e58` — `docs: add Angular reproduction plan for ecommerce dashboard`
**Base branch:** `init` (this repo has no `main`/`master`)
**Phase:** Planning complete. **No implementation started.**

---

## 1. What was done

Analyzed the repo's committed design tokens and stack, then produced a build plan for reproducing
`https://dashboard-one-teal.vercel.app/ecommerce` in Angular 20.

| Deliverable | Location |
|---|---|
| Plan document (source of truth) | `docs/ecommerce-dashboard-plan.md` |
| Shareable page version | https://claude.ai/artifact/XwSfMvERkTqygEANDK8kRS |
| This handoff | `docs/HANDOFF.md` |

No PR was opened — none was requested.

---

## 2. Blocker — read first

**The live target was never seen.** `dashboard-one-teal.vercel.app` is blocked by the session's
network egress policy (403 on CONNECT). It was not worked around.

Consequence: the plan's **structure, component boundaries and build order are sound**, but the
specific widget inventory, exact figures, nav groupings and sidebar/topbar dimensions are inferred
from the repo's `#03C9D7` palette and this dashboard family's conventions. Those are tagged
`[verify]` in the plan.

**To clear it, do one of:**

1. Allow `dashboard-one-teal.vercel.app` in the environment's network policy, then re-run the
   visual audit against the plan's section 3; or
2. Save screenshots (desktop ~1440px + mobile ~390px) and/or the page's rendered HTML/CSS into
   `docs/reference/` and commit them. This works offline and is the more reliable option.

Until then, **do not start Phase 6** (page assembly) — it is the first phase that depends on the audit.

---

## 3. Environment state

- `node_modules` is **not installed** — run `npm install` before anything.
- Node v22.22.2, Angular CLI 20.3.34.
- The container is ephemeral. Nothing survives except what is committed and pushed.

```bash
npm install
npm start          # ng serve -> http://localhost:4200
```

---

## 4. Current code state

The app is still Angular CLI scaffolding plus a PrimeNG smoke test.

| File | State |
|---|---|
| `src/app/app.ts` / `app.html` | Throwaway `p-button` + `p-table` demo. **Delete when Phase 2 starts.** |
| `src/app/app.routes.ts` | Empty `routes: Routes = []` |
| `src/app/app.config.ts` | Done — PrimeNG Aura preset with the `#03C9D7` primary ramp |
| `src/styles/*.scss` | Token partials in place: variables, typography, spacing, mixins |
| `docs/` | Plan + this handoff |

---

## 5. Findings that need action

Three real issues found while reading the repo. All are Phase 1 work.

1. **Inter is declared but never loaded.** `$font-family-base: 'Inter'` is set in
   `_typography.scss`, but `index.html` has no font link and `@fontsource/inter` is not a
   dependency. The app currently renders in system sans without warning.
2. **No chart library is installed.** This is the one open technical decision — see §6.
3. **Tokens are SCSS-only.** PrimeNG overrides and chart configs both need these values at
   runtime. Bridge the SCSS tokens to CSS custom properties on `:root` so there is one source
   of truth, rather than duplicating hex codes into chart configs.

---

## 6. Open decisions — need the user

| Decision | Recommendation | Why it matters |
|---|---|---|
| Chart library | **ApexCharts (`ng-apexcharts`)** | Closest visual match out of the box (gradient areas, true sparkline mode, combo bar+line). ~130 KB gzipped. Alternative: Chart.js via PrimeNG `<p-chart>` — already bundled and lighter, but more manual config. Blocks Phase 5. |
| Reference material | Screenshots into `docs/reference/` | Blocks Phase 6. See §2. |
| Scope beyond `/ecommerce` | Build the shell to support more routes, but implement only `/ecommerce` | The plan's `MainLayout` is already designed for reuse |

---

## 7. Next actions, in order

Phases 1–5 are **unblocked** and can start immediately.

1. `npm install`
2. **Phase 1 — tokens:** load Inter, bridge SCSS tokens to CSS custom properties, add the chart
   palette and `$sidebar-width` / `$topbar-height`.
3. **Phase 2 — shell:** delete the `app.html` demo, add routing with `/ecommerce` as the default
   redirect, build `MainLayout` + `Sidebar` + `Topbar`.
4. **Phase 3 — primitives:** `UiCard`, `StatCard`, `DeltaBadge`, `IconChip`, skeletons.
5. **Phase 4 — data layer:** models + `EcommerceService` returning delayed observables.
6. **Phase 5 — charts:** once the library decision lands, build the four wrappers.
7. **Stop.** Confirm the `[verify]` items before Phase 6.

Full detail for each phase is in `docs/ecommerce-dashboard-plan.md` §10.

---

## 8. Conventions to keep

- Standalone components, `OnPush`, signal inputs (`input()` / `input.required()`).
- PrimeNG owns interactive components; Bootstrap owns layout only. Never both on one element.
- Feature components arrange and bind — they never define colors, radii or shadows.
- Every card is a `UiCard`. No duplicated card CSS.
- No `any`. 2-space indent, single quotes, 100-char width (`.editorconfig` + Prettier config in
  `package.json`).
- Commit to `claude/sleepy-fermat-ko7vfi`. Do not push elsewhere without asking.
