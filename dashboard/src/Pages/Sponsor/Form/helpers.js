/* eslint-disable import/prefer-default-export */
import generateUrl from 'Utilities/generateFormImageUrl';

export function setDefaultValues(object) {
  return {
    link: object?.link || '',
    name: object?.name || '',
    sponsor_type_id: object?.sponsor_type?.id || '',
    background_color_logo: object?.background_color_logo || '#000000',
    published: object?.published || false,
    accented: object?.accented || false,
    logo: generateUrl(object?.logo_url) || '',
    season_id: object?.season_id || '',
  };
}
