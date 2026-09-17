# Ecommerce Dashboard — Reproduction Plan (Angular 20)

**Target:** `https://dashboard-one-teal.vercel.app/ecommerce`
**Goal:** a visually accurate, functional reproduction with clean, maintainable Angular code.
**Status:** planning only — no implementation yet.

---

## 0. Access note & open items

The live target could not be loaded from the build environment: `dashboard-one-teal.vercel.app`
is blocked by the network egress policy (403 on CONNECT). Everything below is derived from the
design tokens already committed to this repo (`src/styles/`, `src/app/app.config.ts`) — most
notably the signature primary `#03C9D7` — plus the standard structure of this dashboard family.

**To lock visual fidelity, one of these is needed before Stage 6 (see §10):**

1. Allow `dashboard-one-teal.vercel.app` in the environment's network policy, or
2. Drop screenshots (desktop + mobile) and/or the page's HTML/CSS into `docs/reference/`.

Items marked **[verify]** below are the ones that change with that input. Structure, component
boundaries, and the build order do not.

---

## 1. Stack (already fixed by this repo)

| Concern | Choice | Notes |
|---|---|---|
| Framework | Angular 20.3, standalone components, signals | `app.config.ts` already uses `provideRouter` + `provideAnimationsAsync` |
| UI library | PrimeNG 20 (Aura preset) | Custom primary ramp on `#03C9D7` already defined |
| Grid / utilities | Bootstrap 5.3 (CSS only) | Use for layout grid + spacing utilities; **do not** pull in Bootstrap JS |
| Icons | PrimeIcons 8 | |
| Styles | SCSS with token partials | `_variables`, `_typography`, `_spacing`, `_mixins` |
| Charts | **To add — see §7** | No chart library installed yet |

**Rule:** PrimeNG owns interactive components (table, menu, dropdown, tooltip, avatar).
Bootstrap owns layout only. Avoid two systems styling the same element.

---

## 2. Design system

### 2.1 Already defined (`src/styles/`)

- **Primary** `#03C9D7`, dark `#02AAB6`, light `#E0FAFC`
- **Text** `#1F2937` / `#6B7280` / `#9CA3AF`
- **Surface** border `#E5E7EB`, background `#F8FAFC`, card `#FFFFFF`
- **Status** success `#22C55E`, warning `#F59E0B`, danger `#EF4444`, info `#3B82F6`
- **Spacing** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64
- **Radius** 6 / 8 / 12 / 16 · **Shadows** sm / md / lg
- **Type** Inter; 12 / 14 / 16 / 18 / 20 / 24 / 30; weights 400 / 500 / 600 / 700

### 2.2 To add

- Load **Inter** (`index.html` preconnect + Google Fonts, or self-host `@fontsource/inter`).
  Currently declared in SCSS but never loaded — it silently falls back to system sans.
- Add a **chart categorical palette** (4–6 hues) derived from the primary, so series colors are
  consistent across every chart. Do not let the chart library pick defaults.
- Add `$sidebar-width: 240px` and `$topbar-height: 64px` **[verify]** as layout tokens.
- Bridge SCSS tokens to CSS custom properties on `:root` so PrimeNG overrides and chart configs
  read the same values. Single source of truth.

### 2.3 Visual language

Flat white cards on a light grey page, 1px hairline borders, soft shadow, generous internal
padding (24px), 24px gutters between cards. Numbers are the loudest element on every card
(24–30px, semibold); labels are small, grey, and quiet.

---

## 3. Page structure

### 3.1 App shell (reused by every future route)

```
┌──────────┬──────────────────────────────────────────┐
│          │  Topbar: menu toggle · search · icons ·  │
│ Sidebar  │           notifications · avatar         │
│  240px   ├──────────────────────────────────────────┤
│          │                                          │
│  brand   │   <router-outlet />                      │
│  nav     │   Page content, max-width, 24px padding  │
│  groups  │                                          │
└──────────┴──────────────────────────────────────────┘
```

- **Sidebar** — brand/logo, collapse control, grouped nav with section captions
  (e.g. Dashboard / Pages / Apps / Charts) **[verify]**. Active item: primary text + tinted
  background + left indicator.
