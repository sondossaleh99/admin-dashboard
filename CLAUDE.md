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
- Every component's template lives in its own `.html` file (`templateUrl`), never inline in the `.ts`.
- Every folder that exposes code has an `index.ts` barrel. Code outside `shared/` or `core/`
  imports through the root barrels (`'../../shared'`, `'../../core'`).
- `features` and `layout` depend on `shared` and `core`; `shared` never imports `features` or `core`.
- No access modifiers or `readonly` unless they enforce real encapsulation.
- One interface per file in `shared/models/`; string unions are enums in `shared/enum/`.
- Enums are numeric by default (`Paid = 1`, `Pending = 2`, …); use other values only when the
  user gives them. Each one has a lookup exposing `getAll()` (`{ id, label }[]`) and
  `getLabel(id)`. Never put the number in a CSS class or a search field: map it to its label first.
- Static config and mapping data lives in `shared/lookup/` as `*Lookup` classes.
- PrimeNG owns interactive components; Bootstrap owns layout. Never both on one element.
- Amounts use the `appCurrency` pipe (`| appCurrency`, `| appCurrency: 2`); the currency is
  `DEFAULT_CURRENCY_CODE` in `app.config.ts`.
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
- Branch names: `feature-<task-name>` for a new task, `fix-<change-name>` for a fix. Never use a
  `claude/` prefix or any name that mentions Claude.
- Never push to `init` directly. Push to the task's branch, and open a pull request only when the
  user asks. The user approves it or leaves comments to address on the same branch.
