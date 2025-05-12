/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';

export function parseToDate(value: string | undefined) {
  if (value) return dayjs(new Date(value)).format('MM.DD');
  return '';
}

export function parseToTime(value: string) {
  if (value) return dayjs(new Date(value.replace(/-/g, '/'))).format('HH:mm');
  // This replace need for IoS supporting time
  return '';
}
