/* eslint-disable import/prefer-default-export */

export function setDefaultValues(object) {
  return {
    home: {
      banner: object?.home?.banner || '',
      text_ru: object?.home?.text_ru || '',
      text_en: object?.home?.text_en || '',
      first_video: object?.home?.first_video || '',
      first_video_preview: object?.home?.first_video_preview || '',
      second_video: object?.home?.second_video || '',
      second_video_preview: object?.home?.second_video_preview || '',
      vote_text_ru: object?.home?.vote_text_ru || '',
      vote_text_en: object?.home?.vote_text_en || '',
      vote_banner: object?.home?.vote_banner || '',
      conference_text_ru: object?.home?.conference_text_ru || '',
      conference_text_en: object?.home?.conference_text_en || '',
    },

    akar: {
      title_ru: object?.akar?.title_ru || '',
      title_en: object?.akar?.title_en || '',
      description_ru: object?.akar?.description_ru || '',
      description_en: object?.akar?.description_en || '',
      guidebook_link_ru: object?.akar?.guidebook_link_ru || '',
      guidebook_link_en: object?.akar?.guidebook_link_en || '',
      video_vk_link_ru: object?.akar?.video_vk_link_ru || '',
      video_vk_link_en: object?.akar?.video_vk_link_en || '',
    },

    awards: {
      banner: object?.awards?.banner || '',
      text_ru: object?.awards?.text_ru || '',
      text_en: object?.awards?.text_en || '',
    },

    works: {
      text_ru: object?.works?.text_ru || '',
      text_en: object?.works?.text_en || '',
      banner: object?.works?.banner || '',
    },

    conference: {
      banner: object?.conference?.banner || '',
      text_ru: object?.conference?.text_ru || '',
      text_en: object?.conference?.text_en || '',
      date_ru: object?.conference?.date_ru || '',
      date_en: object?.conference?.date_en || '',
    },

    jury: {
      text_ru: object?.jury?.text_ru || '',
      text_en: object?.jury?.text_en || '',
      banner: object?.jury?.banner || '',
    },

    price: {
      text_ru: object?.price?.text_ru || '',
      text_en: object?.price?.text_en || '',
      banner: object?.price?.banner || '',
    },
  };
}
