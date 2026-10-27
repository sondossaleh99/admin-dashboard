import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

export function translateMenuItems(items: MenuItem[], translate: TranslateService): MenuItem[] {
  return items.map((item) => ({
    ...item,
    label: item.label ? translate.instant(item.label) : item.label,
    badge: item.badge ? translate.instant(item.badge) : item.badge,
    ...(item.items ? { items: translateMenuItems(item.items, translate) } : {})
  }));
}
