import { NavGroup } from '../interface/nav-group';

/**
 * Sidebar structure.
 *
 * Only `/ecommerce` is implemented; the rest are shown disabled so the sidebar
 * reads as complete without offering dead links. Group labels and ordering are
 * still to be confirmed against the reference. [verify]
 */
export class NavigationLookup {
  static getGroups(): NavGroup[] {
    return [
      {
        label: 'Dashboard',
        items: [{ label: 'Ecommerce', icon: 'pi-shopping-cart', route: '/ecommerce' }]
      },
      {
        label: 'Pages',
        items: [
          { label: 'Orders', icon: 'pi-file', route: '/orders', disabled: true },
          { label: 'Employees', icon: 'pi-id-card', route: '/employees', disabled: true },
          { label: 'Customers', icon: 'pi-users', route: '/customers', disabled: true }
        ]
      },
      {
        label: 'Apps',
        items: [
          { label: 'Calendar', icon: 'pi-calendar', route: '/calendar', disabled: true },
          { label: 'Kanban', icon: 'pi-th-large', route: '/kanban', disabled: true },
          { label: 'Editor', icon: 'pi-pencil', route: '/editor', disabled: true }
        ]
      },
      {
        label: 'Charts',
        items: [
          { label: 'Line', icon: 'pi-chart-line', route: '/line', disabled: true },
          { label: 'Area', icon: 'pi-chart-bar', route: '/area', disabled: true },
          { label: 'Pie', icon: 'pi-chart-pie', route: '/pie', disabled: true }
        ]
      }
    ];
  }
}
