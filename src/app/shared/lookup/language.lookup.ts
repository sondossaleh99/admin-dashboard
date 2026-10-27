import { Language } from '../enum/language';

export class LanguageLookup {
  static getAll(): { id: Language; label: string; code: string; direction: 'ltr' | 'rtl' }[] {
    return [
      { id: Language.English, label: 'English', code: 'en', direction: 'ltr' },
      { id: Language.Arabic, label: 'العربية', code: 'ar', direction: 'rtl' }
    ];
  }

  static getLabel(id: Language): string {
    return LanguageLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }

  static getCode(id: Language): string {
    return LanguageLookup.getAll().find((item) => item.id === id)?.code ?? 'en';
  }

  static getDirection(id: Language): 'ltr' | 'rtl' {
    return LanguageLookup.getAll().find((item) => item.id === id)?.direction ?? 'ltr';
  }
}
