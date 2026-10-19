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
        disabled: true
      },
      {
        label: 'Employees',
        icon: 'pi pi-id-card',
        routerLink: '/employees',
        disabled: true
      },
      {
        label: 'Customers',
        icon: 'pi pi-users',
        routerLink: '/customers',
        disabled: true
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
        disabled: true
      },
      {
        label: 'Kanban',
        icon: 'pi pi-th-large',
        routerLink: '/kanban',
        disabled: true
      },
      {
        label: 'Editor',
        icon: 'pi pi-pencil',
        routerLink: '/editor',
        disabled: true
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
        disabled: true
      },
      {
        label: 'Area',
        icon: 'pi pi-chart-bar',
        routerLink: '/area',
        disabled: true
      },
      {
        label: 'Pie',
        icon: 'pi pi-chart-pie',
        routerLink: '/pie',
        disabled: true
      }
    ]
  }
];
