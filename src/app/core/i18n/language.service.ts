import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { Observable, tap } from 'rxjs';

import { Language, LanguageLookup } from '../../shared';

registerLocaleData(localeAr);

const languageKey = 'admin-dashboard.language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  translate = inject(TranslateService);
  primeng = inject(PrimeNG);
  document = inject(DOCUMENT);

  private current = signal(this.savedLanguage());
  private defaultAria = { ...this.primeng.translation.aria };

  language = this.current.asReadonly();
  code = computed(() => LanguageLookup.getCodes()[this.language()]);
  direction = computed(() => LanguageLookup.getDirections()[this.language()]);
  otherLanguage = computed(() =>
    this.language() === Language.Arabic ? Language.English : Language.Arabic
  );

  use(language: Language): Observable<unknown> {
    const code = LanguageLookup.getCodes()[language];

    return this.translate.use(code).pipe(
      tap(() => {
        this.current.set(language);
        this.document.documentElement.lang = code;
        this.document.documentElement.dir = LanguageLookup.getDirections()[language];
        localStorage.setItem(languageKey, String(language));
        this.applyPrimeNgTranslation();
      })
    );
  }

  toggle(): void {
    this.use(this.otherLanguage()).subscribe();
  }

  savedLanguage(): Language {
    const saved = Number(localStorage.getItem(languageKey));
    return LanguageLookup.getAll().find((item) => item.id === saved)?.id ?? Language.English;
  }

  applyPrimeNgTranslation(): void {
    const aria: Record<string, string> = this.translate.instant('primeng.aria');

    this.primeng.setTranslation({
      emptyMessage: String(this.translate.instant('primeng.emptyMessage')),
      emptySelectionMessage: String(this.translate.instant('primeng.emptySelectionMessage')),
      aria: { ...this.defaultAria, ...aria }
    });
  }
}
