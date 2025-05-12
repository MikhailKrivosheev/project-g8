/* eslint-disable import/prefer-default-export */
import generateUrl from 'Utilities/generateFormImageUrl';

export function setDefaultValues(object) {
  return {
    title_ru: object?.title_ru || '',
    title_en: object?.title_en || '',
    description_ru: object?.description_ru || '',
    description_en: object?.description_en || '',
    button_text_ru: object?.button_text_ru || '',
    button_text_en: object?.button_text_en || '',
    price: object?.price || '',
    data_tc_event: object?.data_tc_event || '',
    data_tc_token: object?.data_tc_token || '',
    timepad_event_id: object?.timepad_event_id || '',
    timepad_customized_id: object?.timepad_customized_id || '',
    type: object?.type || '',
    widget_type: object?.widget_type || '',
    published: object?.published || false,
  };
}
