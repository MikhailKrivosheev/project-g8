/* eslint-disable import/prefer-default-export */
import generateUrl from 'Utilities/generateFormImageUrl';

export function setDefaultValues(object) {
  return {
    title_ru: object?.title_ru || '',
    title_en: object?.title_en || '',
    block_type: object?.block_type || '',
  };
}
