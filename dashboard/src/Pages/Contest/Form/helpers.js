/* eslint-disable import/prefer-default-export */
import generateUrl from 'Utilities/generateFormImageUrl';

export function setDefaultValues(object) {
  return {
    analog_contest_ids: object?.analog_contests || '',
    curator_ids: object?.curators[0]?.id || '',
    name_ru: object?.name_ru || '',
    name_en: object?.name_en || '',
    description_ru: object?.description_ru || '',
    description_en: object?.description_en || '',
    amount: object?.amount || null,
    published: object?.published || false,
    image: generateUrl(object?.image_url) || '',
    sponsor_name_ru: object?.sponsor_name_ru || '',
    sponsor_name_en: object?.sponsor_name_en || '',
    sponsor_link: object?.sponsor_link || '',
    sponsor_logo: generateUrl(object?.sponsor_logo_url) || '',
    type: object?.type || 'creative_industries',
    validation_rules: {
      brand: {
        required: object?.validation_rules?.brand?.required || false,
      },
      vimeo_link: {
        required: object?.validation_rules?.vimeo_link?.required || false,
      },
      slider_images: {
        required: object?.validation_rules?.slider_images?.required || false,
      },
      slider_videos: {
        required: object?.validation_rules?.slider_videos?.required || false,
      },
    },
  };
}
