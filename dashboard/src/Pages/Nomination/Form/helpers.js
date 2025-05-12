/* eslint-disable import/prefer-default-export */

export function setDefaultValues(object) {
  return {
    name_ru: object?.name_ru || '',
    name_en: object?.name_en || '',
    description_ru: object?.description_ru || '',
    description_en: object?.description_en || '',
    published: object?.published || false,
    is_young: object?.is_young || false,
    amount: object?.amount || null,
  };
}