- **Topbar** — sticky, white, bottom hairline. Mobile hamburger, search, icon actions with
  badge counts, user avatar + name + dropdown.
- **Content** — Bootstrap container-fluid, 24px padding, cards on a 12-column grid.

### 3.2 Ecommerce page regions (top → bottom) **[verify]**

| # | Region | Content | Desktop span |
|---|---|---|---|
| 1 | Hero / earnings banner | Headline label, large currency value, CTA button, decorative background | 12 |
| 2 | KPI stat row | 4 cards: icon chip, value, delta %, label | 4 × 3 |
| 3 | Revenue updates | Combo chart (bars + line) + legend/summary figures + period selector | 8 |
| 4 | Side summary | Small budget/expense figures stacked beside the chart, with sparklines | 4 |
| 5 | Secondary charts | Sparkline card · weekly-stats list · donut/pie breakdown | 4 + 4 + 4 |
| 6 | Data table | Recent orders/transactions — sortable, paginated | 12 |
| 7 | Activity / footer cards | Media card(s), "read more" links | 12 or 6 + 6 |

---

## 4. Reusable components

All standalone, `OnPush`, signal inputs (`input()` / `input.required()`), presentational unless
noted. Path prefix: `src/app/`.

### 4.1 Layout — `layout/`

| Component | Selector | API |
|---|---|---|
| `MainLayout` | `app-main-layout` | Holds sidebar + topbar + `<router-outlet>`; owns collapse/mobile-drawer state |
| `Sidebar` | `app-sidebar` | `collapsed`, `items: NavGroup[]`; emits `close` |
| `SidebarNavItem` | `app-sidebar-nav-item` | `item`, `collapsed`; `routerLinkActive` for active state |
| `Topbar` | `app-topbar` | `user`; emits `toggleSidebar` |

### 4.2 Shared UI — `shared/ui/`

| Component | Selector | API |
|---|---|---|
| `UiCard` | `app-ui-card` | `title`, `subtitle`, `padding`; `<ng-content>` body + `actions` slot. **Every card on the page uses this** |
| `StatCard` | `app-stat-card` | `label`, `value`, `delta`, `icon`, `iconColor` — renders the delta arrow + success/danger color |
| `DeltaBadge` | `app-delta-badge` | `value: number` — arrow + signed % + color |
| `IconChip` | `app-icon-chip` | `icon`, `color`, `size` — the tinted rounded icon square |
| `SectionHeader` | `app-section-header` | `title`, `subtitle` + actions slot |
| `EmptyState` | `app-empty-state` | `icon`, `message` |
| `SkeletonBlock` | `app-skeleton-block` | Loading placeholder matching each card's shape |

### 4.3 Charts — `shared/charts/`

One thin wrapper per chart type. Components pass **data only**; the wrapper owns theme,
tooltip, axis and responsive config so styling never leaks into feature code.

`ChartCombo` (bars + line) · `ChartArea` · `ChartDonut` · `ChartSparkline`

### 4.4 Feature — `features/ecommerce/`

`EcommercePage` (route component, orchestrates only) plus the section components:
`EarningsHero`, `KpiRow`, `RevenueUpdatesCard`, `WeeklyStatsCard`, `SalesBreakdownCard`,
`RecentOrdersTable`, `ActivityCard`.

**Boundary rule:** feature components arrange and bind. They never define colors, radii, or
shadows — those come from `UiCard` and the tokens.

---

## 5. Data & state

- `src/app/core/models/` — `Kpi`, `RevenuePoint`, `Order`, `NavGroup`, `WeeklyStat`, `SalesSlice`.
  Typed interfaces, no `any`.
- `src/app/core/data/` — mock JSON matching the target's figures **[verify]**.
- `EcommerceService` — `providedIn: 'root'`, returns observables via `of(...).pipe(delay(300))`
  so the loading states are real and the swap to HTTP later is a one-line change.
- Page state with signals: `data`, `loading`, `error`; derived values via `computed()`.
- Currency, percent and compact-number formatting via Angular pipes — never hand-formatted
  strings in templates.

---

## 6. Functionality

