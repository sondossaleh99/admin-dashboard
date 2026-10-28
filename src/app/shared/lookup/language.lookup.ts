import { Language } from '../enum/language';

export class LanguageLookup {
  static getAll(): { id: Language; label: string }[] {
    return [
      { id: Language.English, label: 'English' },
      { id: Language.Arabic, label: 'العربية' }
    ];
  }

  static getLabel(id: Language): string {
    return LanguageLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }
}
