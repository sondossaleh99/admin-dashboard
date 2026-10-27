import { Order, OrderStatus } from '../../shared';

export const orders: Order[] = [
  {
    id: 'ORD-4824',
    customer: 'Layla Haddad',
    item: 'Wireless headphones',
    placedAt: '2026-10-26',
    total: 749,
    status: OrderStatus.Paid,
    location: 'Riyadh'
  },
  {
    id: 'ORD-4823',
    customer: 'Omar Al-Harbi',
    item: 'Mechanical keyboard',
    placedAt: '2026-10-26',
    total: 459,
    status: OrderStatus.Pending,
    location: 'Jeddah'
  },
  {
    id: 'ORD-4822',
    customer: 'Sara Nasser',
    item: 'Standing desk',
    placedAt: '2026-10-25',
    total: 2299,
    status: OrderStatus.Paid,
    location: 'Dammam'
  },
  {
    id: 'ORD-4821',
    customer: 'Faisal Al-Qahtani',
    item: '4K monitor',
    placedAt: '2026-10-25',
    total: 1649,
    status: OrderStatus.Refunded,
    location: 'Riyadh'
  },
  {
    id: 'ORD-4820',
    customer: 'Nora Khalil',
    item: 'Ergonomic chair',
    placedAt: '2026-10-24',
    total: 1349,
    status: OrderStatus.Paid,
    location: 'Khobar'
  },
  {
    id: 'ORD-4819',
    customer: 'Yousef Al-Otaibi',
    item: 'USB-C dock',
    placedAt: '2026-10-24',
    total: 389,
    status: OrderStatus.Cancelled,
    location: 'Medina'
  },
  {
    id: 'ORD-4818',
    customer: 'Dana Aziz',
    item: 'Laptop stand',
    placedAt: '2026-10-23',
    total: 189,
    status: OrderStatus.Paid,
    location: 'Jeddah'
  },
  {
    id: 'ORD-4817',
    customer: 'Khalid Al-Shehri',
    item: 'Webcam 1080p',
    placedAt: '2026-10-23',
    total: 279,
    status: OrderStatus.Pending,
    location: 'Abha'
  },
  {
    id: 'ORD-4816',
    customer: 'Reem Al-Mutairi',
    item: 'Noise-cancelling earbuds',
    placedAt: '2026-10-22',
    total: 899,
    status: OrderStatus.Paid,
    location: 'Riyadh'
  },
  {
    id: 'ORD-4815',
    customer: 'Ahmed Saleh',
    item: 'Portable SSD 1TB',
    placedAt: '2026-10-22',
    total: 529,
    status: OrderStatus.Paid,
    location: 'Dubai'
  },
  {
    id: 'ORD-4814',
    customer: 'Hala Mansour',
    item: 'Desk lamp',
    placedAt: '2026-10-21',
    total: 149,
    status: OrderStatus.Refunded,
    location: 'Mecca'
  },
  {
    id: 'ORD-4813',
    customer: 'Majed Al-Dossary',
    item: 'Cable organiser',
    placedAt: '2026-10-21',
    total: 59,
    status: OrderStatus.Paid,
    location: 'Dammam'
  },
  {
    id: 'ORD-4812',
    customer: 'Lama Al-Zahrani',
    item: 'Wireless mouse',
    placedAt: '2026-10-20',
    total: 229,
    status: OrderStatus.Paid,
    location: 'Tabuk'
  },
  {
    id: 'ORD-4811',
    customer: 'Turki Al-Ghamdi',
    item: 'Monitor arm',
    placedAt: '2026-10-20',
    total: 349,
    status: OrderStatus.Pending,
    location: 'Riyadh'
  },
  {
    id: 'ORD-4810',
    customer: 'Mariam Hassan',
    item: 'Desk mat',
    placedAt: '2026-10-19',
    total: 99,
    status: OrderStatus.Paid,
    location: 'Doha'
  },
  {
    id: 'ORD-4809',
    customer: 'Abdullah Al-Rashid',
    item: 'Lumbar cushion',
    placedAt: '2026-10-19',
    total: 129,
    status: OrderStatus.Cancelled,
    location: 'Jeddah'
  },
  {
    id: 'ORD-4808',
    customer: 'Ghada Fares',
    item: 'Bluetooth speaker',
    placedAt: '2026-10-18',
    total: 399,
    status: OrderStatus.Paid,
    location: 'Kuwait City'
  },
  {
    id: 'ORD-4807',
    customer: 'Saud Al-Anazi',
    item: 'Graphics tablet',
    placedAt: '2026-10-17',
    total: 1199,
    status: OrderStatus.Paid,
    location: 'Riyadh'
  },
  {
    id: 'ORD-4806',
    customer: 'Rana Al-Shammari',
    item: 'Ring light',
    placedAt: '2026-10-17',
    total: 249,
    status: OrderStatus.Refunded,
    location: 'Hail'
  },
  {
    id: 'ORD-4805',
    customer: 'Nawaf Al-Subaie',
    item: 'USB microphone',
    placedAt: '2026-10-16',
    total: 549,
    status: OrderStatus.Paid,
    location: 'Khobar'
  },
  {
    id: 'ORD-4804',
    customer: 'Huda Al-Amri',
    item: 'Docking station',
    placedAt: '2026-10-16',
    total: 899,
    status: OrderStatus.Pending,
    location: 'Manama'
  },
  {
    id: 'ORD-4803',
    customer: 'Bandar Al-Juhani',
    item: 'Wireless charger',
    placedAt: '2026-10-15',
    total: 159,
    status: OrderStatus.Paid,
    location: 'Medina'
  },
  {
    id: 'ORD-4802',
    customer: 'Joud Al-Malki',
    item: 'Footrest',
    placedAt: '2026-10-15',
    total: 179,
    status: OrderStatus.Paid,
    location: 'Jeddah'
  },
  {
    id: 'ORD-4801',
    customer: 'Fahad Al-Yami',
    item: 'Laptop backpack',
    placedAt: '2026-10-14',
    total: 319,
    status: OrderStatus.Cancelled,
    location: 'Riyadh'
  }
];
