# Deskly Admin

Deskly is an online store selling home-office and tech accessories in Saudi Arabia and the Gulf.
This is its admin dashboard, built with Angular 20. Detailed architecture notes, decisions and
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
- Every new variable, constant and field is camelCase (`orders`, `pageSize`), never
  `UPPER_SNAKE_CASE`. Only the existing exported constants (`<FEATURE>_ROUTES`,
  `NAVIGATION_GROUPS`, `SHARED_IMPORTS`, …) keep their names.
- Every component's template lives in its own `.html` file (`templateUrl`), never inline in the `.ts`.
- Every folder that exposes code has an `index.ts` barrel. Code outside `shared/` or `core/`
  imports through the root barrels (`'../../shared'`, `'../../core'`).
- `features` and `layout` depend on `shared` and `core`; `shared` never imports `features` or `core`.
- No access modifiers or `readonly` unless they enforce real encapsulation.
- One interface per file in `shared/models/`; string unions are enums in `shared/enum/`.
- Enums are numeric (`Paid = 1`, `Pending = 2`, …): a new enum is numeric by default, with other
  values only when the user gives them. Each enum has a lookup exposing `getAll()`
  (`{ id, label }[]`) and `getLabel(id)`. Never put the number in a CSS class or a search field:
  map it to its label first. List an enum's values with `getAll()`, never `Object.values`.
- A template reaches an enum through a camelCase component field: `iconChipSize = IconChipSize;`,
  used as `iconChipSize.Small`.
- Static config and mapping data lives in `shared/lookup/` as `*Lookup` classes. The sidebar menu
  is the exception: it is the `NAVIGATION_GROUPS` constant in `core/config/navigation.config.ts`.
- Every route is lazy-loaded. A feature exposes only `routes.ts` (`<FEATURE>_ROUTES`) through
  its barrel; `app.routes.ts` loads it with `loadChildren`, and each page inside uses
  `loadComponent`, never `component:`.
- PrimeNG owns interactive components; Bootstrap owns layout. Never both on one element.
- Amounts use the `appCurrency` pipe (`| appCurrency`, `| appCurrency: 2`); the currency is
  `DEFAULT_CURRENCY_CODE` in `app.config.ts`.
- `$primary` in `_variables.scss` is the only place the brand colour is set. Its shades become
  `--color-primary-*` tokens, which the PrimeNG preset reads; the charts read `--chart-series-1`,
  also set from `$primary`.
- Component styles import shared Sass by name (`@use 'mixins' as m;`), never by relative path.
- Class names join block and element with a hyphen (`activity-dot`, never `activity_dot` or
  `activity__dot`). Modifiers keep the double hyphen (`activity-dot--success`).
- No hex colours in component styles: use `--color-*` tokens. Utilities first; a component's
  `.scss` holds only what is unique to it.
- No `any`. No code comments.

## Data loading in a new feature

Every new feature loads its data the way `features/order` does. `features/ecommerce` predates
this pattern and keeps its own.

- The feature's `service.ts` is `@Injectable()` and listed in its page's `providers`.
- `getX(request)` is the single place that fetches the data and returns an `Observable`. Until the
  API exists, it builds the result from a camelCase mock constant and returns `of(data)`; later
  only its body changes, to an `HttpClient` call, and the mock is deleted. Mock data used by one
  feature lives in that feature's `mock-data.ts`; mock data that several features share lives in
  `core/data/` (`export const orders: Order[] = [...]` in `core/data/orders.data.ts`, read by
  both the dashboard and the Orders page).
- A paged list keeps `page = signal<PageRequest>({ first: 0, rows: 10 })`, exposes
  `setPage(request: PageRequest): void { this.page.set(request); }`, and returns
  `PagedResult<T>` (`{ items, total }`).
- The data is an `rxResource` whose `params` reads every signal it depends on; `stream` only
  calls `getX`:

  ```ts
  orders = rxResource({
    params: () => this.page(),
    stream: ({ params }) => this.getOrders(params)
  });
  ```

- The page only provides the service and renders its child components (`<app-order-table />`);
  it binds no data.
- A component used only inside its feature (like `OrderTableComponent`) injects the feature
  service and aliases what it reads, declared after `service`: `orders = this.service.orders;`,
  `page = this.service.page;`. It reads `orders.value()?.items ?? []`,
  `orders.value()?.total ?? 0` and `orders.isLoading()` (no `?.` on the resource itself), and
  its lazy `p-table` (`[lazy]="true"`, `[totalRecords]`, `[loading]`, `[first]`, `[rows]`) calls
  `service.setPage(...)` from `onLazyLoad`.
- A component reused outside its feature takes its data as inputs and reports changes through
  outputs instead of injecting a service.

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
