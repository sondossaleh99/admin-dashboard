import { MenuItem } from 'primeng/api';

export const NAVIGATION_GROUPS: MenuItem[] = [
  {
    label: 'Dashboard',
    items: [
      {
        label: 'Ecommerce',
        icon: 'pi pi-shopping-cart',
        routerLink: '/ecommerce'
      }
    ]
  },
  {
    label: 'Pages',
    items: [
      {
        label: 'Orders',
        icon: 'pi pi-file',
        routerLink: '/orders',
        disabled: true,
        badge: 'Soon'
      },
      {
        label: 'Employees',
        icon: 'pi pi-id-card',
        routerLink: '/employees',
        disabled: true,
        badge: 'Soon'
      },
      {
        label: 'Customers',
        icon: 'pi pi-users',
        routerLink: '/customers',
        disabled: true,
        badge: 'Soon'
      }
    ]
  },
  {
    label: 'Apps',
    items: [
      {
        label: 'Calendar',
        icon: 'pi pi-calendar',
        routerLink: '/calendar',
        disabled: true,
        badge: 'Soon'
      },
      {
        label: 'Kanban',
        icon: 'pi pi-th-large',
        routerLink: '/kanban',
        disabled: true,
        badge: 'Soon'
      },
      {
        label: 'Editor',
        icon: 'pi pi-pencil',
        routerLink: '/editor',
        disabled: true,
        badge: 'Soon'
      }
    ]
  },
  {
    label: 'Charts',
    items: [
      {
        label: 'Line',
        icon: 'pi pi-chart-line',
        routerLink: '/line',
        disabled: true,
        badge: 'Soon'
      },
      {
        label: 'Area',
        icon: 'pi pi-chart-bar',
        routerLink: '/area',
        disabled: true,
        badge: 'Soon'
      },
      {
        label: 'Pie',
        icon: 'pi pi-chart-pie',
        routerLink: '/pie',
        disabled: true,
        badge: 'Soon'
      }
    ]
  }
];
