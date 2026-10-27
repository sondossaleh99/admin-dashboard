import { MenuItem } from 'primeng/api';

export const NAVIGATION_GROUPS: MenuItem[] = [
  {
    label: 'nav.dashboard',
    items: [
      {
        label: 'nav.ecommerce',
        icon: 'pi pi-shopping-cart',
        routerLink: '/ecommerce'
      }
    ]
  },
  {
    label: 'nav.pages',
    items: [
      {
        label: 'nav.orders',
        icon: 'pi pi-file',
        routerLink: '/orders'
      },
      {
        label: 'nav.employees',
        icon: 'pi pi-id-card',
        routerLink: '/employees'
      },
      {
        label: 'nav.customers',
        icon: 'pi pi-users',
        routerLink: '/customers',
        disabled: true,
        badge: 'nav.soon'
      }
    ]
  },
  {
    label: 'nav.apps',
    items: [
      {
        label: 'nav.calendar',
        icon: 'pi pi-calendar',
        routerLink: '/calendar',
        disabled: true,
        badge: 'nav.soon'
      },
      {
        label: 'nav.kanban',
        icon: 'pi pi-th-large',
        routerLink: '/kanban',
        disabled: true,
        badge: 'nav.soon'
      },
      {
        label: 'nav.editor',
        icon: 'pi pi-pencil',
        routerLink: '/editor',
        disabled: true,
        badge: 'nav.soon'
      }
    ]
  },
  {
    label: 'nav.charts',
    items: [
      {
        label: 'nav.line',
        icon: 'pi pi-chart-line',
        routerLink: '/line',
        disabled: true,
        badge: 'nav.soon'
      },
      {
        label: 'nav.area',
        icon: 'pi pi-chart-bar',
        routerLink: '/area',
        disabled: true,
        badge: 'nav.soon'
      },
      {
        label: 'nav.pie',
        icon: 'pi pi-chart-pie',
        routerLink: '/pie',
        disabled: true,
        badge: 'nav.soon'
      }
    ]
  }
];
