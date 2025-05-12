/* eslint-disable import/prefer-default-export */
import generateUrl from 'Utilities/generateFormImageUrl';

export function setDefaultValues(object) {
  return {
    season_id: object?.season.id || '',
    name_ru: object?.name_ru || '',
    name_en: object?.name_en || '',
    description_ru: object?.description_ru || '',
    description_en: object?.description_en || '',
    published: object?.published || false,
  };
}
