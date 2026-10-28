import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { Observable } from 'rxjs';

import { Language, LanguageLookup } from '../../shared';

const languageKey = 'admin-dashboard.language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  translate = inject(TranslateService);
  document = inject(DOCUMENT);
  primeng = inject(PrimeNG);

  defaultAria = { ...this.primeng.translation.aria };

  currentLanguage = signal<Language>(this.savedLanguage());

  constructor() {
    this.translate.addLangs([Language.English, Language.Arabic]);

    this.translate.setFallbackLang(Language.English);

    this.translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => this.translatePrimeNg());
  }

  setLanguage(language: Language): Observable<unknown> {
    const loading = this.translate.use(language);

    this.currentLanguage.set(language);

    const direction = language === Language.Arabic ? 'rtl' : 'ltr';

    this.document.documentElement.lang = language;
    this.document.documentElement.dir = direction;

    localStorage.setItem(languageKey, language);

    return loading;
  }

  toggleLanguage(): void {
    const language =
      this.currentLanguage() === Language.English ? Language.Arabic : Language.English;

    this.setLanguage(language);
  }

  savedLanguage(): Language {
    const saved = localStorage.getItem(languageKey);
    return LanguageLookup.getAll().find((item) => item.id === saved)?.id ?? Language.English;
  }

  translatePrimeNg(): void {
    const aria: Record<string, string> = this.translate.instant('primeng.aria');

    this.primeng.setTranslation({
      emptyMessage: String(this.translate.instant('primeng.emptyMessage')),
      emptySelectionMessage: String(this.translate.instant('primeng.emptySelectionMessage')),
      aria: { ...this.defaultAria, ...aria }
    });
  }
}
