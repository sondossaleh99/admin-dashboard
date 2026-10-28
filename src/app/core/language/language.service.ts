import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Language } from '../../shared';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  translate = inject(TranslateService);
  document = inject(DOCUMENT);

  currentLanguage = signal<Language>(Language.English);

  constructor() {
    this.translate.addLangs([Language.English, Language.Arabic]);

    this.translate.setFallbackLang(Language.English);

    this.setLanguage(Language.English);
  }

  setLanguage(language: Language): void {
    this.translate.use(language);

    this.currentLanguage.set(language);

    const direction = language === Language.Arabic ? 'rtl' : 'ltr';

    this.document.documentElement.lang = language;
    this.document.documentElement.dir = direction;
  }

  toggleLanguage(): void {
    const language =
      this.currentLanguage() === Language.English ? Language.Arabic : Language.English;

    this.setLanguage(language);
  }
}
