/* eslint-disable import/prefer-default-export */
import * as storage from './localStorage';

const TOKEN_STORAGE_NAME = 'g8_user_token';

export function get() {
  return storage.get(TOKEN_STORAGE_NAME);
}

export function set(token: string) {
  storage.set(TOKEN_STORAGE_NAME, token);
}

export function remove() {
  storage.remove(TOKEN_STORAGE_NAME);
}
