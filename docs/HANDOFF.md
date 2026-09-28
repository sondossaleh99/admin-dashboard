# Handoff — Ecommerce Dashboard

**Updated:** 2026-09-28
**Branch:** `init` is the default branch (there is no `main`). The pre-feature cleanup (models,
`*Component` names, feature-owned service/data, tokens, Prettier, tests) is on `feature-refactor`.
**State:** Stages 1–6 are merged. Pixel fidelity is still blocked (§3). Stages 7–9 remain (§8).
`ng build`, `npm run format:check` and `npm run test:ci` are clean.

---

## 1. Quick start

```bash
npm install
npm start        # http://localhost:4200/ecommerce
npm run build    # must stay clean — run it after every change
npm run format   # Prettier (100 cols, single quotes, no trailing commas); format:check to verify
npm test         # Karma in a Chrome window, re-runs on save
npm run test:ci  # one headless run (ChromeHeadlessCI = --no-sandbox, for root/containers)
```

In a container, point Karma at the bundled Chromium first:
`export CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.

The stack is fixed: Angular 20 (standalone, signals) · PrimeNG 20 · Bootstrap 5 (grid only) ·
ApexCharts via `ng-apexcharts`. The initial bundle is ≈ 598 kB against a 700 kB warning /
1.2 MB error budget. Component styles: 4 kB warning / 8 kB error.

If a local machine reports `Cannot find module 'ng-apexcharts'`, its `node_modules` is stale.
Running `npm install` fixes it. The repo's `package.json` and lockfile are correct.

---

## 2. Branches, PRs and history

All seven stage PRs (#1–#7) are merged into `init`. Since then, work has been committed
**directly to `init` and pushed**, as the user directed. Follow their lead on branching. The
`claude/stage-*` branches are merged and stale.

| PR | State | Notes |
|---|---|---|
| #1–#7 | merged | Plan, then Stages 1–6 (merge commits `2c59a5d` … `42a6845`) |
| #8 | merged by the user | Review-only PR (`init` → anchor branch `claude/pre-shared-refactor`). Merging it only moved the anchor branch forward. `init` was unaffected. |
| #9 | **open** (the user's) | `claude/pre-shared-refactor` → `init`: one merge commit, **0 file changes**. Merging it would change no files. |

**Never merge, close or open a PR without an explicit instruction from the user.**

Post–Stage 6 commits on `init`, oldest first:

| Commit | What it did |
|---|---|
| `3c0575e` | Dropped `protected` from component members |
| `55f3563` | Barrels for `shared/charts` and `shared/ui` |
| `5215db4` | `shared/interface` (one interface per file) + `shared/enum` (unions → enums); deleted `core/models` |
| `2f2245c` | External consumers import through the root `shared` barrel |
| `9bb2909` | Folder-level `index.ts` in every component folder |
| `d440cb1` | `shared/lookup`: static config data → `*Lookup` classes |
| `1d96982` | Dropped `readonly` everywhere and `private` everywhere but one place (§5.3) |
| `4169e0f`, `0dd4046` | `core` barrels, and consumers routed through them |
| `9e96789` | Root barrels for `layout` and `features` |
| `268acfc`, `14d7371` | `SHARED_IMPORTS` (pipes, then `UiCardComponent` added after re-analysis) |
| `54dda9d` | `shared/interface` → `shared/models` + `features/ecommerce/models` |
| `fe774d7` | Relocated models by ownership — **reverted by `195b23a`** at the user's request (§6) |

---

## 3. Blocker — pixel fidelity, not structure

`dashboard-one-teal.vercel.app` is blocked by the session's network egress policy (403 on
CONNECT). The live page has never been seen.

The structural work did not need the reference and is done. What still needs it: exact widget
proportions, real copy and figures, ordering, and any decorative treatment. None of these was
guessed.

**To clear it, do one of:**

1. Allow `dashboard-one-teal.vercel.app` in the environment's network policy; or
2. Save screenshots (desktop ~1440px and mobile ~390px) and/or the page's rendered HTML/CSS into
   `docs/reference/` and commit them. This works offline and is the more reliable option.

Everything tagged `[verify]` depends on this:

| Location | What needs confirming |
|---|---|
| `src/styles/_variables.scss` | `$sidebar-width`, `$topbar-height` |
| `shared/lookup/navigation.lookup.ts` | Nav group labels and ordering (moved here from the deleted `core/data/nav.data.ts`) |
| `features/ecommerce/data/ecommerce.data.ts` | Every figure — shaped like the reference, not copied from it |
| Plan §3.2 | Page region inventory and order |
| `EarningsHeroComponent` | No decorative background was added — there is nothing to base one on |
| `ActivityCardComponent` | Built as a real-data activity feed, not a media/blog card — see its doc comment |

---

## 4. What exists now

```
src/app/
  app.routes.ts    MainLayout from './layout'; lazy routes import the closest feature barrel
  core/                            barrel: core/index.ts → config, data, services
    config/        primeng-preset (AppPreset, used by app.config.ts)
    data/          user.data (CURRENT_USER)
    services/      layout.service (chrome state)
  layout/                          barrel: layout/index.ts
    main-layout/
    sidebar/       + components/sidebar-nav-item/
    topbar/
  shared/                          barrel: shared/index.ts
    models/        19 shared interfaces (see §6)
    enum/          OrderStatus, ActivityTone, RevenueRange, IconChipTone, KpiFormat, IconChipSize
    lookup/        6 *Lookup classes
    charts/        chart-theme + chart-area / -combo / -donut / -sparkline
    ui/            ui-card, stat-card, icon-chip, delta-badge, section-header,
                   skeleton-block, empty-state        (one folder + index.ts each)
    imports/       SHARED_IMPORTS
  features/                        no root barrel: routes import each feature's own index.ts
    ecommerce/     ecommerce-page (orchestrator) + components/ (7)
                   + services/ecommerce.service (fixtures as an Observable)
                   + data/ecommerce.data (mock fixtures, [verify])
    not-found/
