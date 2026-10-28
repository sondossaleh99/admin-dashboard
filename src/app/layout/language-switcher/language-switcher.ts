import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonDirective, ButtonLabel } from 'primeng/button';

import { LanguageService } from '../../core';
import { Language, LanguageLookup } from '../../shared';

@Component({
  selector: 'app-language-switcher',
  imports: [ButtonDirective, ButtonLabel],
  templateUrl: './language-switcher.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {
  languageService = inject(LanguageService);

  otherLanguage = computed(() =>
    this.languageService.currentLanguage() === Language.English ? Language.Arabic : Language.English
  );
  otherLabel = computed(() => LanguageLookup.getLabel(this.otherLanguage()));
}
