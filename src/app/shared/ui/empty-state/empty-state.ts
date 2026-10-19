import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.html',
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
