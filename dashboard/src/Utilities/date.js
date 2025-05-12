/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';

export function dateToServer(value) {
  return dayjs(new Date(value)).format('YYYY-MM-DD');
}

export function dateToApp(value) {
  return dayjs(new Date(value)).format('YYYY-MM-DD');
}

export function parseToDate(value) {
  return dayjs(new Date(value)).format('YYYY-MM-DD');
}

export function parseToTime(value) {
  return dayjs(new Date(value)).format('HH:mm');
}

export function parseToDateTime(value) {
  return dayjs(new Date(value)).format('YYYY-MM-DD HH:mm:ss');
}
