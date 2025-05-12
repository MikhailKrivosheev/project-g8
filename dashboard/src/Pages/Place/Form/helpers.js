/* eslint-disable import/prefer-default-export */
export function setDefaultValues(object) {
  return {
    season_id: object?.season.id || '',
    name_ru: object?.name_ru || '',
    name_en: object?.name_en || '',
    published: object?.published || false,
  };
}
