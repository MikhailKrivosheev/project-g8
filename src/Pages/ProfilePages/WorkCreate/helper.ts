export default function setDefaultValues(values, workModalValues, isDesktop) {
  return {
    name_ru: values?.name_ru || workModalValues?.name_ru || '',
    name_en: values?.name_en || workModalValues?.name_en || '',
    brand_ru: values?.brand_ru || '',
    brand_en: values?.brand_en || '',
    client_name_ru: values?.client_name_ru || '',
    client_name_en: values?.client_name_en || '',
    targets_and_goals_ru: values?.targets_and_goals_ru || '',
    targets_and_goals_en: values?.targets_and_goals_en || '',
    ideas_and_solutions_ru: values?.ideas_and_solutions_ru || '',
    ideas_and_solutions_en: values?.ideas_and_solutions_en || '',
    company_ru: values?.company_ru || '',
    company_en: values?.company_en || '',
    vimeo_link: values?.vimeo_link || '',
    // soundcloud_link: values?.soundcloud_link || '',
    project_link: values?.project_link,
    preview: values?.preview_url || '',
    video_preview: values?.video_preview_url || '',
    image_1: values?.image_1_url || '',
    image_2: values?.image_2_url || '',
    image_3: values?.image_3_url || '',
    image_4: values?.image_4_url || '',
    contests:
      values?.nominations?.[0]?.contest_id || workModalValues?.contests || '',
    slider_images:
      values?.slider_images_with_url ||
      (isDesktop
        ? [{ image: '' }, { image: '' }, { image: '' }]
        : [{ image: '' }, { image: '' }, { image: '' }, { image: '' }]),
    slider_videos:
      values?.slider_videos_with_url ||
      (isDesktop
        ? [
            { image: '', video: '' },
            { image: '', video: '' },
            { image: '', video: '' },
          ]
        : [
            { image: '', video: '' },
            { image: '', video: '' },
            { image: '', video: '' },
            { image: '', video: '' },
          ]),

    nomination_ids: [],
  };
}
