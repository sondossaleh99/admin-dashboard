import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { Observable, tap } from 'rxjs';

import { Language, LanguageLookup } from '../../shared';

const languageKey = 'deskly.language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  translate = inject(TranslateService);
  primeng = inject(PrimeNG);
  document = inject(DOCUMENT);

  language = signal(this.savedLanguage());
  code = computed(() => LanguageLookup.getCode(this.language()));
  direction = computed(() => LanguageLookup.getDirection(this.language()));
  otherLanguage = computed(() =>
    this.language() === Language.Arabic ? Language.English : Language.Arabic
  );

  use(language: Language): Observable<unknown> {
    const code = LanguageLookup.getCode(language);

    return this.translate.use(code).pipe(
      tap(() => {
        this.language.set(language);
        this.document.documentElement.lang = code;
        this.document.documentElement.dir = LanguageLookup.getDirection(language);
        localStorage.setItem(languageKey, String(language));
        this.primeng.setTranslation(this.translate.instant('primeng'));
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
}