| Feature | Behavior |
|---|---|
| Navigation | `/ecommerce` as the default redirect; lazy `loadComponent` per route; active-link highlighting |
| Sidebar | Collapse to icon-rail on desktop; slide-over drawer + backdrop on mobile; state persisted to `localStorage` |
| Table | Sort, paginate, row hover, status badges, responsive stacked mode below `md` |
| Charts | Hover tooltips, legend toggle, resize-aware, animate once on load |
| Period selector | Dropdown on the revenue card that re-filters the series |
| Search | Topbar input filtering the orders table (debounced) |
| Loading | Skeletons per card, not one global spinner |
| Errors | Inline retry inside the affected card |

---

## 7. Chart library — recommendation

**Best: ApexCharts (`ng-apexcharts`).** Closest out-of-the-box match for this design language —
gradient area fills, true sparkline mode, donut with centered label, combo bar+line — so less
custom config to reach visual parity. Cost: ~130 KB gzipped.

Alternatives:
- **Chart.js via PrimeNG `<p-chart>`** — zero integration work since PrimeNG is already here, and
  lighter. Choose this if bundle size outranks pixel fidelity; expect more manual config for
  gradients and sparklines.
- **ECharts** — most capable, heaviest, more config overhead than this page justifies.

Either way, wrap it (§4.3). The wrapper is the only file that changes if the library changes.

---

## 8. Responsive behavior

| Breakpoint | Sidebar | KPI row | Charts | Table |
|---|---|---|---|---|
| `≥1400px` | Expanded 240px | 4 across | 8 / 4 split | Full |
| `992–1399px` | Expanded | 4 across | 8 / 4 split, reduced height | Full |
| `768–991px` | Icon rail | 2 × 2 | Stacked, full width | Horizontal scroll |
| `<768px` | Off-canvas drawer | 1 per row | Stacked, shorter | Stacked card rows |

Rules: mobile-first SCSS, `min-width` media queries only, 16px page gutter on mobile,
**no horizontal page scroll at 320px**, touch targets ≥44px, charts sized by container
(not fixed pixels).

---

## 9. Quality bar

- Semantic landmarks (`<nav>`, `<header>`, `<main>`), visible focus rings, `aria-label` on
  icon-only buttons, `aria-current` on the active nav item.
- Text contrast ≥4.5:1 — check grey-on-white label colors against the target.
- Deltas never rely on color alone; the arrow + sign carry the meaning.
- `prefers-reduced-motion` respected for chart animations and drawer transitions.
- Charts get a text alternative (accessible summary or adjacent data figures).

---

## 10. Work breakdown

48 tasks across 9 stages. Stages run in order — each depends on the one above it.
Size is relative: **S** ≈ under an hour, **M** ≈ half a day, **L** ≈ a day or more.

### 10.1 Stage map

| Stage | Name | Tasks | Status | Gate |
|---|---|---|---|---|
| 1 | Foundation | 6 | Ready | — |
| 2 | App shell | 6 | Ready | — |
| 3 | UI primitives | 6 | Ready | — |
| 4 | Data layer | 4 | Ready | — |
| 5 | Charts | 6 | Ready | Needs the §7 library decision |
| 6 | Page assembly | 8 | **Structurally done** — see note | Pixel-fidelity still needs the visual audit (§0) |
| 7 | Responsive | 4 | Blocked by 6 | — |
| 8 | Accessibility & polish | 5 | Blocked by 6 | — |
| 9 | Visual parity | 3 | Blocked by 6 | — |

**Stages 1–4 can start right now.** Stage 5 needs one decision. Stage 6's structure (componentization, real PrimeNG table, functional wiring) does not need the reference and is done; its pixel-level fidelity — exact spacing, real figures, any decorative treatment — is still the hard gate on stages 7 and 9.

---

### Stage 1 — Foundation

Close the three token gaps from §2.2 before any component is written.