```

**Working:** routing with lazy loading, sidebar collapse (persisted) and mobile drawer, avatar
dropdown with Escape/outside-click, loading skeletons, inline error retry, revenue range filter
with derived totals, six live charts, a sortable/paginated/searchable orders table, and an
activity feed.

**Still provisional:** section proportions, exact spacing and any decorative treatment — the
things Stage 9's visual-parity pass exists to catch once the reference is reachable.

---

## 5. Architecture rules — follow these

These were set by the user after Stage 6. Each one is enforced across the whole codebase today.

1. **Barrels everywhere.** Every folder that exposes something has an `index.ts` using
   `export * from '…'`. A folder wrapping one component exports that file. A parent exports its
   child *folders*, never a file inside them: `export * from './ui-card'`, not
   `'./ui-card/ui-card'`. Flat multi-file folders (`enum`, `models`, `lookup`, `charts`,
   `imports`, `core/data`, `core/services`) list their files in one `index.ts`. Root barrels:
   `shared`, `core`, `layout`, `features`.

2. **Component class names end in `Component`.** `WeeklyStatsCardComponent`, `UiCardComponent`,
   `AppComponent`. File names stay kebab-case without the suffix (`weekly-stats-card.ts`).

3. **Import paths and direction.**
   - Code *outside* `shared/` or `core/` imports from the root barrel:
     `import { UiCardComponent, OrderStatus } from '../../shared'`, `import { LayoutService } from '../../core'`.
   - Code *inside* `shared/` or `core/` imports siblings by direct file path
     (`'../enum/order-status'`), never through its own aggregating barrel — that creates cycles.
   - Inside a feature, use the closest barrel (`ecommerce-page.ts` → `'./components'`).
   - Models live in `shared/models` and are imported through the `shared` barrel (§6).
   - Lazy `loadComponent` routes import the closest **per-feature** barrel
     (`'./features/ecommerce'`). There is deliberately no root `features/index.ts`: it would merge every
     route's lazy chunk into one. A cosmetic side effect: lazy chunks are named `index` in the
     build output.
   - Direction: `features` and `layout` → `shared` and `core`. `shared` never imports `features`
     or `core`.

4. **No access modifiers by default** (`private` / `protected` / `public`). Keep one only when it
   enforces real encapsulation. The sole exception today: `LayoutService`'s `collapsed` and
   `drawer` writable signals are `private`. It's an injected singleton shared by three
   components, and `toggleSidebar()` pairs every mutation with a `localStorage` write that a
   direct `.set()` would bypass.

5. **No `readonly`** — not on class fields (including `input()`, `signal()` and `computed()`
   fields), interface properties, or array types (`Kpi[]`, not `readonly Kpi[]`).

6. **Types.** One interface per file, with a kebab-case filename. String-literal unions are string
   `enum`s in `shared/enum/`, one per file. A template reaches an enum through a component field
   (`RevenueRange = RevenueRange;`), since templates can't see imports.

7. **Lookups.** Static configuration and mapping data lives in `shared/lookup/<name>.lookup.ts` as
   a class with static getters (`OrderStatusLookup.getLabels()`). Each getter returns a fresh
   literal, with no `readonly` return types. The six today: `OrderActivityLookup`,
   `OrderStatusLookup`, `TopbarActionsLookup`, `UserMenuLookup`, `NavigationLookup`,
   `IconChipToneLookup`. Deliberately *not* lookups: mock API fixtures (`ecommerce.data.ts`),
   `CURRENT_USER`, and chart options (built at runtime from inputs and CSS variables).

8. **`SHARED_IMPORTS`** (`shared/imports/`) is `[CurrencyPipe, DatePipe, DecimalPipe, UiCardComponent]`,
   spread into a standalone component's imports: `imports: [...SHARED_IMPORTS, ChartCombo]`. It's
   a plain array on purpose: importing a wrapper component does **not** re-export that
   component's own imports. Kept out on purpose:
   - `TableModule`: one use.
   - `NgApexchartsModule`: it would drag ~450–950 kB of ApexCharts into unrelated components.
   - Router directives: two uses or fewer, and each is central to what its component is.
   - `DeltaBadgeComponent` and `IconChipComponent`: listing them explicitly tells a reader what that card shows.

9. **Component folders.** A complex component with sub-parts gets a nested `components/` folder
   with barrels at each level (e.g. `sidebar/components/sidebar-nav-item/`). A simple one stays
   flat with its own `index.ts`.

10. **Carried over from Stages 1–6, still binding:**
   - Standalone components, `OnPush`, and signal APIs (`input`, `input.required`, `output`,
     `signal`, `computed`, `rxResource`).
   - PrimeNG owns interactive components; Bootstrap owns layout only. Never both.
   - Feature components arrange and bind. Colours, radii and shadows come from `UiCardComponent` and the
     tokens. No component stylesheet contains a hex colour: use a `--color-*` token, and
     `@include m.status-tint($tone)` (`_mixins.scss`) for a status label or icon on its own tint.
     Text on a solid colour fill is `--color-text-inverse`.
   - Charts receive data only. The theme lives in `chart-theme.ts`.
   - No `any`. Formatting is Prettier's (`npm run format`); don't hand-format around it.
   - A feature's own service and mock data live inside the feature (`services/`, `data/`), never
     in `core/`.
   - Page logic (derived values, formatting, mapping) gets a spec. Specs render the page with its
     template overridden to `''`, so they test the logic without mounting charts.
   - Never guess a visual detail the design tokens don't define.

---

## 6. Models — current placement and a reverted attempt

Current placement (as of the `feature-refactor` branch):

| Location | Models |
|---|---|
| `shared/models/` (19) | `User`, `NavItem`, `NavGroup`, `DonutSlice`, `ComboSeries`, `ChartInk`, `TopbarAction`, `UserMenuItem`, `ActivityConfig`, `EcommerceDashboard`, `Earnings`, `Kpi`, `Order`, `RevenuePoint`, `SalesSlice`, `WeeklyStat`, `RevenueTotals`, `KpiViewModel`, `ActivityEvent`. Every file is named `<name>.model.ts`. |

**Rule:** a model used in more than one file lives in `shared/models`, is exported from its
`index.ts`, and is imported through the `shared` barrel. A model used by exactly one file would stay
beside that file as `<name>.model.ts`, never exported from an `index.ts`. Today every ecommerce
model is used in at least two files, so none live under `features/`. There is no `features/ecommerce/models/` folder.

- `ActivityConfig` is order vocabulary, but it stays in `shared/models`: its only consumer is
  `OrderActivityLookup`, and `shared` must not import `features`.
- `core/` holds only app-wide code (`LayoutService`, `CURRENT_USER`). A feature's own service and
  mock data live inside the feature (`features/ecommerce/services/`, `features/ecommerce/data/`), so
  each new feature adds its own folders instead of growing `core`.
- **Reverted attempt:** `fe774d7` relocated models by ownership. It put component-owned
  `*.model.ts` files inside component folders, chart and lookup models beside their domains, and
  the dashboard data models into `core/data/`. The user had it reverted in `195b23a` and said not
  to re-implement it. **Don't move models again unless the user asks. If the topic comes up, ask
  what they want rather than re-applying either layout.**

---

## 7. Decisions made, with reasons

| Decision | Why |
|---|---|
| Bootstrap via `bootstrap-grid`, not the full stylesheet | PrimeNG owns components; Bootstrap owns layout. Saved 179 kB. |
| Avatar dropdown hand-rolled, not PrimeNG `MenuModule` | Measured 131 kB for one dropdown. PrimeNG still owns the orders table. |
| Bundle budget 500 kB → 700 kB | The app's floor is 478 kB before any feature. The plan's DoD was updated to match. |
| ApexCharts | Per the plan's recommendation. It lands in the lazy chunk: +2.8 kB initial. |
| Chart palette validated, not chosen by eye | Adjacent CVD ΔE 14.9; the first four colours clear all pairs for the donut. |
| `data` reads the resource only when `hasValue()` | `rxResource.value()` throws in the error state; guarding it keeps every `?? []` fallback in the page's computed values real (caught by a spec). |
| Prettier `trailingComma: none` | Matches the existing code, so adopting Prettier reflowed 20 files instead of 57. |

---

## 8. Next actions

1. **Clear the blocker** (§3). Nothing else unblocks Stage 9's exact parity pass or the
   reconciliation of the `[verify]` fixtures.
2. **Stage 7 — responsive** (plan §10). It was already verified clean at 320/390/768/1440 during
   Stage 6, including the orders table's own internal horizontal scroll, which was confirmed not
   to leak into page-level overflow. Expect confirmation rather than repair.
3. **Stage 8 — accessibility.** Landmarks, `aria-current`, the focus ring and reduced-motion are
   already in. The contrast audit and a keyboard sweep remain.
4. **Stage 9 — visual parity** against the reference, once it's reachable. Revisit
   `EarningsHeroComponent`'s missing decorative background and `ActivityCardComponent`'s activity-feed substitution
   first: those are the two items most likely to change shape, not just figures.
5. **The user's call, not yours:** what to do with PR #9.

`ChartAreaComponent` remains built and unused. No page section calls for a distinct single-trend area chart
beyond what `ChartSparklineComponent` already covers (hero, weekly stats), and forcing it in would mean
inventing a placement.

---

## 9. Verifying UI changes

Headless Chromium's `--screenshot` renders at a wide canvas and crops, which looks *identical* to
horizontal overflow. It produced two false bug reports in an earlier session. Use a real browser
viewport instead:

```bash
npm install --prefix /tmp/shots playwright-core
```

Then drive it with `chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })` and a real
`viewport`. Compare `document.documentElement.scrollWidth` against `clientWidth` to detect
overflow for real.

When a chart looks wrong, read the SVG's `d` and `stroke` attributes before theorising. That is
what found the invisible-stroke bug in Stage 5, after a wrong guess about container width.

---

## 10. How the user works

- Writes in Arabic and English. Reply in the language of their message: direct, concise,
  structured.
- Gives detailed specs. Scan the project first, follow the spec exactly, and make no unrelated
  changes.
- When a spec is ambiguous, pick the most reasonable reading and state the call. Ask only when
  genuinely blocked.
- Every task ends the same way: `npm run build` clean → a commit with a descriptive message → push
  to `init` → a short report (what changed, which files, intentional exceptions and why, build
  status).
- Expect judgment calls to be reviewed and sometimes reversed (e.g. `UiCardComponent` joining
  `SHARED_IMPORTS`, the reverted model move). State the reasoning behind each one so it can be
  evaluated.
