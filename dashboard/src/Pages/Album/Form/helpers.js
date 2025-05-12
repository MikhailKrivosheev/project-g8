/* eslint-disable import/prefer-default-export */
import generateUrl from 'Utilities/generateFormImageUrl';

export function setDefaultValues(object) {
  return {
    title_ru: object?.title_ru || '',
    title_en: object?.title_en || '',
    year: object?.year || '',
    album_season: object?.album_season || '',
    is_home: object?.is_home || false,
    type: object?.type || '',
    image_cover: generateUrl(object?.image_cover_url),
    gallery_photo:
      object?.type === 'photo'
        ? object?.gallery_url.map((imageUrl) => {
            return generateUrl(imageUrl);
          })
        : [],
    gallery_video:
      object?.type === 'video'
        ? object?.gallery_url.map((_, index) => {
            return {
              image: generateUrl(object?.gallery_url[index].image) || '',
              video_url: object?.gallery_url[index].video_url || '',
            };
          })
        : [{ image: '', video_url: '' }],
  };
}
