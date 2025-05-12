/* eslint-disable import/prefer-default-export */

export function setDefaultValues(object) {
  return {
    status: object?.status || '',
    contest_stage_code: object?.contest_stage_code || '',
    payment_system: object?.payment_system || 'yookassa',
    year: object?.year || '',
    start_date: object?.start_date || '',
    end_date: object?.end_date || '',
    running_line_ru_name: Array.isArray(object?.running_line_ru)
      ? object.running_line_ru[0]?.name || ''
      : '',
    running_line_ru_url: Array.isArray(object?.running_line_ru)
      ? object.running_line_ru[0]?.url || ''
      : '',
    running_line_en_name: Array.isArray(object?.running_line_en)
      ? object.running_line_en[0]?.name || ''
      : '',
    running_line_en_url: Array.isArray(object?.running_line_en)
      ? object.running_line_en[0]?.url || ''
      : '',

    guidebook_ru: object?.guidebook_url_ru || null,
    rules_ru: object?.rules_url_ru || null,
    program_ru: object?.program_url_ru || null,

    guidebook_en: object?.guidebook_url_en || null,
    rules_en: object?.rules_url_en || null,
    program_en: object?.program_url_en || null,

    show_request_work_button: object?.show_request_work_button || false,
    show_buy_ticket_button: object?.show_buy_ticket_button || false,
    copy_contests: object?.contests_copied || false,
    copy_juries: object?.juries_copied || false,
    copy_sponsors: object?.sponsors_copied || false,
  };
}
