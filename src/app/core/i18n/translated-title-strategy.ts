import { Injectable, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
  title = inject(Title);
  translate = inject(TranslateService);
  language = inject(LanguageService);

  titleKey = signal<string | undefined>(undefined);

  constructor() {
    super();
    effect(() => {
      this.language.language();
      const key = this.titleKey();
      if (key) {
        this.title.setTitle(String(this.translate.instant(key)));
      }
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.titleKey.set(this.buildTitle(snapshot));
  }
}