| # | Task | Done when | Size |
|---|---|---|---|
| 1.1 | `npm install` | Dependencies resolve; `npm start` serves on :4200 | S |
| 1.2 | Load Inter | Font link in `index.html` (or `@fontsource/inter`); computed font-family is Inter, not system sans | S |
| 1.3 | Bridge tokens to CSS custom properties | Every SCSS token also emitted as a `--var` on `:root`; no hex duplicated anywhere | M |
| 1.4 | Add layout tokens | `$sidebar-width`, `$sidebar-width-collapsed`, `$topbar-height` in `_variables.scss` **[verify]** | S |
| 1.5 | Define the chart palette | 4–6 categorical hues derived from `#03C9D7`, exported as both SCSS and CSS vars | M |
| 1.6 | Global base styles | Page background, base type, focus-visible ring, `prefers-reduced-motion` block in `styles.scss` | S |

---

### Stage 2 — App shell

The shell every future route reuses. Build it responsive from the start — retrofitting the drawer later is more work.

| # | Task | Done when | Size |
|---|---|---|---|
| 2.1 | Remove scaffolding | PrimeNG demo gone from `app.ts` / `app.html`; `App` renders only `<router-outlet>` | S |
| 2.2 | Routing skeleton | `/` redirects to `/ecommerce`; route lazy-loads via `loadComponent`; 404 fallback | S |
| 2.3 | `MainLayout` | Sidebar + topbar + outlet compose correctly; owns `collapsed` and `drawerOpen` signals | M |
| 2.4 | `Sidebar` + `SidebarNavItem` | Nav renders from a typed `NavGroup[]`; active item styled via `routerLinkActive` | M |
| 2.5 | `Topbar` | Sticky, hamburger, search input, icon actions with badges, avatar menu | M |
| 2.6 | Collapse + drawer behavior | Rail collapse on desktop, off-canvas + backdrop on mobile, state persisted to `localStorage` | M |

---

### Stage 3 — UI primitives

Build these before any page section. Every card on the page is assembled from them.

| # | Task | Done when | Size |
|---|---|---|---|
| 3.1 | `UiCard` | Title, subtitle, actions slot, content projection; the only place card border/radius/shadow is defined | M |
| 3.2 | `IconChip` | Tinted rounded icon square; `icon`, `color`, `size` inputs | S |
| 3.3 | `DeltaBadge` | Signed %, directional arrow, success/danger color; meaning survives without color | S |
| 3.4 | `StatCard` | Composes `UiCard` + `IconChip` + `DeltaBadge`; label, value, delta | M |
| 3.5 | `SectionHeader` | Title, optional subtitle, actions slot | S |
| 3.6 | `SkeletonBlock` + `EmptyState` | Skeleton shapes match each card's real layout, not generic bars | M |

---

### Stage 4 — Data layer

Typed and mock-backed, shaped so the swap to real HTTP is a one-line change.

| # | Task | Done when | Size |
|---|---|---|---|
| 4.1 | Models | `Kpi`, `RevenuePoint`, `Order`, `NavGroup`, `WeeklyStat`, `SalesSlice` in `core/models/`; no `any` | S |
| 4.2 | Mock data | JSON fixtures in `core/data/` matching the target's figures **[verify]** | M |
| 4.3 | `EcommerceService` | `providedIn: 'root'`; returns `of(...).pipe(delay(300))` per dataset | S |
| 4.4 | Page state | `data` / `loading` / `error` signals; derived totals via `computed()` | M |

---

### Stage 5 — Charts

**Gate:** pick the library first (§7 recommends ApexCharts). Everything here sits behind wrappers so the choice stays reversible.

| # | Task | Done when | Size |
|---|---|---|---|
| 5.1 | Decide + install | Library added to `package.json`; renders one throwaway chart successfully | S |
| 5.2 | Shared chart config | One base theme module: fonts, grid, tooltip, axis and palette read from the CSS vars in 1.3/1.5 | M |
| 5.3 | `ChartCombo` | Bars + line on a shared scale; legend toggle; resize-aware | L |
| 5.4 | `ChartArea` | Gradient fill, smooth curve, hover tooltip | M |
| 5.5 | `ChartDonut` | Centered total label; slice colors from the palette | M |
| 5.6 | `ChartSparkline` | No axes or grid; emphasized endpoint; sized by container | S |

---

### Stage 6 — Page assembly ✅ structurally done, pixel-fidelity ⛔ still blocked

