import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <i class="pi {{ icon() }} mb-1 fs-2xl text-muted" aria-hidden="true"></i>
    <p class="fs-sm fw-medium text-body">{{ message() }}</p>
    @if (hint()) {
      <p class="empty-state__hint fs-xs text-muted">{{ hint() }}</p>
    }
    @if (actionLabel()) {
      <button type="button" class="btn-outline mt-2" (click)="action.emit()">
        {{ actionLabel() }}
      </button>
    }
  `,
  styleUrl: './empty-state.scss',
  host: {
    class:
      'd-flex flex-column align-items-center justify-content-center gap-2 py-8 px-4 text-center'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  icon = input('pi-inbox');
  message = input.required<string>();
  hint = input<string>();
  actionLabel = input<string>();

  action = output<void>();
}
