# Admin Dashboard

An ecommerce admin dashboard built with Angular 20. Detailed architecture notes, decisions and
current state live in `docs/HANDOFF.md`; read it before structural changes.

## Stack

Angular 20 (standalone components, signals) · PrimeNG 20 · Bootstrap 5 (grid and utilities only) ·
ApexCharts via `ng-apexcharts` · SCSS design tokens · Karma/Jasmine.

## Commands

```bash
npm start          # http://localhost:4200/ecommerce
npm run build      # must stay clean after every change
npm run format     # Prettier: 100 cols, single quotes, no trailing commas
npm run test:ci    # one headless test run
```

## Code rules

- Standalone components, `OnPush`, signal APIs (`input`, `output`, `signal`, `computed`, `rxResource`).
- Component classes end in `Component`; file names stay kebab-case without the suffix.
- Every folder that exposes code has an `index.ts` barrel. Code outside `shared/` or `core/`
  imports through the root barrels (`'../../shared'`, `'../../core'`).
- `features` and `layout` depend on `shared` and `core`; `shared` never imports `features` or `core`.
- No access modifiers or `readonly` unless they enforce real encapsulation.
- One interface per file in `shared/models/`; string unions are enums in `shared/enum/`.
- Static config and mapping data lives in `shared/lookup/` as `*Lookup` classes.
- PrimeNG owns interactive components; Bootstrap owns layout. Never both on one element.
- No hex colours in component styles: use `--color-*` tokens. Utilities first; a component's
  `.scss` holds only what is unique to it.
- No `any`. No code comments.

## Git and attribution

- Never mention Claude, Claude Code, Anthropic or AI in commit messages, PR titles, PR
  descriptions, PR comments, code or docs.
- No `Co-Authored-By` trailers, no "Generated with Claude Code" lines and no session links.
- Commit messages use conventional prefixes (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`,
  `chore:`) and describe the change in plain terms.
- Run `npm run build` and `npm run format:check` before every commit.
