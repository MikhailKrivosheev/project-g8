/* eslint-disable import/prefer-default-export */
import { TOKEN_STORAGE_NAME } from './constants';
import * as storage from './localStorage';

export function get() {
  return storage.get(TOKEN_STORAGE_NAME);
}

export function set(token) {
  storage.set(TOKEN_STORAGE_NAME, token);
}

export function remove() {
  storage.remove(TOKEN_STORAGE_NAME);
}
