import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  inject,
  provideAppInitializer
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { providePrimeNG } from 'primeng/config';

import { AppPreset, LanguageService } from './core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'SAR' },

    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' }),
      fallbackLang: 'en'
    }),
    provideAppInitializer(() => {
      const language = inject(LanguageService);
      return language.use(language.language());
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
