import useStyles from './useStyles';

const PAGES_NAMES = {
  awards: 'G8 Creative Awards',
  home: 'Главная',
  conference: 'Конференция',
  works: 'Работы',
  jury: 'Жюри',
  akar: 'Блок АКАР',
};

const FIELDS_NAMES = {
  text_ru: 'Текст (ru)',
  text_en: 'Текст (en)',
  first_video: 'Первое видео',
  first_video_preview: 'Превью первого видео',
  second_video: 'Второе видео',
  second_video_preview: 'Превью второго видео',
  vote_text_ru: 'Блок "Народное голосование" - Текст (ru)',
  vote_text_en: 'Блок "Народное голосование" - Текст (en)',
  vote_banner: 'Блок "Народное голосование" - Баннер',
  conference_text_ru: 'Блок "Конференция" - Текст (ru)',
  conference_text_en: 'Блок "Конференция" - Текст (en)',
  title_ru: 'Заголовок (ru)',
  title_en: 'Заголовок (en)',
  description_ru: 'Описание (ru)',
  description_en: 'Описание (en)',
  guidebook_link_ru: 'Ссылка на гайдбук (ru)',
  guidebook_link_en: 'Ссылка на гайдбук (en)',
  video_vk_link_ru: 'Ссылка на видео (ru)',
  video_vk_link_en: 'Ссылка на видео (en)',
  banner: 'Баннер',
  date_ru: 'Дата (ru)',
  date_en: 'Дата (en)',
  location_ru: 'Место проведения (ru)',
  location_en: 'Место проведения (en)',
};

export default function ErrorsHandler({ errors }) {
  const classes = useStyles();
  const renderErrors = (errorObj, parentKey = '') => {
    return Object.keys(errorObj).map((key) => {
      const currentKeyPath = parentKey ? `${parentKey}.${key}` : key;

      if (typeof errorObj[key] === 'object' && errorObj[key] !== null) {
        if ('message' in errorObj[key]) {
          return (
            <span key={currentKeyPath} className={classes.errorsField}>
              {`${FIELDS_NAMES[key]} ` || `${PAGES_NAMES[key]} -> ` || key}
            </span>
          );
        }

        return (
          <div key={currentKeyPath} className={classes.errorsBlock}>
            <b>{PAGES_NAMES[key] || FIELDS_NAMES[key] || key}</b>
            {renderErrors(errorObj[key], currentKeyPath)}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div className={classes.errorsHolder}>
      Проверьте поля:
      {renderErrors(errors)}
    </div>
  );
}
