/* eslint-disable import/prefer-default-export */
import generateUrl from 'Utilities/generateFormImageUrl';

export function setDefaultValues(object) {
  return {
    name_ru: object?.name_ru || '',
    name_en: object?.name_en || '',
    brand_ru: object?.brand_ru || '',
    brand_en: object?.brand_en || '',
    client_name_ru: object?.client_name_ru || '',
    client_name_en: object?.client_name_en || '',
    targets_and_goals_ru: object?.targets_and_goals_ru || '',
    targets_and_goals_en: object?.targets_and_goals_en || '',
    ideas_and_solutions_ru: object?.ideas_and_solutions_ru || '',
    ideas_and_solutions_en: object?.ideas_and_solutions_en || '',
    company_ru: object?.company_ru || '',
    company_en: object?.company_en || '',
    vimeo_link: object?.vimeo_link || '',
    soundcloud_link: object?.soundcloud_link || '',
    project_link: object?.project_link || '',
    status: object?.status || '',
    is_featured: object?.is_featured || false,
    preview: generateUrl(object?.preview_url) || '',
    video_preview: generateUrl(object?.video_preview_url) || '',
    image_1: generateUrl(object?.image_1_url) || '',
    image_2: generateUrl(object?.image_2_url) || '',
    image_3: generateUrl(object?.image_3_url) || '',
    image_4: generateUrl(object?.image_4_url) || '',
    likes_count: object?.likes_count || 0,
    slider_images: object?.slider_images_with_url?.map((_, index) => {
      const galleryImage = {
        image: generateUrl(object?.slider_images_with_url[index].image) || '',
      };

      return galleryImage;
    }),
    slider_videos: object?.slider_videos_with_url?.map((_, index) => {
      const galleryVideo = {
        image: generateUrl(object?.slider_videos_with_url[index].image) || '',
        video: object?.slider_videos_with_url[index].video || '',
      };

      return galleryVideo;
    }),
  };
}
