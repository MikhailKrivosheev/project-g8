export const CRUMBS = {
  dashboard: 'Главная',
  users: 'Пользователи',
  seasons: 'Сезоны',
  contests: 'Категории',
  'contests-validation': 'Список валидируемых категорий',
  nominations: 'Номинации',
  article: 'Журнал',
  'sponsor-types': 'Типы спонсоров',
  sponsors: 'Спонсоры',
  costs: 'Стоимость',
  sections: 'Секции',
  works: 'Работы',
  reports: 'Доклады',
  albums: 'Галерея',
  'sponsors-pages': 'Список спонсоров',
  places: 'Места проведения',
  rooms: 'Комнаты',
  'editable-content': 'Редактируемый контент',
  'personal-area': 'Личный кабинет пользователя',
};

export function getCrumbText(value) {
  if (!CRUMBS[value]) return '';
  return CRUMBS[value];
}

export function getCrumbLink(paths, index) {
  return `/${paths.slice(0, index + 1).join('/')}`;
}
