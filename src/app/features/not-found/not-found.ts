import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonDirective, ButtonLabel } from 'primeng/button';

import { UiCardComponent } from '../../shared';

@Component({
  selector: 'app-not-found',
  imports: [ButtonDirective, ButtonLabel, RouterLink, TranslatePipe, UiCardComponent],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
