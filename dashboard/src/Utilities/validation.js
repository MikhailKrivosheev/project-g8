import isURL from 'validator/es/lib/isURL';
import isEmail from 'validator/es/lib/isEmail';

const PHONE_REGEX = /^(\+?7|8)?\d{10}$/;

export function url(value) {
  return isURL(value);
}

export function phone(value) {
  return PHONE_REGEX.test(value.replace(/\D/g, ''));
}

export function email(value) {
  return isEmail(value);
}
