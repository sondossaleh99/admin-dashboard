import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Shown when a card has nothing to display, or failed to load. */
@Component({
  selector: 'app-empty-state',
  template: `
    <i class="pi {{ icon() }} empty-state__icon" aria-hidden="true"></i>
    <p class="empty-state__message">{{ message() }}</p>
    @if (hint()) {
      <p class="empty-state__hint">{{ hint() }}</p>
    }
    @if (actionLabel()) {
      <button type="button" class="empty-state__action" (click)="action.emit()">
        {{ actionLabel() }}
      </button>
    }
  `,
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyState {
  icon = input('pi-inbox');
  message = input.required<string>();
  hint = input<string>();
  /** Renders a button when set — used for the inline retry on a failed load. */
  actionLabel = input<string>();

  action = output<void>();
}
