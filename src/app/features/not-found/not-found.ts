import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective, ButtonLabel } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  imports: [ButtonDirective, ButtonLabel, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
