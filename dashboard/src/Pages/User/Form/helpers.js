/* eslint-disable import/prefer-default-export */
import generateUrl from 'Utilities/generateFormImageUrl';

export function setDefaultValues(object) {
  return {
    roles: object?.roles || '',
    status: object?.status || '',
    contest_ids: object?.contests[0]?.id || '',
    in_conference: object?.in_conference || false,
    in_category_and_nomination: object?.in_category_and_nomination || false,
    email: object?.email || '',
    password: object?.password || '',
    first_name_ru: object?.first_name_ru || '',
    last_name_ru: object?.last_name_ru || '',
    first_name_en: object?.first_name_en || '',
    last_name_en: object?.last_name_en || '',
    company_ru: object?.company_ru || '',
    company_en: object?.company_en || '',
    job_title_ru: object?.job_title_ru || '',
    job_title_en: object?.job_title_en || '',
    biography_ru: object?.biography_ru || '',
    biography_en: object?.biography_en || '',
    phone: object?.phone || '',
    image: generateUrl(object?.image_url) || '',
    image_2: generateUrl(object?.image_2_url) || '',
    facebook: object?.facebook || '',
    telegram: object?.telegram || '',
    instagram: object?.instagram || '',
    vkontakte: object?.vkontakte || '',
    site: object?.site || '',
  };
}
