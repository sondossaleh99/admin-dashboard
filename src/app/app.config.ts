import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  inject,
  provideAppInitializer
} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { provideHttpClient } from '@angular/common/http';
import { TitleStrategy, provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { providePrimeNG } from 'primeng/config';

import { AppPreset, LanguageService, TranslatedTitleStrategy } from './core';
import { routes } from './app.routes';

registerLocaleData(localeAr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'SAR' },

    provideHttpClient(),

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    }),
    provideAppInitializer(() => {
      const languageService = inject(LanguageService);
      return languageService.setLanguage(languageService.currentLanguage());
    }),

    providePrimeNG({
      theme: {
        preset: AppPreset,
        options: {
          darkModeSelector: false
        }
      },
      zIndex: { modal: 1100, overlay: 1000, menu: 1100, tooltip: 1100 }
    })
  ]
};
