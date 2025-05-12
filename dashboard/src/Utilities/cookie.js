/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
/* eslint-disable require-unicode-regexp */
/* eslint-disable prefer-template */

function getExpireDaysCount({ minutes, days, years, months }) {
  let count = 0;
  if (minutes) {
    count += minutes * 60;
  }
  if (days) {
    count += days;
  }
  if (months) {
    count += months * 30;
  }
  if (years) {
    count += years * 365;
  }
  return count;
}

export function set(
  name,
  value,
  expires = { days: 1, years: 0, months: 0, minutes: 0 }
) {
  const now = new Date();
  const nowTime = now.getTime();
  const expireCalcs = 3600 * 1000 * 24 * getExpireDaysCount(expires);
  const expireTime = nowTime + expireCalcs;
  now.setTime(expireTime);
  document.cookie = `${name}=${value};expires=${now.toGMTString()};path=/`;
}

export function remove(name, value) {
  const now = new Date();
  const nowTime = now.getTime();
  const expireTime = nowTime - 1;
  now.setTime(expireTime);
  document.cookie = `${name}=${value};expires=${now.toGMTString()}path=/'`;
}

export function removeByName(name) {
  const now = new Date();
  now.setTime(now.getTime() - 1);
  const expires = `expires=${now.toUTCString()}`;
  document.cookie = `${name}=;${expires};path=/`;
}

export function get(name) {
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
