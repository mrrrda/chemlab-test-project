const ROUTES: Record<string, string> = {
  HOME: '/',
  CATALOG: '/catalog',
  SPECIAL_OFFERS: '/catalog/special-offers',
  SUPPLIERS: '/catalog/suppliers',
  WAREHOUSE: '/catalog/warehouse',
  REAGENTS_STANDARTS: '/catalog/reagents-standarts',
  CLINIC_DIAGNISTICS: '/catalog/clinic-diagnostics',
  BIOCHEMISTRY_BIOTECHNOLOGY: '/catalog/biochemistry-biotechnology',
  COSMECEUTICALS: '/catalog/cosmeceuticals',
  ANALYTICAL_EQUIPMENT: '/catalog/analytical-equipment',
  LAB_EQUIPMENT: '/catalog/lab-equipment',
  LIFE_SCIENCES_EQUIPMENT: '/catalog/life-science-equipment',
  CONSUMABLES: '/catalog/consumables',
  PHARMACEUTICALS: '/catalog/pharmaceuticals',
  VETERINARY: '/catalog/veterinary',
  MICROELECTRONICS: '/catalog/microelectronics',
  DELIVERY: '/delivery',
  ABOUT: '/about',
  CONTACTS: '/contacts',
  SHOPPING_CART: '/shopping-cart',
  CHECKOUT: '/checkout',
  PRODUCTS_SEARCH: '/catalog/products-search',
} as const;

const ROUTE_SEGMENTS_LABELS: Record<string, string> = {
  '': 'Главная',
  catalog: 'Каталог',
  'special-offers': 'Акции',
  suppliers: 'Поставщики',
  warehouse: 'Склад',
  'reagents-standarts': 'Реактивы и Стандарты',
  'clinic-diagnostics': 'Клиника и Диагностика',
  'biochemistry-biotechnology': 'Биохимия и Биотехнологии',
  cosmeceuticals: 'Космецевтика',
  'analytical-equipment': 'Аналитическое оборудование',
  'lab-equipment': 'Лабораторное оборудование',
  'life-science-equipment': 'Оборудование Life Sciences',
  consumables: 'Расходные материалы',
  pharmaceuticals: 'Фармацевтика',
  veterinary: 'Ветеринария',
  microelectronics: 'Микроэлектроника',
  delivery: 'Доставка',
  about: 'О Нас',
  contacts: 'Контакты',
  'shopping-cart': 'Корзина',
  checkout: 'Оформление заказа',
  'products-search': 'Поиск товаров',
};

export { ROUTES, ROUTE_SEGMENTS_LABELS };
