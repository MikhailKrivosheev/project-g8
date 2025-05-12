/* eslint-disable import/prefer-default-export */
import generateUrl from 'Utilities/generateFormImageUrl';

export function setDefaultValues(object) {
  return {
    title_ru: object?.title_ru || '',
    title_en: object?.title_en || '',
    thumbnail: generateUrl(object?.thumbnail_url) || '',
    content_ru: object?.content_ru || '',
    content_en: object?.content_en || '',
    source: object?.source || '',
    date_publish: object?.date_publish || '',
    soundcloud_link: object?.soundcloud_link || '',
    video_link: object?.video_link || '',
    is_fixed: object?.is_fixed || false,
    published: object?.published || false,
    slider_url: object?.slider_url.map((_, index) => {
      const sliderImage = {
        image: generateUrl(object?.slider_url[index].image) || '',
      };

      return sliderImage;
    }),
  };
}
