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

**To lock visual fidelity, one of these is needed before Phase 3:**

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

## 10. Implementation steps

| Phase | Work | Output |
|---|---|---|
| 1 | Tokens: load Inter, CSS-variable bridge, chart palette, layout tokens | Design system ready |
| 2 | Routing + `MainLayout` + `Sidebar` + `Topbar` | Shell navigable, responsive |
| 3 | `UiCard`, `StatCard`, `DeltaBadge`, `IconChip`, skeletons | Primitives, verified against the reference |
| 4 | Models, `EcommerceService`, mock data | Typed data layer |
| 5 | Chart library + 4 wrappers | Charts rendering with correct theme |
| 6 | Ecommerce page: hero → KPI row → charts → table → activity | Page assembled |
| 7 | Responsive pass at 320 / 768 / 992 / 1400 | No layout breaks |
| 8 | A11y + polish: focus, contrast, reduced motion, empty/error states | Quality bar met |
| 9 | Side-by-side visual diff vs. the reference; fix spacing/weight/color drift | Visual parity |

**Sequencing:** phases 1–5 have no dependency on the pending visual audit and can start
immediately. Phase 6 onward is where the **[verify]** items matter.

---

## 11. Definition of done

- `/ecommerce` matches the reference at desktop and mobile widths
- Every card is a `UiCard`; no duplicated card CSS anywhere
- No hard-coded colors or pixel spacing in feature components — tokens only
- No `any`; strict template type-checking passes
- Zero console errors; `ng build` clean within the 500 KB initial budget
- Keyboard-navigable end to end
