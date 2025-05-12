import * as params from './params';
import * as localStorage from './localStorage';
import * as cookie from './cookie';
import * as apiTokenStorage from './apiTokenStorage';
import { translate } from './translate';
import * as date from './date';
import * as animation from './animation';
import { isValidHttpUrl } from './urlValidation';

export default {
  params,
  translate,
  apiTokenStorage,
  localStorage,
  cookie,
  date,
  animation,
  isValidHttpUrl,
  generateAuthHeader: () => {
    if (apiTokenStorage.get()) {
      return {
        Authorization: `Bearer ${apiTokenStorage.get()}`,
      };
    }
    return {};
  },
};