The reference site is still unreachable, so **nothing below was built by guessing its visual
details.** Every section is composed from Stage 3's primitives and Stage 5's chart wrappers, using
only the tokens and data already in this repo. What pixel fidelity requires — exact spacing, real
figures, any decorative treatment — stays `[verify]` and gates stages 7 and 9, unchanged.

| # | Task | Done when | Status |
|---|---|---|---|
| 6.1 | `EcommercePage` | Route component; binds service data to sections and nothing else | ✅ Thin orchestrator: fetch, derived state, formatting only |
| 6.2 | `EarningsHero` | Headline label, large currency figure, decorative background | ✅ Headline + sparkline trend. **No decorative background** — inventing one has nothing to be based on `[verify]` |
| 6.3 | `KpiRow` | 4 × `StatCard` on a 12-col grid | ✅ |
| 6.4 | `RevenueUpdatesCard` | `ChartCombo` + legend figures + period dropdown that re-filters the series | ✅ |
| 6.5 | `WeeklyStatsCard` | Stat list with inline sparklines | ✅ |
| 6.6 | `SalesBreakdownCard` | `ChartDonut` + legend with values | ✅ |
| 6.7 | `RecentOrdersTable` | PrimeNG table: sort, paginate, status badges, row hover, debounced search | ✅ Real `p-table`: sortable columns, pagination, 250ms-debounced global search, empty-state row |
| 6.8 | `ActivityCard` | Media card(s) with read-more links | ✅ **Substituted.** No real images or copy exist for a media card, and inventing them is exactly the kind of guess this stage avoids. Built as a "Recent activity" feed derived from the same order data the table shows — real data, different presentation. `[verify]` against the reference once reachable |

---

### Stage 7 — Responsive

Verify at 320 / 768 / 992 / 1400. The §8 table is the spec.

| # | Task | Done when | Size |
|---|---|---|---|
| 7.1 | Grid breakpoint pass | KPI row 4 → 2 → 1; chart 8/4 split stacks below `lg` | M |
| 7.2 | Sidebar behavior | Rail at `md`, drawer below `md`, backdrop dismisses, focus trapped in the drawer | M |
| 7.3 | Table responsive mode | Horizontal scroll at `md`, stacked card rows below | M |
| 7.4 | Chart sizing | Container-driven heights; no fixed pixel widths; no overflow at 320px | S |

---

### Stage 8 — Accessibility & polish

| # | Task | Done when | Size |
|---|---|---|---|
| 8.1 | Landmarks + ARIA | `nav` / `header` / `main`; `aria-label` on icon-only buttons; `aria-current` on active nav | S |
| 8.2 | Keyboard | Full tab order, visible focus everywhere, drawer and dropdowns escape-dismissable | M |
| 8.3 | Contrast audit | All text ≥ 4.5:1, including grey labels on white and any text over the hero background | S |
| 8.4 | Reduced motion | Chart animations and drawer transitions respect `prefers-reduced-motion` | S |
| 8.5 | State coverage | Loading skeletons, empty states and inline card-level error retry all reachable and styled | M |

---

### Stage 9 — Visual parity

| # | Task | Done when | Size |
|---|---|---|---|
| 9.1 | Side-by-side diff | Reproduction and reference compared at desktop and mobile; drift listed | M |
| 9.2 | Drift fixes | Spacing, font weight, color and radius corrections applied via tokens — never per-component overrides | M |
| 9.3 | Build check | `ng build` clean, zero console errors, initial bundle within the 700 KB budget | S |

---

## 11. Definition of done

- `/ecommerce` matches the reference at desktop and mobile widths
- Every card is a `UiCard`; no duplicated card CSS anywhere
- No hard-coded colors or pixel spacing in feature components — tokens only
- No `any`; strict template type-checking passes
- Zero console errors; `ng build` clean within the **700 KB** initial budget
  (raised from the CLI default of 500 KB in Stage 3: Angular core, the router,
  PrimeNG's theme engine and Bootstrap's grid put this app's floor at 478 KB
  before a single feature, so 500 KB left no room for the chart library)
- Keyboard-navigable end to end
