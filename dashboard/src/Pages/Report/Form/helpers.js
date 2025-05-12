/* eslint-disable import/prefer-default-export */
export function setDefaultValues(object) {
  return {
    season_id: object?.season.id || '',
    section_id: object?.section?.id || '',
    room_id: object?.room?.id || '',
    name_ru: object?.name_ru || '',
    name_en: object?.name_en || '',
    tags: object?.tags || '',
    ended_at: object?.ended_at || '',
    started_at: object?.started_at || '',
    description_ru: object?.description_ru || '',
    description_en: object?.description_en || '',
    published: object?.published || false,
    speakers: object?.speakers || '',
    curators: object?.curators || '',
  };
}
