/* eslint-disable import/prefer-default-export */

export function setDefaultValues(object) {
  return {
    lk: {
      banner: object?.lk.banner || '',
    },
  };
}
