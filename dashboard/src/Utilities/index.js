import * as apiTokenStorage from './apiTokenStorage';
import * as constants from './constants';
import * as cookie from './cookie';
import * as date from './date';
import * as storage from './localStorage';
import * as params from './params';
import * as random from './random';
import * as validate from './validation';
import generateFormImageUrl from './generateFormImageUrl';
import * as table from './table';

export default {
  cookie,
  storage,
  apiTokenStorage,
  constants,
  random,
  params,
  validate,
  date,
  logged: () => apiTokenStorage.get(),
  generateAuthHeader: () => {
    if (apiTokenStorage.get()) {
      return {
        Authorization: `Bearer ${apiTokenStorage.get()}`,
      };
    }
    return {};
  },
  generateFormImageUrl,
  table,
};
