import { get } from 'Utilities/localStorage';

const languages = ['ru', 'en'];

export default function getLang() {
  const firstRouteItem = window.location.pathname.split('/')?.[1];
  if (languages.includes(firstRouteItem)) {
    return window.location.pathname.split('/')?.[1];
  }
  return get('lang') || document.documentElement.lang;
}
