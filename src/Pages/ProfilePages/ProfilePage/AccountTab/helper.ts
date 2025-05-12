export default function setDefaultValues(object) {
  return {
    first_name_ru: object?.first_name_ru || '',
    first_name_en: object?.first_name_en || '',
    last_name_ru: object?.last_name_ru || '',
    last_name_en: object?.last_name_en || '',
    company_ru: object?.company_ru || '',
    job_title_ru: object?.job_title_ru || '',
    name_en: object?.name_en || '',
    company_en: object?.company_en || '',
    job_title_en: object?.job_title_en || '',
    biography_ru: object?.biography_ru || '',
    biography_en: object?.biography_en || '',
    phone: object?.phone || '',
    image: object?.image_url || '',
    facebook: object?.facebook || '',
    telegram: object?.telegram || '',
    instagram: object?.instagram || '',
    vkontakte: object?.vkontakte || '',
    site: object?.site || '',
    email: object?.email || '',
  };
}
